import { Application, ComputerConfig, ComputerFactory, ServiceProvider } from '@data-story/core';
import * as computerConfigs from './computers'

export const openAiProvider: ServiceProvider = {
  register: (app: Application) => {
    const configs = Object.values(computerConfigs)
    app.addComputerConfigs(configs);
  },

  boot: (app: Application) => {}
}