export interface GithubDTO {
  id: string; // numeric
  nodeId: string;
  displayName: string;
  username: string;
  profileUrl: string;
  emails: { value: string }[];
  photos: { value: string }[];
  provider: string;
}

export interface GithubUserData {
  githubId: number;
  email: string;
  image: string;
}
