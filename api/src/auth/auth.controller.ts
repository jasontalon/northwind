import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  Res,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { UsersService } from 'src/users/users.service';
const shortid = require('shortid');

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signUp(
    @Body('username') userId: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const user = await this.usersService.find(userId);
    if (user) {
      res.status(400).send('User already exists.');
      return;
    }
    await this.authService.signup(userId, password, 'user');
    this._signIn(userId, res);
  }

  @Post('signInAsGuest')
  @HttpCode(200)
  async signInAsGuest(@Res() res: Response) {
    const userId = `guest-${shortid.generate()}`;
    await this.authService.signup(userId, '', 'guest');
    await this._signIn(userId, res);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Req() req, @Res() res: Response) {
    await this._signIn(req.user.userId, res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('hasura')
  async validateHasura(@Req() req) {
    const hasuraVariables = {
      'X-Hasura-User-Id': req.user.userId,
      'X-Hasura-Role': req.user.role,
    };
    return hasuraVariables;
  }

  @Post('refreshToken')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      const errMessage = 'no refresh_token available';

      if (!req.headers.cookie) throw new Error(errMessage);

      const cookies = new URLSearchParams(
        req.headers.cookie.replace(/;/g, '&'),
      );

      const refreshToken = cookies.get('refresh_token');

      if (!refreshToken) throw new Error(errMessage);

      const { access_token } = await this.authService.refreshToken(
        refreshToken,
      );

      res.status(200).jsonp({ access_token });
    } catch (error) {
      res.status(401).send('Unauthorized.');
    }
  }

  async _signIn(userId: string, response: Response) {
    const { access_token, refresh_token } = await this.authService.login({
      userId,
    });

    response
      .status(200)
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 86400000, //1 day
      })
      .jsonp({ access_token });
  }
}
