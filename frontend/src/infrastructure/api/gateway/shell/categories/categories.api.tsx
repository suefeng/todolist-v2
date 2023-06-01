import { Category } from 'domain/entities/Category';
import { Fetcher, ResponseTL } from 'infrastructure/api/common';
import { handleError } from 'infrastructure/api/common/handleError';

/** @type {import('../../../../../../app/api/shell/categories/route').HandlerResponse}  */

export type CategoriesResponse = ResponseTL<{
  todos: Category[];
}>;

export const fetchCategories =
  (fetcher: Fetcher) => async (): CategoriesResponse => {
    const url = `/api/shell/categories`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: 'fetchCategories' });
    }
  };

/** @type {import('../../../../../../app/api/shell/categories/[categoryId]/route').HandlerResponse}  */

export type CategoryResponse = ResponseTL<{
  todo: Category;
}>;

export const fetchCategoryResponse =
  (fetcher: Fetcher) =>
  async (categoryId: string): CategoryResponse => {
    const url = `/api/shell/category/${categoryId}/`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: 'fetchCategoryResponse' });
    }
  };

/** @type {import('../../../../../../app/api/shell/category/[categoryId]/route').HandlerResponse}  */

export const createCategory = (fetcher: Fetcher) => async (name: string) => {
  const url = `/api/shell/category`;

  try {
    return await fetcher(url, { body: {} });
  } catch (error) {
    return handleError({ error, origin: 'createCategory' });
  }
};
