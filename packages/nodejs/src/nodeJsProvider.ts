import { Application, ServiceProvider } from '@data-story/core';
import * as computers from './computers'

export const nodeJsProvider: ServiceProvider = {
  register: (app: Application) => {
    app.addComputers(Object.values(computers));
  },

  boot: (app: Application) => {}
}