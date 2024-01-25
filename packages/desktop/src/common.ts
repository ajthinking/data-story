export const getCoreVersion = () => {
  const { version } = require('@data-story/core/package.json');
  return version;
}
