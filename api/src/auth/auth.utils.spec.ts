import { saltHashPassword, Password, sha512 } from './auth.utils';
describe('test auth util', () => {
  let password = '';
  let saltedPassword: Password;
  beforeAll(() => {
    password = 'password';
  });
  it('should generate salt and hash', () => {
    saltedPassword = saltHashPassword(password);
    expect(saltedPassword).toEqual(expect.anything());
  });

  it('should compare salted password with plain password', () => {
    const hashed = sha512(password, saltedPassword.salt);
    expect(hashed == saltedPassword.hash).toBeTruthy();
  });
});
