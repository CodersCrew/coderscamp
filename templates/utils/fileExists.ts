import fs from 'fs';

export const doesFileExist = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};
