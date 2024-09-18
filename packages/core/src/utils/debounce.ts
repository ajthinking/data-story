export function debounce<T extends (...args: any[]) => Promise<void>>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>): Promise<void> => {
    return new Promise((resolve) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        await func(...args);  // Call the original function
        resolve();  // Resolve the promise
      }, wait);
    });
  };
}
