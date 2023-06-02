export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type ValueOf<T> = T[keyof T];

type FunctionType = (...args: any_FIXME[]) => any_FIXME;
export type GetElementType<T> = T extends (infer U)[] ? U : never;
export type GetGatewayFetchReturnType<T extends FunctionType> = Awaited<
  ReturnType<ReturnType<T>>
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type any_FIXME = any;
