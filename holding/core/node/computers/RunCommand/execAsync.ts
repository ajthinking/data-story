import { exec } from 'child_process';

export function execAsync(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      if (stderr) {
        reject(new Error(stderr));
        return;
      }

      resolve(stdout);
    });
  });
}