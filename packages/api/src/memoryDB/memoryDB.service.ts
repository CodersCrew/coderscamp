import { Injectable } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { IMemoryDb, newDb } from 'pg-mem';

@Injectable()
export class MemoryDbService {
  public readonly db: IMemoryDb;

  constructor() {
    const db = newDb();
    this.db = db;
  }

  async migrate() {
    await this.db.public.migrate({ migrationsPath: `${__dirname}/migrations` });
  }

  mapObjectToUpdateString(object: { [key: string]: any }): string {
    return Object.entries(object)
      .map(([key, value]) => {
        if (typeof value === 'string') return `"${key}" = '${value}'`;
        return `"${key}" = ${value}`;
      })
      .join(', ');
  }

  mapValueArrayToInsertString(array: any[]): string {
    return array.map((value) => (typeof value === 'string' ? `'${value}'` : value)).join(', ');
  }

  mapKeysArrayToColumnNamesString(array: string[]): string {
    return array.map((val) => `"${val}"`).join(', ');
  }
}
