import type { GithubUser, NotRegisteredUser } from './github.types';

export class GithubMapper {
  static fromGithubToDomain(user: GithubUser): NotRegisteredUser {
    return {
      fullName: user.name || null,
      email: user.email || null,
      image: user.avatar_url,
      githubId: user.id,
    };
  }
}
