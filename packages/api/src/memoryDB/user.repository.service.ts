import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { Survey } from '@coderscamp/shared/models/user';

import { UserRepositoryService } from '../contracts/user.repository.service';
import { MemoryDbService } from './memoryDB.service';

const CONFIG = {
  userTableName: 'User',
  surveyTableName: 'Survey',
  schemaPrefix: 'vc',
};

@Injectable()
export class PgMemUserRepositoryAdapter implements UserRepositoryService {
  constructor(private readonly pgMem: MemoryDbService) {}

  async create(data: User) {
    await this.pgMem.db.public.one(
      `INSERT INTO "${CONFIG.userTableName}" (${this.pgMem.mapKeysArrayToColumnNamesString(
        Object.keys(data),
      )}) VALUES (${this.pgMem.mapValueArrayToInsertString(Object.values(data))})`,
    );
    return this.findByGithubId(data.githubId);
  }

  async findByGithubId(githubId: number) {
    return this.pgMem.db.public.one(`SELECT * FROM "${CONFIG.userTableName}" u WHERE u."githubId"= ${githubId}`);
  }

  async update({ id, ...data }: User) {
    return this.pgMem.db.public.one(
      `UPDATE "${CONFIG.userTableName}" SET ${this.pgMem.mapObjectToUpdateString(data)} WHERE id = ${id}`,
    );
  }

  async findById(id: number): Promise<User | null> {
    return this.pgMem.db.public.one(`SELECT * FROM "${CONFIG.userTableName}" u WHERE u.id = ${id}`);
  }

  async saveSurvey(survey: Survey) {
    return this.pgMem.db.public.one(
      `INSERT INTO Survey (${this.pgMem.mapKeysArrayToColumnNamesString(
        Object.keys(survey),
      )}) VALUES (${this.pgMem.mapValueArrayToInsertString(Object.values(survey))}`,
    );
  }

  async getUser(id: number) {
    return this.pgMem.db.public.one(
      `SELECT * FROM "${CONFIG.userTableName}" u INNER JOIN "${CONFIG.surveyTableName}" s ON u.id = s."userId" WHERE u.id = ${id}`,
    );
  }
}
