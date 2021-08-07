import { Global, Module } from '@nestjs/common';

import { UserRepository } from '../contracts/user.repository';
import { MemoryDbService } from './memoryDB.service';
import { PgMemUserRepositoryAdapter } from './user.repository';

@Global()
@Module({
  providers: [MemoryDbService, { provide: UserRepository, useClass: PgMemUserRepositoryAdapter }],
  exports: [MemoryDbService, UserRepository],
})
export class MemoryDbModule {}
