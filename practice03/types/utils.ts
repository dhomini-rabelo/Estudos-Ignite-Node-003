export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export type Mandatory<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>
