import type { Request } from 'express';

export interface GithubDTO {
  id: number;
  name: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  avatar_url: string;
}

export interface GithubUserData {
  githubId: number;
  email: string;
  image: string;
  fullName: string;
}

export interface GithubResponse {
  _json: GithubDTO;
}

export interface RequestWithGithubUser extends Request {
  user: GithubUserData;
}
