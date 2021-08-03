import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { RegisteredUserDTO, Survey, User as SharedUser } from '@coderscamp/shared/models/user';

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

  private mapGetResultToSurvey({
    id,
    githubId,
    fullName,
    email,
    image,
    gender,
    city,
    birthYear,
    isStudent,
    ...survey
  }: User & Survey) {
    const user = { id, githubId, fullName, email, image, gender, city, birthYear, isStudent };

    return survey.userId ? { ...user, Survey: survey } : { ...user, Survey: null };
  }

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
    this.pgMem.db.public.one(
      `UPDATE "${CONFIG.userTableName}" SET ${this.pgMem.mapObjectToUpdateString(data)} WHERE id = ${id}`,
    );

    return this.findById(id) as unknown as User;
  }

  async findById(id: number): Promise<User | null> {
    return this.pgMem.db.public.one(`SELECT * FROM "${CONFIG.userTableName}" u WHERE u.id = ${id}`);
  }

  async saveSurvey({ Survey: survey, ...user }: SharedUser) {
    this.pgMem.db.public.one(
      `INSERT INTO "${CONFIG.surveyTableName}" (${this.pgMem.mapKeysArrayToColumnNamesString(
        Object.keys(survey),
      )}) VALUES (${this.pgMem.mapValueArrayToInsertString(Object.values(survey))})`,
    );

    this.update(user);

    return this.getUser(survey.userId) as Promise<SharedUser>;
  }

  async getUser(id: number) {
    const result = await this.pgMem.db.public.one(
      `SELECT * FROM "${CONFIG.userTableName}" u LEFT JOIN "${CONFIG.surveyTableName}" s ON u.id = s."userId" WHERE u.id = ${id}`,
    );

    if (!result) return null;

    const mappingResult = this.mapGetResultToSurvey(result);

    return new Promise<((RegisteredUserDTO | User) & { Survey: Survey | null }) | null>((resolve) => {
      resolve(mappingResult);
    });
  }
}
