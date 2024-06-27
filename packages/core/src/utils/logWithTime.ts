export const logWithTime = (...args: unknown[]) => {
  console.log(...args, performance.now());
}
