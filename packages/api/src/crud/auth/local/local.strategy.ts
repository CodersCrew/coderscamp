import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';

import type { LoginBody } from '@coderscamp/shared/models/auth/login';
import { omit } from '@coderscamp/shared/utils/object';

import { PASSWORD_ENCODER, PasswordEncoder } from '@/write/shared/application/password-encoder';

import { AuthUserRepository } from '../auth-user.repository';

const strategyOptions: IStrategyOptions & Record<string, keyof LoginBody> = {
  usernameField: 'email' as const,
  passwordField: 'password' as const,
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authUserRepository: AuthUserRepository,
    @Inject(PASSWORD_ENCODER) private readonly passwordEncoder: PasswordEncoder,
  ) {
    super(strategyOptions);
  }

  async validate(email: string, password: string) {
    const user = await this.authUserRepository.findAuthUser({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await this.passwordEncoder.matches(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return omit(user, ['password']);
  }
}
