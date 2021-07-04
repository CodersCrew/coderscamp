import { Controller, Get, InternalServerErrorException, Req, UseGuards } from '@nestjs/common';

import { GithubClient } from './github.client';
import { GithubGuard } from './github.guard';
import { GithubUserData } from './github.model';

@Controller('auth/github')
export class GithubController {
  constructor(private githubClient: GithubClient) {}

  @Get('login')
  @UseGuards(GithubGuard)
  async githubOAuth() {
    // Redirects to github login page
  }

  @Get('callback')
  @UseGuards(GithubGuard)
  async githubOAuthCallback(@Req() req: Request & { user: GithubUserData }) {
    const result = await this.githubClient.githubAuth(req.user);

    if (result) return result;
    throw new InternalServerErrorException();
  }
}
