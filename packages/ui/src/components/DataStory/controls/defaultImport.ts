import { Diagram } from '@data-story/core';

export const defaultImport = (): Promise<Diagram> => {
  return new Promise((resolve, reject) => {
    // 创建一个 input 元素
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.diagram.json,.ds'; // 限制文件类型
    input.style.display = 'none'; // 隐藏 input 元素

    // 当用户选择文件后触发
    input.onchange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        // 读取文件内容
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result) {
            try {
              const diagram = JSON.parse(e.target.result as string);
              resolve(diagram); // 解析成功，返回 diagram 对象
            } catch (error) {
              reject(new Error('Failed to parse the file as JSON.')); // 解析失败
            }
          } else {
            reject(new Error('File reading failed.')); // 文件读取失败
          }
        };

        reader.onerror = () => {
          reject(new Error('Error occurred while reading the file.')); // 读取错误
        };

        reader.readAsText(file); // 以文本形式读取文件
      } else {
        reject(new Error('No file selected.')); // 用户未选择文件
      }

      // 清理 DOM
      document.body.removeChild(input);
    };

    // 将 input 元素添加到 DOM 中并触发文件选择对话框
    document.body.appendChild(input);
    input.click();
  });
};