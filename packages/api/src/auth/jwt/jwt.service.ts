import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { UsersMapper } from '../../users/users.mapper';
import type { UserFromJwt } from '../../users/users.types';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  generateToken(user: UserFromJwt): string {
    return this.nestJwtService.sign(UsersMapper.fromDomainToJwt(user));
  }
}
