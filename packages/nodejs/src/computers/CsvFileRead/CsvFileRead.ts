import * as glob from 'glob';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { Computer, serializeError, str } from '@data-story/core';

export const CsvFileRead: Computer = {
  name: 'CsvFile.read',
  label: 'CsvFile.read',
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
      help: 'File path, e.g., **/*.csv',
    }),
    str({
      name: 'delimiter',
      label: 'Delimiter',
      help: 'CSV delimiter character (default: ,)',
      value: ',',
    }),
  ],

  async *run({ output, params }) {
    const pathPattern = params.file_path as string;
    const delimiter = params.delimiter as string;

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

      // Process each file found by glob
      for (const file of files) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          const records = parse(content, {
            columns: true, // Use first row as column names
            delimiter,
            skip_empty_lines: true,
            trim: true,
          });

          // Add file path to each record
          const items = records.map((record: any) => ({
            ...record,
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
