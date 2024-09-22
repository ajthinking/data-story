import { ServiceProvider, Application, Computer } from "@data-story/core";

const CustomPass: Computer = {
  name: 'CustomPass',
  label: 'CustomPass',
  inputs: [{
    name: 'input',
    schema: {},
  }],
  outputs: [{
    name: 'output',
    schema: {},
  }],
  params: [],

  run: async function* ({ input, output }) {
    console.log('In the custom passer!')
  }
}

export const vsCodeNodeProvider: ServiceProvider = {
  async boot(app: Application) {
    app.addComputers([ CustomPass]);
  }
}