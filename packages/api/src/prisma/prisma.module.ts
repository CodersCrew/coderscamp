import { Global, Module } from '@nestjs/common';

import { USER_REPOSITORY_PORT } from '../contracts/user.repository';
import { PrismaService } from './prisma.service';
import { PrismaUserAdapter } from './prisma.user.adapter';

const adapters = [{ provide: USER_REPOSITORY_PORT, useClass: PrismaUserAdapter }];
@Global()
@Module({
  providers: [PrismaService, ...adapters],
  exports: [PrismaService, ...adapters],
})
export class PrismaModule {}
