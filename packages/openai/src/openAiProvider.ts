import { Application, ComputerFactory, ServiceProvider } from '@data-story/core';
import * as computers from './computers'

export const openAiProvider: ServiceProvider = {
  register: (app: Application) => {
    app.addComputers(Object.values(computers));
  },
}