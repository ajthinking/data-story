import { promises as fs } from 'fs';
import * as fsSync from 'fs';
import { Computer, str } from '@data-story/core';
import * as path from 'path';

export const CsvFileWrite: Computer = {
  name: 'CsvFile.write',
  label: 'CsvFile.write',
  category: 'NodeJs',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [],
  params: [
    str({
      name: 'file_path',
      label: 'File Path',
      help: 'File path',
    }),
    str({
      name: 'delimiter',
      label: 'Delimiter',
      help: 'CSV delimiter character (default: ,)',
      value: ',',
    }),
  ],

  canRun({ input, isAvailable }) {
    return isAvailable() && input.haveAllItemsAtInput('input');
  },

  async *run({ input, params }) {
    const incoming = input.pull();
    if(incoming.length === 0) return;

    const filePath = params.file_path as string;
    const delimiter = params.delimiter as string;

    console.log('Incoming data:', incoming);
    // Convert incoming data to array of objects
    const data = incoming.map(i => i.value);

    console.log('Data to write:', data);
    // Determine if the path is absolute
    const isAbsolutePath = path.isAbsolute(filePath);

    // Resolve the full path based on whether it's absolute or relative
    const fullPath = isAbsolutePath
      ? filePath
      : path.join(process.env.WORKSPACE_FOLDER_PATH as string, filePath);

    console.log('Full path:', fullPath);
    try {
      // Create the directory recursively if it doesn't exist
      await fs.mkdir(path.dirname(fullPath), { recursive: true });

      // Use streaming approach for better performance with large files
      await new Promise<void>((resolve, reject) => {
        // Create write stream
        const writeStream = fsSync.createWriteStream(fullPath, { encoding: 'utf-8' });

        // Set up error handling
        writeStream.on('error', (err) => {
          console.error('Stream error:', err);
          reject(err);
        });

        // When stream is finished
        writeStream.on('finish', () => {
          console.log('File written successfully:', fullPath);
          resolve();
        });

        // Write header row if data exists
        if (data.length > 0) {
          const headers = Object.keys(data[0]);
          writeStream.write(headers.join(delimiter) + '\n');

          console.log('Headers:', headers);
          console.log('Data length:', data.length);
          // Write data rows
          data.forEach((row, index) => {
            const values = headers.map(header => {
              const value = row[header];
              // Handle values that might contain delimiters or newlines
              if (typeof value === 'string' && (value.includes(delimiter) || value.includes('\n') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`;
              }
              return value === null || value === undefined ? '' : String(value);
            });

            writeStream.write(values.join(delimiter) + '\n');
          });
        }

        // Close the stream
        writeStream.end();
      });
    } catch (error: any) {
      console.error('Error writing file:', error);
      throw new Error(`Failed to write file: ${error.message}`);
    }
  },
};
