import { Global, Module } from '@nestjs/common';

import { UserRepositoryPort } from '../contracts/user.repository';
import { MemoryDbService } from './memoryDB.service';
import { PgMemUserRepositoryAdapter } from './user.repository';

@Global()
@Module({
  providers: [MemoryDbService, { provide: UserRepositoryPort, useClass: PgMemUserRepositoryAdapter }],
  exports: [MemoryDbService, UserRepositoryPort],
})
export class MemoryDbModule {}
