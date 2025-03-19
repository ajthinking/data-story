import fs from 'fs';
import { Computer, str } from '@data-story/core';
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

  canRun({ input, isAvailable }) {
    return isAvailable() && input.haveAllItemsAtInput('input');
  },

  async *run({ input, params }) {
    const BATCH_SIZE = 1000;
    const filePath = params.file_path as string;
    const delimiter = params.delimiter as string;

    // Determine if the path is absolute
    const isAbsolutePath = path.isAbsolute(filePath);

    // Resolve the full path based on whether it's absolute or relative
    const fullPath = isAbsolutePath
      ? filePath
      : path.join(process.env.WORKSPACE_FOLDER_PATH as string, filePath);

    try {
      // Create the directory recursively if it doesn't exist
      await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });

      // Create write stream
      const writeStream = fs.createWriteStream(fullPath);

      // Create stringifier
      const stringifier = stringify({
        header: true,
        delimiter,
      });

      // Pipe stringifier to write stream
      stringifier.pipe(writeStream);

      let isFirstBatch = true;
      while (true) {
        const batch = input.pull(BATCH_SIZE);
        if (batch.length === 0) break;

        // Write rows
        for (const item of batch) {
          stringifier.write(item.value);
        }

        // Yield progress after each batch
        yield;
      }

      // End the stringifier (this will also end the write stream)
      stringifier.end();
      // Wait for the write stream to finish
      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });
    } catch (error: any) {
      console.error('Error writing file:', error);
      throw new Error(`Failed to write file: ${error.message}`);
    }
  },
};
