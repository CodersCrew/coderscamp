export const PASSWORD_ENCODER = Symbol('PASSWORD_ENCODER');

export interface PasswordEncoder {
  encode(plainPassword: string): Promise<string>;
  matches(plainPassword: string, encodedPassword: string): Promise<boolean>;
}
