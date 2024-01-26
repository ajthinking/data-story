export const getCoreVersion = () => {
  const { version } = require('@data-story/core/package.json');
  return version;
}

export const tryParseJSON = (data: string) => {
  try {
    const result = JSON.parse(data);
    return {
      valid: true,
      result
    }
  } catch (e) {
    return {
      valid: false,
      result: data
    }
  }
}
