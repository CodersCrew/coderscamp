export interface AuthUser {
  id: string;
  email: string;
  password: string;
}

export interface RegistrationForm {
  id: string;
  fullName: string;
  email: string;
}

export type LogoutResponse = void;
