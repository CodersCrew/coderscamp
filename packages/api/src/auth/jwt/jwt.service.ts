import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { JwtMapper } from './jwt.mapper';
import type { UserFromJwt } from './jwt.types';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  generateToken(user: UserFromJwt): string {
    return this.nestJwtService.sign(JwtMapper.fromDomainToJwt(user));
  }
}
