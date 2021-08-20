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

export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');
  const hash = await scrypt(password, salt, 32);

  return `${salt}.${hash.toString('hex')}`;
};
