import { sleep } from './sleep';

export async function isFinished<T = any>(promise: Promise<T>) {
  return await Promise.race([
    sleep(0),
    promise.then(() => true, () => true)
  ]);
}