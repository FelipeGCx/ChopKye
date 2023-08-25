const convertToCamel = (input: string): string => {
  return input.replace(/[-_]([a-z])/g, (_, char) => char.toUpperCase());
};

export const keysToCamel = (element: any): any => {
  const camelKeys: { [key: string]: any } = {};
  for (const key in element) {
    const camelKey = convertToCamel(key);
    camelKeys[camelKey] = element[key];
  }
  return camelKeys;
};
