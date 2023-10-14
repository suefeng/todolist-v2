import { DayJoin } from 'domain/entities/DayJoin';
import { Fetcher, ResponseTL } from 'infrastructure/api/common';
import { handleError } from 'infrastructure/api/common/handleError';

/** @type {import('../../../../../../app/api/shell/day_joins/route').HandlerResponse}  */

export type DayJoinsResponse = ResponseTL<DayJoin[]>;

export const fetchDayJoins =
  (fetcher: Fetcher) => async (): DayJoinsResponse => {
    const url = `/api/shell/day_joins`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: 'fetchDayJoins' });
    }
  };

/** @type {import('../../../../../../app/api/shell/day_joins/route').HandlerPOSTResponse}  */

export type DayJoinsPostResponse = ResponseTL<DayJoin>;

export const createDayJoin =
  (fetcher: Fetcher) =>
  async (dayJoin: DayJoin): DayJoinsPostResponse => {
    const url = `/api/shell/day_joins`;

    try {
      return await fetcher(url, { body: { ...dayJoin }, method: 'POST' });
    } catch (error) {
      return handleError({ error, origin: 'createDayJoin' });
    }
  };

/** @type {import('../../../../../../app/api/shell/day_joins/[id]route').HandlerPUTResponse}  */

export type DayJoinPutResponse = ResponseTL<DayJoin>;

export const updateDayJoin =
  (fetcher: Fetcher) =>
  async (dayJoin: DayJoin): DayJoinPutResponse => {
    const url = `/api/shell/todos/${dayJoin.todo_id}`;

    try {
      return await fetcher(url, { body: { ...dayJoin }, method: 'PUT' });
    } catch (error) {
      return handleError({ error, origin: 'updateDayJoin' });
    }
  };
