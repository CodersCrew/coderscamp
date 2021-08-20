import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

import type { LogoutResponse } from '@coderscamp/shared/models/auth';
import { RegisterBody, RegisterResponse } from '@coderscamp/shared/models/auth/register';

import { env } from '@/common/env';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(204)
  async register(@Body() body: RegisterBody): Promise<RegisterResponse> {
    return this.authService.register(body);
  }

  @Post('logout')
  async logout(@Res() res: Response): Promise<LogoutResponse> {
    res.clearCookie(env.TOKEN_COOKIE_NAME).sendStatus(204);
  }
}
