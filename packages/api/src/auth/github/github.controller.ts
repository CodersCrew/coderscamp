import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';

import { env } from '@/common/env';

import { JwtService } from '../jwt/jwt.service';
import { GithubService } from './github.service';
import { GithubAuthGuardReq } from './github.types';
import { GithubAuthGuard } from './github-auth.guard';

@Controller('auth/github')
export class GithubController {
  constructor(private githubService: GithubService, private readonly jwtService: JwtService) {}

  @Get()
  @UseGuards(GithubAuthGuard)
  async githubOAuth() {
    // Redirects to github login page
  }

  @Get('callback')
  @UseGuards(GithubAuthGuard)
  async githubOAuthCallback(@Req() req: GithubAuthGuardReq, @Res() res: Response): Promise<boolean> {
    const user = await this.githubService.authorizeUser(req.user);
    const token = await this.jwtService.generateToken(user);

    res
      .status(200)
      .cookie(env.TOKEN_COOKIE_NAME, env.TOKEN_PREFIX + token, {
        expires: new Date(Date.now() + env.TOKEN_EXPIRATION_TIME * 1000),
        httpOnly: true,
      })
      .send(true);

    return true;
  }
}
