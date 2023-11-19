export const snakeCaseToTitleCase = (snakeCase: string) => {
  return snakeCase
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join('')
}