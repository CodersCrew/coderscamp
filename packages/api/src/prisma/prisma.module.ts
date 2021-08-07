import { Global, Module } from '@nestjs/common';

import { UserRepository } from '../contracts/user.repository';
import { PrismaService } from './prisma.service';
import { PrismaUserAdapter } from './prisma.user.adapter';

@Global()
@Module({
  providers: [PrismaService, { provide: UserRepository, useClass: PrismaUserAdapter }],
  exports: [PrismaService, UserRepository],
})
export class PrismaModule {}
