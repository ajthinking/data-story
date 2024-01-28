import { Application, ComputerConfig, ComputerFactory, ServiceProvider } from '@data-story/core';
import * as computerConfigs from './computers'

export const hubspotProvider: ServiceProvider = {
  register: (app: Application) => {
    const configs = Object.values(computerConfigs as {[key: string]: ComputerConfig})
    app.addComputers(configs);
  },

  boot: (app: Application) => {}
}

// Contacts.getAll

// Contacts.getById
// Contacts.create
// Contacts.update
// Contacts.archive

// Contacts.batch.create
// Contacts.batch.update
// Contacts.batch.archive