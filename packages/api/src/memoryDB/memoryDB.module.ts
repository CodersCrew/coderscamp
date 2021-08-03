import { Global, Module } from '@nestjs/common';

import { UserRepositoryService } from '../contracts/user.repository.service';
import { MemoryDbService } from './memoryDB.service';
import { PgMemUserRepositoryAdapter } from './user.repository.service';

@Global()
@Module({
  providers: [MemoryDbService, { provide: UserRepositoryService, useClass: PgMemUserRepositoryAdapter }],
  exports: [MemoryDbService, UserRepositoryService],
})
export class MemoryDbModule {}
