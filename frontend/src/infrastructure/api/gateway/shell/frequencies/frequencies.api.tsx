import { Frequency } from 'domain/entities/Frequency';
import { Fetcher, ResponseTL } from 'infrastructure/api/common';
import { handleError } from 'infrastructure/api/common/handleError';

/** @type {import('../../../../../../app/api/shell/frequencies/route').HandlerResponse}  */

export type FrequenciesResponse = ResponseTL<Frequency[]>;

export const fetchFrequencies =
  (fetcher: Fetcher) => async (): FrequenciesResponse => {
    const url = `/api/shell/frequencies`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: 'fetchFrequencies' });
    }
  };
