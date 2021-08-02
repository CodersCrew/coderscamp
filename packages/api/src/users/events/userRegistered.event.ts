import { GithubUserData } from '../../auth/github/github.model';

export class UserRegisteredEvent {
  constructor(public readonly input: GithubUserData) {}
}
