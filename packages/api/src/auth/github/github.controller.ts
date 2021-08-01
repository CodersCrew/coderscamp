import { Controller, Get, InternalServerErrorException, Req, UseGuards } from '@nestjs/common';

import { GithubGuard } from './github.guard';
import type { GithubUserData } from './github.model';
import { GithubStrategy } from './github.strategy';

@Controller('auth/github')
export class GithubController {
  constructor(private githubStrategy: GithubStrategy) {}

  @Get('login')
  @UseGuards(GithubGuard)
  async githubOAuth() {
    // Redirects to github login page
  }

  @Get('callback')
  @UseGuards(GithubGuard)
  async githubOAuthCallback(@Req() req: Request & { user: GithubUserData }) {
    const result = await this.githubStrategy.githubAuth(req.user);

    if (result) return result;

    throw new InternalServerErrorException();
  }
}
