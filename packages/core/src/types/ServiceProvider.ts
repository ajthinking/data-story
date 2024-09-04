import { Application } from '../Application';

export type ServiceProvider = {
  register: (app: Application) => void;
}