import { Body, Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

import type { LogoutResponse } from '@coderscamp/shared/models/auth';
import { LoginResponse } from '@coderscamp/shared/models/auth/login';
import { RegisterBody, RegisterResponse } from '@coderscamp/shared/models/auth/register';

import { env } from '@/common/env';

import { AuthService } from './auth.service';
import { fromUserToJwt } from './jwt/jwt.utils';
import { LocalGuardRequest } from './local/local.types';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @Post('register')
  @HttpCode(204)
  async register(@Body() body: RegisterBody): Promise<RegisterResponse> {
    return this.authService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: LocalGuardRequest, @Res() res: Response): Promise<LoginResponse> {
    const token = this.jwtService.sign(fromUserToJwt(req.user));

    res
      .cookie(env.TOKEN_COOKIE_NAME, `${env.TOKEN_PREFIX}${token}`, {
        expires: new Date(Date.now() + env.TOKEN_EXPIRATION_TIME * 1000),
        httpOnly: true,
      })
      .sendStatus(204);
  }

  @Post('logout')
  async logout(@Res() res: Response): Promise<LogoutResponse> {
    res.clearCookie(env.TOKEN_COOKIE_NAME).sendStatus(204);
  }
}
