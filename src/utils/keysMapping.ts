const convertToCamel = (input: string): string => {
  return input.replace(/[-_]([a-z])/g, (_, char) => char.toUpperCase());
};

export const keysToCamel = (element: any): any => {
  if (Array.isArray(element)) {
    return element.map((item) => keysToCamel(item));
  } else if (typeof element === "object" && element !== null) {
    const camelKeys: { [key: string]: any } = {};
    for (const key in element) {
      const camelKey = convertToCamel(key);
      camelKeys[camelKey] = keysToCamel(element[key]);
    }
    return camelKeys;
  } else {
    return element;
  }
};