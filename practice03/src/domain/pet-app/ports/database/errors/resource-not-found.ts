import { DatabaseError } from "./_base";

export class ResourceNotFoundError extends DatabaseError {
  constructor() {
    super('Resource not found')
  }
}