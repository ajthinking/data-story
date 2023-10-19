import { Application } from '@data-story/core'
import { ComputerFactory } from '@data-story/core'
import { ServiceProvider } from '@data-story/core'
import { LimeDummy } from './computers'

export const hubSpotProvider: ServiceProvider = {
  register: (app: Application) => {    
    app.addComputers([
      new ComputerFactory().get(LimeDummy)
    ]);
  },
  
  boot: (app: Application) => {}
}