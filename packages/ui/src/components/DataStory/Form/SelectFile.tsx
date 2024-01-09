import { DataStoryNode } from '../../Node/DataStoryNode';
import { Param } from '@data-story/core';
import { UseFormReturn } from 'react-hook-form';
import React, { useState } from 'react';

// 1. 使用 tailwindcss 的样式 优化 selectFile 的样式
// 2. 优化 input 的样式
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
  console.log('param', param);
  console.log('form', form);
  console.log('node', node);

  const [fileContent, setFileContent] = useState<string>('');
  const [isFilePicked, setIsFilePicked] = useState<boolean>(false);

  const handleFileRead = async (fileHandle: FileSystemFileHandle) => {
    const file = await fileHandle.getFile();
    const content = await file.text();
    console.log(file, 'file');
    console.log(content, 'content');
    setFileContent(content);
    setIsFilePicked(true); // 文件已选，可以禁用按钮

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
      <button
        onClick={handleFileSelect}
        disabled={isFilePicked}
        className={`${
          isFilePicked ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-700'
        } bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      >
        Select a CSV or JSON file13111
      </button>
      <div className="w-72 h-48 overflow-auto">
        {fileContent}
      </div>
    </div>
  );
}

