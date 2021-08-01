import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { JWTPayload } from '@/common/typings';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  generateToken({ id }: { id: number }) {
    const payload: JWTPayload = { sub: String(id) };

    return this.nestJwtService.sign(payload);
  }
}
