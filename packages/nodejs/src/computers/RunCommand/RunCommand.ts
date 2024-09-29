import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import { Computer, createDefaultStringable } from '@data-story/core';

const exec = promisify(execCallback);

async function awaitableExec(command: string): Promise<{
  stdout?: string,
  stderr?: string,
  error?: Error,
}> {
  try {
    const { stdout, stderr } = await exec(command);
    return { stdout, stderr };
  } catch (error: any) {
    console.error(`Error executing command: ${command}`, error);
    // throw error;

    return { error };
  }
}

export const RunCommand: Computer = {
  name: 'RunCommand',
  label: 'RunCommand',
  category: 'NodeJs',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [
    {
      name: 'output',
      schema: {},
    },
    {
      name: 'error',
      schema: {},
    },
  ],
  params: [
    createDefaultStringable({
      name: 'command',
      label: 'Command',
      help: 'Command to run',
      multiline: true,
      canInterpolate: false,
      interpolate: false,
      evaluations: [],
      casts: [],
      value: 'say "Hello World"',
    })
  ],

  async *run({ input, output, params }) {
    while(true) {
      const [ incoming ] = input.pull(1)
      const command = incoming.params.command as string

      const { stdout, stderr, error } = await awaitableExec(command);

      if(stdout) {
        console.log('STD OUT')
        output.push([{ stdout }])
        yield;
        continue;
      }

      if(stderr) {
        console.log('EXEC ERROR')
        output.pushTo('error', [{ stderr }])
        yield;
        continue;
      }

      if(error) {
        console.log('error (not stderr)')
        output.pushTo('error', [error])
        yield;
        continue;
      }

      throw new Error('Unknown exec result!')
    }
  },
};
