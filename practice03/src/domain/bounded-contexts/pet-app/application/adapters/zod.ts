import * as zod from 'zod'
import { ValidationError } from '../core/errors/validation-error/error'

export function adaptZodSchema<ISchema extends zod.ZodType>(
  schemaObject: ISchema,
  data: Record<string, any>,
) {
  const validation = schemaObject.safeParse(data)
  if (!validation.success) {
    throw new ValidationError()
  }
  return validation.data
}
