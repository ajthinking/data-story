import * as glob from 'glob';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { Computer, serializeError, str } from '@data-story/core';
import { getWorkingDirConfig } from '../../server/getWorkingDirConfig';

export const CsvFileRead: Computer = {
  type: 'Computer',
  computerType: 'CsvFile.read',
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
      // Resolve the path if it's relative
      const resolvedPath = isAbsolutePath
        ? pathPattern
        : path.resolve(getWorkingDirConfig().workingDir, pathPattern);

      files = glob.sync(resolvedPath, {
        ignore: ['**/node_modules/**'],
      });

      if (files.length === 0) {
        console.warn(`[data-story] No files found matching pattern: ${resolvedPath}`);
      }

      // Process each file found by glob
      for (const file of files) {
        try {
          // Create a readable stream and process the file
          const parser = parse({
            columns: true,
            delimiter,
            skip_empty_lines: true,
            trim: true,
          });
          const stream = fs.createReadStream(file).pipe(parser);
          let batch: any[] = [];
          // Process each record as it comes in
          for await (const record of stream) {
            batch.push({
              ...record,
              _filePath: file,
            });

            if (batch.length >= batchSize) {
              output.push([...batch]);
              batch = []; // Clear the batch
              yield;
            }
          }
          // Process any remaining records
          if (batch.length > 0) {
            output.push([...batch]);
            yield;
          }
        } catch (fileError) {
          console.error('[data-story] Error processing file:', fileError);
          output.pushTo('errors', [serializeError(fileError)]);
        }
      }
    } catch (error: any) {
      output.pushTo('errors', [serializeError(error)]);
    }
  },
};
