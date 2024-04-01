export const createLargeColsFn = (count: number) => Array.from({ length: count }, (_, index) => ({
  [`column_${index}`]: `Value ${index}`,
})).reduce((acc, item) => {
  return { ...acc, ...item };
});
