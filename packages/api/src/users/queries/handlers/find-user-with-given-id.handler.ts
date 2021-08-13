import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { RegisteredUser, User } from '@coderscamp/shared/models';

import { UsersRepository } from '../../users.repository';
import { FindUserWithGivenIdQuery } from '../find-user-with-given-id.query';

@QueryHandler(FindUserWithGivenIdQuery)
export class FindUserWithGivenIdQueryHandler implements IQueryHandler<FindUserWithGivenIdQuery> {
  constructor(private readonly repository: UsersRepository) {}

  async execute(query: FindUserWithGivenIdQuery): Promise<User | RegisteredUser | null> {
    return this.repository.findById(query.userId);
  }
}
