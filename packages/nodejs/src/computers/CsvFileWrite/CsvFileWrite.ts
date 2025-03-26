import { promises as fs } from 'fs';
import * as fsSync from 'fs';
import { Computer, serializeError, str } from '@data-story/core';
import * as path from 'path';
import { stringify } from 'csv-stringify';

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

  async *run({ input, params }) {
    try {
      const filePath = params.file_path as string;
      const delimiter = params.delimiter as string;

      // Determine if the path is absolute
      const isAbsolutePath = path.isAbsolute(filePath);

      // Resolve the full path based on whether it's absolute or relative
      const fullPath = isAbsolutePath
        ? filePath
        : path.join(process.env.WORKSPACE_FOLDER_PATH as string, filePath);
      // Create the directory recursively if it doesn't exist
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      // Use streaming approach for better performance with large files
      const writeStream = fsSync.createWriteStream(fullPath, { encoding: 'utf-8' });
      const stringifier = stringify({
        delimiter: delimiter,
        header: true,
      });
      stringifier.pipe(writeStream);

      writeStream.on('error', (err) => {
        console.error('Stream error:', err);
        throw new Error(err.message);
      });

      // When stream is finished
      writeStream.on('finish', () => {
        console.log('[data-story] CsvFileWrite File written successfully:', fullPath);
      });
      while(true) {
        const incoming = input.pull();
        if (incoming.length === 0) {
          stringifier.end();
          return;
        };

        for (const item of incoming) {
          stringifier.write(item.value);
        }
        yield;
      }
    } catch (error: any) {
      console.error('Error writing file:', error);
      throw new Error(`Failed to write file: ${error.message}`);
    }
  },
};
