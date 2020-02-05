import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { saltHashPassword, sha512 } from './auth.utils';
import { JwtService } from '@nestjs/jwt';
const uuidv4 = require('uuid/v4');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(userid: string, password: string): Promise<any> {
    const user = await this.usersService.find(userid);
    if (!user) return null;

    const hashedPassword = sha512(password, user.passwordSalt);

    if (hashedPassword != user.passwordHash) return null;
    return { userid: user.userid, role: user.role };
  }

  async signup(userid: string, password: string) {
    const saltedPassword = saltHashPassword(password);

    await this.usersService.create({
      userid,
      passwordHash: saltedPassword.hash,
      passwordSalt: saltedPassword.salt,
      role: 'user',
    });
  }

  async login(user: any) {
    const { userid, role } = await this.usersService.find(user.userid);
    const refreshToken = uuidv4();
    await this.usersService.updateSignIn(userid, refreshToken);
    return {
      access_token: this.jwtService.sign({ userid, role }),
      refresh_token: refreshToken
    };
  }
}
