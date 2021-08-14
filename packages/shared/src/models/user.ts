export type UserId = string;

export type RegisteredUser = {
  id: UserId;
  githubId: number;
  fullName: string | null;
  email: string | null;
  image: string;
};

export type NotRegisteredUser = Omit<RegisteredUser, 'id'>;

export type User = RegisteredUser & {
  gender: string;
  town: string;
  birthYear: number;
  educationStatus: string;
};

export type RegisteredUserDTO = RegisteredUser;

export type UserDTO = User;

export type GetAllUsersResponse = User[];
