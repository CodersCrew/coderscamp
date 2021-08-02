import { Global, Module } from '@nestjs/common';

import { UserRepositoryService } from '../contracts /user.repository.service';
import { PrismaService } from './prisma.service';
import { PrismaUserAdapter } from './prisma.user.adapter';

@Global()
@Module({
  providers: [PrismaService, { provide: UserRepositoryService, useClass: PrismaUserAdapter }],
  exports: [PrismaService, UserRepositoryService],
})
export class PrismaModule {}
