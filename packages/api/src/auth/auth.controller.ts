import { Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';

import { env } from '@/common/env';

@Controller('auth')
export class AuthController {
  @Post('logout')
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie(env.TOKEN_COOKIE_NAME).sendStatus(204);
  }
}
