import { ServiceProvider, Application, Computer, str } from '@data-story/core';
import fs from 'fs';

const JsonFile: Computer = {
  name: 'JsonFile',
  label: 'JsonFile',
  inputs: [],
  outputs: [{
    name: 'output',
    schema: {},
  }],
  params: [
    str({
      name: 'uri',
    }),
  ],

  run: async function* ({ output, params }) {
    const path = params.uri as string;
    const content = fs.readFileSync(path, 'utf8');
    const data = JSON.parse(content);

    output.push(data);
  }
}

export const vsCodeNodeProvider: ServiceProvider = {
  async boot(app: Application) {
    app.addComputers([
      JsonFile,
    ]);
  }
}