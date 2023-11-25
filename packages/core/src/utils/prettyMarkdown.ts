export const prettyMarkdown = (strings: TemplateStringsArray, ...values: any[]) => {
  // Combine the strings with the values
  let combinedString = strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? values[i] : '');
  }, '');

  // Split the string into lines
  let lines = combinedString.split('\n');

  // Remove the first line if it is empty
  if (lines[0].trim() === '') {
    lines = lines.slice(1);
  }

  // Find the minimum indentation of all lines (except empty lines)
  const baseIndentation = Math.min(...lines.filter(line => line.trim() !== '').map(line => line.search(/\S|$/)));

  // Remove the base indentation from all lines and join them back into a string
  return lines.map(line => line.substring(baseIndentation)).join('\n');
};