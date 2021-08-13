import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { RegisteredUser, User } from '@coderscamp/shared/models';

import { UsersRepository } from '../../users.repository';
import { FindUserWithGivenGithubIdQuery } from '../find-user-with-given-github-id.query';

@QueryHandler(FindUserWithGivenGithubIdQuery)
export class FindUserWithGivenGithubIdQueryHandler implements IQueryHandler<FindUserWithGivenGithubIdQuery> {
  constructor(private readonly repository: UsersRepository) {}

  async execute(query: FindUserWithGivenGithubIdQuery): Promise<User | RegisteredUser | null> {
    return this.repository.findByGithubId(query.githubId);
  }
}
