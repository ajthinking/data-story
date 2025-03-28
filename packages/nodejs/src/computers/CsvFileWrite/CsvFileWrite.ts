import fs from 'fs';
import { Computer, ItemValue, ItemWithParams, str } from '@data-story/core';
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

  async *run({ input, params, onComplete }) {
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

      const createColumns = (data: ItemWithParams<ItemValue>[]) => {
        if (data.length === 0) return [];
        // If there are more than 1000 items, process the keys from the first 1000 rows.
        const batch = data.length > 1000 ? data.slice(0, 1000) : data;

        const columns = new Set<string>();
        batch.forEach((item) => {
          Object.keys(item.value).forEach((key) => columns.add(key));
        });
        return Array.from(columns);
      };

      const incoming = input.pull();

      // Setup CSV stringifier
      const stringifier = stringify({
        delimiter: delimiter,
        header: true,
        columns: createColumns(incoming),
      });
      stringifier.pipe(writeStream);

      for (const item of incoming) {
        stringifier.write(item.value);
      }
      stringifier.end();

      onComplete?.(() => {
        console.log('[data-story] CsvFileWrite onComplete!!!!!!');
        // stringifier.end();
      });

      yield;
    } catch (error: any) {
      console.error('Error writing file:', error);
      throw new Error(`Failed to write file: ${error.message}`);
    }
  },
};
