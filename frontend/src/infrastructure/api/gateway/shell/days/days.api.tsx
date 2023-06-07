import { Day } from 'domain/entities/Day';
import { Fetcher, ResponseTL } from 'infrastructure/api/common';
import { handleError } from 'infrastructure/api/common/handleError';

/** @type {import('../../../../../../app/api/shell/days/route').HandlerResponse}  */

export type DaysResponse = ResponseTL<Day[]>;

export const fetchDays = (fetcher: Fetcher) => async (): DaysResponse => {
  const url = `/api/shell/days`;

  try {
    return await fetcher(url);
  } catch (error) {
    return handleError({ error, origin: 'fetchDays' });
  }
};
