import { DataStoryNode } from '../../Node/DataStoryNode';
import { Param } from '@data-story/core';
import { UseFormReturn } from 'react-hook-form';
import React, { useState } from 'react';

interface FileSystemFileHandle {
  getFile: () => Promise<File>;
}

export function SelectFile({ param, form, node }: {
  param: Param,
  form: UseFormReturn<{
    [x: string]: any;
  }, any>,
  node: DataStoryNode,
}) {
  // console.log('param', param);
  // console.log('form', form);
  // console.log('node', node);

  const [fileContent, setFileContent] = useState<string>('');

  const handleFileRead = async (fileHandle: FileSystemFileHandle) => {
    const file = await fileHandle.getFile();
    const content = await file.text();
    setFileContent(content);
  };

  const handleFileSelect = async () => {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'Text Files',
            accept: {
              'text/csv': ['.csv'],
              'application/json': ['.json'],
            },
          },
        ],
      });

      await handleFileRead(fileHandle as unknown as FileSystemFileHandle);
    } catch (error) {
      console.error('File selection was cancelled or failed', error);
    }
  };

  return (
    <div>
      <button onClick={handleFileSelect}>Select a CSV or JSON file</button>
      <pre>{fileContent}</pre>
    </div>
  );
}





