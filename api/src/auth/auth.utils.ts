const crypto = require('crypto');

export const randomString = function(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

export const sha512 = function(password: string, salt: string): string {
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const hashedPassword = hash.digest('hex');
  return hashedPassword;
};

export const saltHashPassword = function(password: string): Password {
  const salt = randomString(16);
  const hash = sha512(password, salt);
  return {
    salt,
    hash,
  };
};

export interface Password {
  readonly salt: string;
  readonly hash: string;
}
