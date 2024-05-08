import { Diagram } from '../Diagram';
import { Registry } from '../Registry';
import { Storage } from './Storage';
import { InputObserverController } from '../InputObserverController';

export interface ExecutionMemoryFactoryParams {
  diagram: Diagram;
  registry: Registry;
  storage: Storage;
  inputObserverController?: InputObserverController;
}
