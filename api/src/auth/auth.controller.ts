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
import { CLIENT_RENEG_WINDOW } from 'tls';
import { CompressionTypes } from '@nestjs/common/interfaces/external/kafka-options.interface';
const shortid = require('shortid');

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('username') userId: string,
    @Body('password') password: string,
  ) {
    await this.authService.signup(userId, password, 'user');
    return await this.authService.login({ userId });
  }

  @Post('signInAsGuest')
  @HttpCode(200)
  async signInAsGuest(@Res() res: Response) {
    const userId = `guest-${shortid.generate()}`;
    await this.authService.signup(userId, '', 'guest');
    const { access_token, refresh_token } = await this.authService.login({
      userId,
    });
    
    res
      .status(200)
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 2 * 3600 * 1000,
      })
      .jsonp({ access_token });
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Req() req) {
    return await this.authService.login(req.user);
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

      const newToken = await this.authService.refreshToken(refreshToken);

      res.status(200).jsonp(newToken);
    } catch (error) {
      res.status(401).send('Unauthorized.');
    }
  }
}
