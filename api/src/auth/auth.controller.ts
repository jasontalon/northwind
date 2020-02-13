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
    await this._signIn(userId, res);
  }

  @Post('signInAsGuest')
  @HttpCode(200)
  async signInAsGuest(@Res() res: Response) {
    const userId = `guest-${shortid.generate()}`;
    await this.authService.signup(userId, '', 'guest');
    await this._signIn(userId, res);
  }

  @Post('signin')
  async signin(
    @Body('username') userId: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(userId, password);
    if (!user) res.status(400).send('User does not exists');
    else await this._signIn(userId, res);
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

  @Post('token/refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = !!req.headers.cookie
      ? this._getRefreshTokenCookie(req)
      : '';

    const token = await this.authService.refreshToken(refreshToken);
    if (token) res.status(200).jsonp(token);
    else res.status(401).send('Unauthorized.');
  }

  @Post('token/expire')
  async signOut(@Req() req: Request, @Res() res: Response) {
    const refreshToken = this._getRefreshTokenCookie(req);
    if (refreshToken) await this.usersService.expireRefreshToken(refreshToken);
    res
      .clearCookie('refresh_token', this._getRefreshTokenOptions())
      .status(200)
      .send('OK');
  }

  _getRefreshTokenCookie(req: Request) {
    const cookies = new URLSearchParams(req.headers.cookie.replace(/;/g, '&'));

    const refreshToken = cookies.get('refresh_token');
    return refreshToken;
  }

  _getRefreshTokenOptions() {
    return {
      path: '/api/auth/token',
      httpOnly: true,
      maxAge: 86400000, //1 day
    };
  }

  async _signIn(userId: string, response: Response) {
    const { access_token, refresh_token } = await this.authService.login({
      userId,
    });

    response
      .status(200)
      .cookie('refresh_token', refresh_token, this._getRefreshTokenOptions())
      .jsonp({ access_token });
  }
}
