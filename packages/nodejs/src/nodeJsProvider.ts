import { Application, ServiceProvider } from '@data-story/core';
import * as computers from './computers'

export const nodeJsProvider: ServiceProvider = {
  boot: async (app: Application) => {
    app.addComputers(Object.values(computers));
  },
}