import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@coderscamp/shared/models/user';

import { UsersService } from '../users/users.service';
import { GithubUserData } from './auth.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  login(user: User) {
    const { id, ...profile } = user;
    return this.jwtService.sign({ profile, sub: id });
  }

  async githubAuth(user: GithubUserData) {
    let userFromDatabase = await this.usersService.getByGithubId(user.githubId);
    if (!userFromDatabase) userFromDatabase = await this.usersService.create(user);
    return { accessToken: this.login(userFromDatabase), profile: userFromDatabase };
  }
}
