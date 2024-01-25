export const getCoreVersion = () => {
  const { version } = require('@data-story/core/package.json');
  return version;
}

export const canBeParsedAsJSON = (data: string) => {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
}
