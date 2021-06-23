import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import { User } from '@coderscamp/shared/models/user';

import { GithubUserData } from './auth.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  login(user: User) {
    const payload = { username: user.firstName, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async githubAuth(user: GithubUserData) {
    let userFromDatabase = await this.usersService.getByGithubId(user.githubId);
    if (!userFromDatabase) userFromDatabase = await this.usersService.create(user);
    return { accessToken: this.login(userFromDatabase), profile: userFromDatabase };
  }
}
