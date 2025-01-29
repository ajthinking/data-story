export function stringifyError(error: any) {
  if (error instanceof Error) {
    // Standard Error object
    return JSON.stringify({
      message: error.message,
      stack: error.stack,
    });
  } else {
    try {
      // Handle non-Error objects, including those with circular references
      return JSON.stringify(error, getCircularReplacer());
    } catch {
      // Fallback for other edge cases
      return String(error);
    }
  }
}

// Replacer function to avoid TypeError: Converting circular structure to JSON
function getCircularReplacer() {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}