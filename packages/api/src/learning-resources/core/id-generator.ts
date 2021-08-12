export const ID_GENERATOR = Symbol('ID_GENERATOR');

export interface IdGenerator {
  generate(): Promise<string>;
}
