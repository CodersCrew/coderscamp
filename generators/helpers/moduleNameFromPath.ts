export const moduleNameFromPath = (path: string) => {
  const pathParts = path.split('\\');

  return pathParts[pathParts.length - 1];
};
