import { isFinished } from './isFinished';
import { sleep } from './sleep';

it('returns true when promise is resolved', async () => {
  const fastPromise = Promise.resolve('fast');
  const result = await isFinished(fastPromise);
  expect(result).toBe(true);
});

it('returns true when promise is rejected', async () => {
  const fastPromise = Promise.reject('error');
  // We need to handle the rejection to prevent an unhandled promise rejection warning
  fastPromise.catch(() => {});
  const result = await isFinished(fastPromise);
  expect(result).toBe(true);
});

it('returns undefined when promise is still pending', async () => {
  const slowPromise = new Promise(resolve => setTimeout(resolve, 5));
  const result = await isFinished(slowPromise);
  expect(result).toBeUndefined();
});