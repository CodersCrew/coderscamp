import { Controller, Get, InternalServerErrorException, Req, UseGuards } from '@nestjs/common';

import { GithubGuard } from './github.guard';
import { GithubService } from './github.service';
import type { RequestWithGitHubUser } from './github.types';

@Controller('auth/github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Get()
  @UseGuards(GithubGuard)
  async githubOAuth() {
    // Redirects to github login page
  }

  @Get('callback')
  @UseGuards(GithubGuard)
  async githubOAuthCallback(@Req() req: RequestWithGitHubUser) {
    const result = await this.githubService.authorizeUser(req.user);

    if (!result) {
      throw new InternalServerErrorException();
    }

    return result;
  }
}
