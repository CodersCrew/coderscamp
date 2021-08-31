import { BinaryLike, randomBytes, scrypt as _scrypt, ScryptOptions } from 'crypto';

const scrypt = (
  password: BinaryLike,
  salt: BinaryLike,
  keylen: number,
  options: ScryptOptions = {},
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    _scrypt(password, salt, keylen, options, (err, derivedKey) => {
      if (err) {
        return reject(err);
      }

      return resolve(derivedKey);
    });
  });
};

const HASH_LENGTH = 32;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');
  const hash = await scrypt(password, salt, HASH_LENGTH);

  return `${salt}.${hash.toString('hex')}`;
};

export const checkPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const [salt, storedHash] = hashedPassword.split('.');

  const hash = await scrypt(password, salt, HASH_LENGTH);

  return storedHash === hash.toString('hex');
};
