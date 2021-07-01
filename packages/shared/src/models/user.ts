export type User = {
  id: number;
  githubId: number;
  fullName: string;
  email: string;
  image: string;
};

export type GetAllUsersResponse = User[];
