import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { User } from '@coderscamp/shared/models/user';

@Injectable()
export class JwtStrategy {
  constructor(private jwtService: JwtService) {}

  generateToken({ id }: User) {
    return this.jwtService.sign({ sub: id });
  }
}
