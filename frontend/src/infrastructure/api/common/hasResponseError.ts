import { ResponseFail, ResponseTL } from 'infrastructure/api/common/ResponseTL';

export const hasErrorInResponse = <T>(
  response: Awaited<ResponseTL<T>>,
): response is ResponseFail => 'error' in response && response.error !== null;
