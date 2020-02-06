export default interface IUser {
  userId: string;
  name?: string;
  passwordSalt?: string;
  passwordHash?: string;
  role?: string;
  refreshToken?: string;
  lastLoginAt?: string;
  created_at?: string;
}
