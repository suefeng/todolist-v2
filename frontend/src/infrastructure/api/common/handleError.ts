/* eslint-disable no-console */
import { ResponseTLException } from 'infrastructure/api/common/index';

type HandleError = {
  error: unknown;
  origin: string;
};

export const handleError = ({
  error,
  origin,
}: HandleError): Promise<ResponseTLException> => {
  const { message } = toErrorWithMessage(error);

  // TODO: this is how logz tracking errors
  const errorStringify = JSON.stringify({
    origin,
    message,
  });

  console.error(errorStringify, error);

  return Promise.resolve({ error: message, data: null });
};

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}
