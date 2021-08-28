import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';

import type { LoginBody } from '@coderscamp/shared/models/auth/login';
import { omit } from '@coderscamp/shared/utils/object';

import { AuthUserRepository } from '../auth-user.repository';
import { checkPassword } from './local.utils';

const strategyOptions: IStrategyOptions & Record<string, keyof LoginBody> = {
  usernameField: 'email' as const,
  passwordField: 'password' as const,
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authUserRepository: AuthUserRepository) {
    super(strategyOptions);
  }

  async validate(email: string, password: string) {
    const user = await this.authUserRepository.findAuthUser({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await checkPassword(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return omit(user, ['password']);
  }
}
