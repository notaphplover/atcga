export type Mapping<TFrom extends string, TTo extends string> = {
  [TKey in TFrom]: TTo;
};
