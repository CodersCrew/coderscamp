/* eslint-disable max-classes-per-file */
class CustomException extends Error {
  constructor(private readonly response?: string) {
    super();
    this.name = this.constructor.name;
    this.message = this.response ?? this.name;
  }
}

export class ResourceAlreadyExistsException extends CustomException {}
export class ResourceNotFoundException extends CustomException {}
