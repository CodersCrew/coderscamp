import { RegisteredUser } from '@coderscamp/shared/models/user';

import { GithubUser } from './github.types';

export class GithubMapper {
  static fromGithubToDomain(user: GithubUser): Omit<RegisteredUser, 'id'> {
    // ! new user may not set his email address to public and also he may not set his name.
    return {
      fullName: user.name,
      email: user.email,
      image: user.avatar_url,
      githubId: user.id,
    };
  }
}
