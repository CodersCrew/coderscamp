import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { RegisteredUser, UserInformation } from '@coderscamp/shared/models/user';

@Injectable()
export class JwtStrategy {
  constructor(private jwtService: JwtService) {}

  generateToken({ id }: UserInformation | RegisteredUser) {
    return this.jwtService.sign({ sub: id });
  }
}
