import { Application, Computer, ComputerFactory, ServiceProvider } from '@data-story/core';
import * as computers from './computers'

export const hubspotProvider: ServiceProvider = {
  boot: async (app: Application) => {
    const configs = Object.values(computers as { [key: string]: Computer })
    app.addComputers(configs);
  },
}

// Contacts.getAll

// Contacts.getById
// Contacts.create
// Contacts.update
// Contacts.archive

// Contacts.batch.create
// Contacts.batch.update
// Contacts.batch.archive