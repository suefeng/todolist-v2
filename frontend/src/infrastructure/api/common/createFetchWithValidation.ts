import { ZodType } from 'zod';

import { PassedOptions } from 'infrastructure/api/common/fetcher';
import {
  hasErrorInResponse,
} from 'infrastructure/api/common/hasResponseError';
import {
  ResponseSuccess,
  ResponseTL,
  ResponseValidationFail,
} from 'infrastructure/api/common/ResponseTL';

type FetchFunction<A, R> = (args: A, options: PassedOptions) => ResponseTL<R>;
type ValidationFunction<R, V> = {
  (data: R): ReturnType<ZodType<V>['safeParse']>;
  mock: () => Promise<ResponseSuccess<V>>;
};

export const createFetchAndValidateData =
  <Arguments, Response, ValidatedData>(
    fetchFunction: FetchFunction<Arguments, Response>,
    validationFunction: ValidationFunction<
      ResponseSuccess<Response>,
      ValidatedData
    >,
  ) =>
  async (args: Arguments, options: PassedOptions & { withMock?: boolean }) => {
    if (options.withMock) {
      return validationFunction.mock();
    }

    const rawData = await fetchFunction(args, options);

    if (hasErrorInResponse(rawData)) {
      return { error: rawData.error, data: null };
    }

    const validatedData = validationFunction(rawData);

    if (!validatedData.success) {
      return {
        error: validatedData.error,
        data: null,
      } as ResponseValidationFail<unknown>;
    }

    return { data: validatedData.data, error: null };
  };
