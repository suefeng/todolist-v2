import { FrequencyJoin } from 'domain/entities/FrequencyJoin';
import { Fetcher, ResponseTL } from 'infrastructure/api/common';
import { handleError } from 'infrastructure/api/common/handleError';

/** @type {import('../../../../../../app/api/shell/frequency_joins/route').HandlerResponse}  */

export type FrequencyJoinsResponse = ResponseTL<FrequencyJoin[]>;

export const fetchFrequencyJoins =
  (fetcher: Fetcher) => async (): FrequencyJoinsResponse => {
    const url = `/api/shell/frequency_joins`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: 'fetchFrequencyJoins' });
    }
  };

/** @type {import('../../../../../../app/api/shell/frequency_joins/route').HandlerPOSTResponse}  */

export type FrequencyJoinsPostResponse = ResponseTL<FrequencyJoin>;

export const createFrequencyJoin =
  (fetcher: Fetcher) =>
  async (frequencyJoin: FrequencyJoin): FrequencyJoinsPostResponse => {
    const url = `/api/shell/frequency_joins`;

    try {
      return await fetcher(url, { body: { ...frequencyJoin }, method: 'POST' });
    } catch (error) {
      return handleError({ error, origin: 'createFrequencyJoin' });
    }
  };

/** @type {import('../../../../../../app/api/shell/frequency_joins/[id]route').HandlerPUTResponse}  */

export type FrequencyJoinPutResponse = ResponseTL<FrequencyJoin>;

export const updateFrequencyJoin =
  (fetcher: Fetcher) =>
  async (frequencyJoin: FrequencyJoin): FrequencyJoinPutResponse => {
    const url = `/api/shell/todos/${frequencyJoin.todo_id}`;

    try {
      return await fetcher(url, { body: { ...frequencyJoin }, method: 'PUT' });
    } catch (error) {
      return handleError({ error, origin: 'updateFrequencyJoin' });
    }
  };
