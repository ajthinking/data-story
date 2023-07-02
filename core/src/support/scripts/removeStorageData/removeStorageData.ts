import fs from 'fs';
import path from 'path';

const NODE_ROOT = '.datastory/executions';

// Helper function to remove all files and directories
function clearDirectory(directory: string) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      clearDirectory(entryPath);
      fs.rmdirSync(entryPath); // Remove the directory itself
    } else {
      fs.unlinkSync(entryPath); // Remove each file
    }
  });
}

// Clear the root directory
clearDirectory(NODE_ROOT);

export {}