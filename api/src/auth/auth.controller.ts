import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('username') userid: string,
    @Body('password') password: string,
  ) {
    await this.authService.signup(userid, password);
    return await this.authService.login({ userid });
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Get('hasura')
  async validateHasura(@Request() req) {
    const hasuraVariables = {
      'X-Hasura-User-Id': req.user.userid,
      'X-Hasura-Role': req.user.role,
    };
    return hasuraVariables;
  }
}
