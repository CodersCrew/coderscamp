import { Controller, Get, InternalServerErrorException, Req, UseGuards } from '@nestjs/common';

import { GithubUserData } from './auth.model';
import { AuthService } from './auth.service';
import { GithubGuard } from './guards/github.gurad';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('github/login')
  @UseGuards(GithubGuard)
  async githubOAuth() {
    // Redirects to github login page
  }

  @Get('github/callback')
  @UseGuards(GithubGuard)
  async githubOAuthCallback(@Req() req: Request & { user: GithubUserData }) {
    const result = this.authService.githubAuth(req.user);
    if (result) return result;
    throw new InternalServerErrorException();
  }
}
