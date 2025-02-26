export const anonymize = (data: any, keyCounter: { count: number } = { count: 1 }): any => {
  if (typeof data === 'string') {
    return data.replace(/./g, 'x');
  } else if (typeof data === 'number') {
    return data; // Preserve numbers
  } else if (Array.isArray(data)) {
    return data.map((item) => anonymize(item, keyCounter));
  } else if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([_, value]) => [
        `key${keyCounter.count++}`,
        anonymize(value, keyCounter),
      ]),
    );
  }
  return data; // Return as is for other types (boolean, null, undefined, etc.)
};
