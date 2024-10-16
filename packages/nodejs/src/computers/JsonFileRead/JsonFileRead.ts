import * as glob from 'glob';
import fs from 'fs';
import path from 'path'; // Import path module
import { Computer, get, serializeError, str } from '@data-story/core';

export const JsonFileRead: Computer = {
  name: 'JsonFile.read',
  label: 'JsonFile.read',
  category: 'NodeJs',
  inputs: [],
  outputs: [
    {
      name: 'output',
      schema: {},
    },
    {
      name: 'errors',
      schema: {},
    },
  ],
  params: [
    str({
      name: 'file_path',
      label: 'File path (supports glob patterns)',
      help: 'File path, e.g., **/*.json',
    }),
    str({
      name: 'items_path',
      label: 'Items Path',
      help: 'Path to the items within the JSON structure',
    }),
  ],

  async *run({ output, params }) {
    const pathPattern = params.file_path as string;
    const itemsPath = params.items_path as string;

    // Check if the provided path is absolute
    const isAbsolutePath = path.isAbsolute(pathPattern);

    let files: string[] = [];
    try {
      if (isAbsolutePath) {
        // If it's an absolute path, use it directly with glob
        files = glob.sync(pathPattern, {
          ignore: ['**/node_modules/**'],
          absolute: true,
        });
      } else {
        // If it's a relative path, resolve using the workspace folder
        const cwd = process.env.WORKSPACE_FOLDER_PATH as string;
        files = glob.sync(pathPattern, {
          cwd, // Resolve relative paths from the workspace folder
          ignore: ['**/node_modules/**'],
          absolute: true,
        });
      }

      console.log({ files }); // Debug output

      // Process each file found by glob
      for (const file of files) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          const data = JSON.parse(content);
          const items = get(data, itemsPath);
          output.push(items);
        } catch (fileError: any) {
          output.pushTo('errors', [serializeError(fileError)]);
        }
      }

      yield;
    } catch (error: any) {
      output.pushTo('errors', [serializeError(error)]);
      yield;
    }
  },
};
