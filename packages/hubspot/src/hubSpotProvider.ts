import { Application } from '@data-story/core'
import { ComputerFactory } from '@data-story/core'
import { ServiceProvider } from '@data-story/core'
import { HubSpotDummy } from './computers'

export const hubSpotProvider: ServiceProvider = {
  register: (app: Application) => {    
    app.addComputers([
      new ComputerFactory().get(HubSpotDummy)
    ]);
  },
  
  boot: (app: Application) => {}
}