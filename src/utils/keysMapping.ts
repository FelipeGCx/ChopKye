const kebabToCamel = (kebab: string): string => {
  return kebab.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
};

export const keysToCamel = (element: any): any => {
  const camelKeys: { [key: string]: any } = {};
  for (const key in element) {
    const camelKey = kebabToCamel(key);
    camelKeys[camelKey] = element[key];
  }
  return camelKeys;
};