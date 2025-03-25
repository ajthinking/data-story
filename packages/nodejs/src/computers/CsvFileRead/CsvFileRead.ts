import * as glob from 'glob';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
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
    str({
      name: 'batch_size',
      label: 'Batch size',
      help: 'Number of records to yield in each batch (default: 1000)',
      value: '1000',
    }),
  ],

  async *run({ output, params }) {
    const pathPattern = params.file_path as string;
    const delimiter = params.delimiter as string;
    const batchSize = parseInt(params.batch_size as string) || 1000;

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
        // Create a promise to handle the stream processing
        await new Promise<void>((resolve, reject) => {
          const items: any[] = [];

          // Create readable stream instead of reading entire file into memory
          fs.createReadStream(file)
            .pipe(parse({
              columns: true, // Use first row as column names
              delimiter,
              skip_empty_lines: true,
              trim: true,
            }))
            .on('data', (record: any) => {
              // Add file path to each record
              items.push({
                ...record,
                _filePath: file,
              });

              // Process in batches to avoid memory issues
              if (items.length >= batchSize) {
                console.log('Processing batch:', items.length);
                output.push([...items]);
                items.length = 0; // Clear the array
              }
            })
            .on('end', () => {
              // Push any remaining items
              if (items.length > 0) {
                output.push([...items]);
              }
              console.log('Finished processing file:', file);
              resolve();
            })
            .on('error', (err) => {
              console.error('Error processing CSV:', err);
              reject(err);
            });
        });
        // Yield after each file is processed
        yield;
      }
    } catch (error: any) {
      output.pushTo('errors', [serializeError(error)]);
      yield;
    }
  },
};
