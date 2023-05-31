import { ZodError } from 'zod';

export type ResponseFail = {
  data: null;
  error: string;
};

export type ResponseTLException = ResponseFail & {
  exception?: boolean;
};
export type ResponseValidationFail<T> = ResponseFail & {
  error: ZodError<T>;
};

export type ResponseSuccess<T> = {
  data: T;
  error: null;
};

export type ResponseTL<T = void> = Promise<
  | ResponseFail
  | ResponseSuccess<T>
  | ResponseTLException
  | ResponseValidationFail<T>
>;

export type GatewayResponse<T = void> = ResponseTL<T>;
