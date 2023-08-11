export type Lego<T> = {
  get: () => T;
  set: (newValue: T) => void;
  subscribe: (cb: (newValue: T) => void) => () => void;
};

export type LegoGetter<T> = (get: <U>(a: Lego<U>) => U) => T;
