import { CategoryJoin } from 'domain/entities/CategoryJoin';
import { Fetcher, ResponseTL } from 'infrastructure/api/common';
import { handleError } from 'infrastructure/api/common/handleError';

/** @type {import('../../../../../../app/api/shell/category_joins/route').HandlerResponse}  */

export type CategoryJoinsResponse = ResponseTL<CategoryJoin[]>;

export const fetchCategoryJoins =
  (fetcher: Fetcher) => async (): CategoryJoinsResponse => {
    const url = `/api/shell/category_joins`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: 'fetchCategoryJoins' });
    }
  };

/** @type {import('../../../../../../app/api/shell/category_joins/route').HandlerPOSTResponse}  */

export type CategoryJoinsPostResponse = ResponseTL<CategoryJoin>;

export const createCategoryJoin =
  (fetcher: Fetcher) =>
  async (categoryJoin: CategoryJoin): CategoryJoinsPostResponse => {
    const url = `/api/shell/category_joins`;

    try {
      return await fetcher(url, { body: { ...categoryJoin }, method: 'POST' });
    } catch (error) {
      return handleError({ error, origin: 'createCategoryJoin' });
    }
  };

/** @type {import('../../../../../../app/api/shell/category_joins/[id]route').HandlerPUTResponse}  */

export type CategoryJoinPutResponse = ResponseTL<CategoryJoin>;

export const updateCategoryJoin =
  (fetcher: Fetcher) =>
  async (categoryJoin: CategoryJoin): CategoryJoinPutResponse => {
    const url = `/api/shell/todos/${categoryJoin.todo_id}`;

    try {
      return await fetcher(url, { body: { ...categoryJoin }, method: 'PUT' });
    } catch (error) {
      return handleError({ error, origin: 'updateCategoryJoin' });
    }
  };
