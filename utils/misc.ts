export type ValuesOf<T> = T extends Record<any, infer V> ? V : never;
export type KeysOf<T> = T extends Record<infer K, any> ? K : never;