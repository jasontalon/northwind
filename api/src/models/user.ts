export default interface IUser {
  userid: string;
  passwordSalt?: string;
  passwordHash?: string;
  role?: string;
  refreshToken?: string;
  lastLoginAt?: string;
  createdAt?: string;
}
