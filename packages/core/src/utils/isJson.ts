export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const isJsonArray = (str: string) => {
  try {
    const result = JSON.parse(str);
    if (!Array.isArray(result)) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
};

export const isJsonObject = (str: string) => {
  try {
    const result = JSON.parse(str);
    if (typeof result !== 'object') {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
};