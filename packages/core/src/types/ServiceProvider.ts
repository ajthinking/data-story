import { Application } from '../Application';

export type ServiceProvider = {
  boot: (app: Application) => void;
}