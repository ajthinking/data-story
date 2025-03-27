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
    try {
      const filePath = params.file_path as string;
      const delimiter = params.delimiter as string;

      const isAbsolutePath = path.isAbsolute(filePath);
      const fullPath = isAbsolutePath
        ? filePath
        : path.join(process.env.WORKSPACE_FOLDER_PATH as string, filePath);
      // Create the directory recursively if it doesn't exist
      await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });

      // Use streaming approach for better performance with large files
      const writeStream = fs.createWriteStream(fullPath, { encoding: 'utf-8' });
      writeStream.on('error', (err) => {
        console.error('Stream error:', err);
        throw new Error(err.message);
      });
      writeStream.on('finish', () => {
        console.log('[data-story] CsvFileWrite File written successfully:', fullPath);
      });

      // Setup CSV stringifier
      const stringifier = stringify({
        delimiter: delimiter,
        header: true,
      });
      stringifier.pipe(writeStream);

      const incoming = input.pull();
      for (const item of incoming) {
        stringifier.write(item.value);
      }
      stringifier.end();
      yield;
    } catch (error: any) {
      console.error('Error writing file:', error);
      throw new Error(`Failed to write file: ${error.message}`);
    }
  },
};
