/* eslint-disable @typescript-eslint/naming-convention */
export interface GithubDTO {
  id: number;
  name: string;
  email: string;
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
