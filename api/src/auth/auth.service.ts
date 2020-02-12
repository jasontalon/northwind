import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { saltHashPassword, sha512, Password } from './auth.utils';
import { JwtService } from '@nestjs/jwt';
import IUser from 'src/models/user';
const uuidv4 = require('uuid/v4');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userId: string, password: string): Promise<any> {
    const user = await this.usersService.find(userId);
    if (!user) return null;

    const hashedPassword = sha512(password, user.passwordSalt);

    if (hashedPassword != user.passwordHash) return null;
    return { userId: user.userId, role: user.role };
  }

  async signup(userId: string, password: string, role: string = 'guest') {
    const saltedPassword: Password =
      password?.length ?? 0 > 0
        ? saltHashPassword(password)
        : {
            hash: '',
            salt: '',
          };

    await this.usersService.create({
      userId,
      passwordHash: saltedPassword.hash,
      passwordSalt: saltedPassword.salt,
      role,
    });
  }

  async login(user: IUser) {
    const { userId, role, name } = await this.usersService.find(user.userId);
    const refresh_token = uuidv4();
    await this.usersService.updateSignIn(userId, refresh_token);
    return {
      access_token: this.jwtService.sign({ sub: userId, role, name }),
      refresh_token,
    };
  }

  async refreshToken(refreshToken: string) {
    const {
      userId,
      role,
      name,
    }: IUser = await this.usersService.getUserByRefreshToken(refreshToken);

    return {
      access_token: this.jwtService.sign({ sub: userId, role, name }),
    };
  }

}
