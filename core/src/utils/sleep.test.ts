import { sleep } from './sleep';

it('should resolve after specified time', async () => {
  vi.useFakeTimers();

  const date = new Date(2000, 1, 1, 1)
  vi.setSystemTime(date)

  let hasFinished = false

  // Sleep for 1 hour
  const promise = sleep(3600 * 1000).then(() => {
    hasFinished = true
  })

  // Still pending after 30 minutes
  vi.advanceTimersByTime(30 * 60 * 1000);
  expect(hasFinished).toBe(false)

  // Done After 1 hour
  vi.advanceTimersByTime(30 * 60 * 1000);
  await promise; // allow it to happily resolve

  expect(hasFinished).toBe(true)

  vi.useRealTimers()
});