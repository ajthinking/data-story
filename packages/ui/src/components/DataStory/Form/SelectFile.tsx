import { DataStoryNode } from '../../Node/DataStoryNode';
import { Param, SelectButton } from '@data-story/core';
import { Controller, UseFormReturn } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

interface FileSystemFileHandle {
  getFile: () => Promise<File>;
}

export function SelectFile({ param, form, node, inputMode }: {
  param: Param,
  form: UseFormReturn<{
    [x: string]: any;
  }, any>,
  node: DataStoryNode,
  inputMode: SelectButton,
}) {

  return (
    <Controller
      name={`params.${param.name}`}
      control={form.control}
      render={({ field }) => <FileSelect {...field} />}
    />
  );
}

const FileSelect = React.forwardRef(({onChange, value, name, disabled } : {
  onChange: 	(value: FileSystemFileHandle) => void
  value: FileSystemFileHandle,
  disabled?: boolean,
  name: string,
}, ref: React.ForwardedRef<HTMLDivElement>) => {

  const [fileContent, setFileContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    void handleFileRead(value);
  }, [value]);

  const handleFileRead = async(fileHandle: FileSystemFileHandle) => {
    if(fileHandle instanceof FileSystemFileHandle ){
      const file = await fileHandle.getFile();
      const content = await file.text();
      setFileName(file.name);
      setFileContent(content);
    }
  };

  const handleFileSelect = async() => {
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

      onChange(fileHandle);
    } catch(error) {
      console.error('File selection was cancelled or failed', error);
    }
  };
  return (
    <div ref={ref}>
      <button
        onClick={handleFileSelect}
        name={name}
        disabled={disabled}
        className={`${
          disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-700'
        } bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      >
        Select a CSV or JSON file
      </button>
      <p className={'p-3'}> {fileName} </p>
      <pre className="h-48 p-3 overflow-auto">
        {fileContent}
      </pre>
    </div>
  );
})
