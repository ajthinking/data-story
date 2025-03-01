import { promises as fs } from 'fs';
import { Computer, str } from '@data-story/core';
import * as path from 'path';

export const JsonFileWrite: Computer = {
  name: 'JsonFile.write',
  label: 'JsonFile.write',
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
  ],

  canRun({ input, isAvailable }) {
    return isAvailable() && input.haveAllItemsAtInput('input');
  },

  async *run({ input, params }) {
    const incoming = input.pull();
    const filePath = params.file_path as string;
    const content = JSON.stringify(incoming.map(i => i.value), null, 2);

    // Determine if the path is absolute
    const isAbsolutePath = path.isAbsolute(filePath);

    // Resolve the full path based on whether it's absolute or relative
    const fullPath = isAbsolutePath
      ? filePath // Use the absolute path directly
      : path.join(process.env.WORKSPACE_FOLDER_PATH as string, filePath); // Prepend the workspace root for relative paths

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
