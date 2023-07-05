export function pascalToSentenceCase(input: string): string {
  return input
    .replace(/([A-Z])/g, ' $1')
    .trim();
}