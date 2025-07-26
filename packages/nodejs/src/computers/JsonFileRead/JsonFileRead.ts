import * as glob from 'glob';
import fs from 'fs';
import path from 'path'; // Import path module
import { Computer, get, asArray, ItemValue, serializeError, str } from '@data-story/core';
import { getWorkingDirConfig } from '../../server/getWorkingDirConfig';

export const JsonFileRead: Computer = {
  type: 'Computer',
  computerType: 'JsonFile.read',
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
        const cwd = getWorkingDirConfig().workingDir;
        files = glob.sync(pathPattern, {
          cwd, // Resolve relative paths from the workspace folder
          ignore: ['**/node_modules/**'],
          absolute: true,
        });
      }

      // Process each file found by glob
      for (const file of files) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          const data = JSON.parse(content);
          const itemable = get(data, itemsPath);
          const items = asArray(itemable).map((i: ItemValue) => ({
            ...i,
            _filePath: file,
          }));
          output.push(items);
          yield;
        } catch (fileError: any) {
          output.pushTo('errors', [serializeError(fileError)]);
        }
      }
    } catch (error: any) {
      output.pushTo('errors', [serializeError(error)]);
      yield;
    }
  },
};
