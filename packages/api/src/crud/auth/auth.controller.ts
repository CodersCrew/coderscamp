import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Response } from 'express';

import type { LogoutResponse } from '@coderscamp/shared/models/auth';
import { LoginResponse } from '@coderscamp/shared/models/auth/login';
import { RegisterBody, registerError, RegisterResponse } from '@coderscamp/shared/models/auth/register';

import { env } from '@/common/env';
import { isUniqueConstraintError } from '@/common/prisma/prisma.errors';

import { fromUserToJwt } from './jwt/jwt.utils';
import { LocalGuardRequest } from './local/local.types';
import { LocalAuthGuard } from './local/local-auth.guard';
import { UserRegistrationService } from './user-registration.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userRegistrationService: UserRegistrationService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @HttpCode(204)
  async register(@Body() body: RegisterBody): Promise<RegisterResponse> {
    try {
      await this.userRegistrationService.register(body);
    } catch (ex) {
      if (isUniqueConstraintError(ex)) {
        throw new ConflictException(registerError.REGISTRATION_FORM_ALREADY_EXISTS);
      }

      throw new InternalServerErrorException(ex);
    }
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
