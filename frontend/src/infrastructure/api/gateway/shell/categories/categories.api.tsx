import { Category } from 'domain/entities/Category';
import { Fetcher, ResponseTL } from 'infrastructure/api/common';
import { handleError } from 'infrastructure/api/common/handleError';

/** @type {import('../../../../../../app/api/shell/categories/route').HandlerResponse}  */

export type CategoriesResponse = ResponseTL<Category[]>;

export const fetchCategories =
  (fetcher: Fetcher) => async (): CategoriesResponse => {
    const url = `/api/shell/categories`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: 'fetchCategories' });
    }
  };
