import { Application, ComputerFactory, ServiceProvider } from '@data-story/core';
import * as computers from './computers'

export const openAiProvider: ServiceProvider = {
  boot: (app: Application) => {
    app.addComputers(Object.values(computers));
  },
}