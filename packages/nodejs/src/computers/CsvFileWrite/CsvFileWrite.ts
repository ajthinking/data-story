import { promises as fs } from 'fs';
import { Computer, str } from '@data-story/core';
import * as path from 'path';
import { stringify } from 'csv-stringify/sync';

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
    const filePath = params.file_path as string;
    const delimiter = params.delimiter as string;

    // Convert incoming data to array of objects
    const data = incoming.map(i => i.value);

    // Generate CSV content
    const content = stringify(data, {
      header: true,
      delimiter,
    });

    // Determine if the path is absolute
    const isAbsolutePath = path.isAbsolute(filePath);

    // Resolve the full path based on whether it's absolute or relative
    const fullPath = isAbsolutePath
      ? filePath
      : path.join(process.env.WORKSPACE_FOLDER_PATH as string, filePath);

    try {
      // Create the directory recursively if it doesn't exist
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      // Write the file content
      await fs.writeFile(fullPath, content, 'utf-8');
    } catch (error: any) {
      console.error('Error writing file:', error);
      throw new Error(`Failed to write file: ${error.message}`);
    }
  },
};
