import { DatabaseError } from "./_base";

export class ResourceRepeated extends DatabaseError {
  constructor() {
    super('Resource repeated')
  }
}