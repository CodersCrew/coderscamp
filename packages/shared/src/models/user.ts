export type User = {
  id: string;
  githubId: number;
  fullName: string;
  email: string;
  image: string;
};

export type GetAllUsersResponse = User[];

export type GetMeResponse = User | null;
