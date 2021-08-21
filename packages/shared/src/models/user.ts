export type User = {
  id: string;
  fullName: string;
  email: string;
  image: string;
};

export type GetAllUsersResponse = User[];

export type GetMeResponse = User | null;
