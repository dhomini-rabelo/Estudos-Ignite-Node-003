import { ID } from './id'

export type WithID<Props> = Props & {
  id: ID
}

export type ConditionalType<T> = T extends null ? string : number

export type MappedType<T> = {
  [K in keyof T]: T[K] | null
}

export type TrueMappedType<T> = {
  [K in keyof T]: true
}
