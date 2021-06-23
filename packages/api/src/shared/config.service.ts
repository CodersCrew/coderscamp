import { Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';

interface GithubOAuthConfig {
  clientID: string;
  clientSecret: string;
  callbackUrl: string;
}

@Injectable()
export class ConfigService {
  get databaseURL(): string {
    return process.env.DATABASE_URL || '';
  }

  get githubClientConfig(): GithubOAuthConfig {
    const clientID = process.env.GITHUB_CLIENT_ID || '';
    const clientSecret = process.env.GITHUB_CLIENT_SECRET || '';
    const callbackUrl = process.env.GITHUB_CALLBACK_URL || '';

    return { clientID, clientSecret, callbackUrl };
  }

  get jwtConfig(): JwtModuleOptions {
    return {
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: Number(process.env.TOKEN_EXPIRATION_TIME || 3600) },
    };
  }
}
