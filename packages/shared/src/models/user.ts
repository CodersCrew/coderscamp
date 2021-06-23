export type User = {
  id: number;
  githubId: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  image: string;
};

export type GetAllUsersResponse = User[];
