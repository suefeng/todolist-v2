import { Category } from "domain/entities/Category";
import { Fetcher, ResponseTL } from "infrastructure/api/common";
import { handleError } from "infrastructure/api/common/handleError";

/** @type {import('../../../../../../app/api/shell/frequencies/route').HandlerResponse}  */

export type FrequenciesResponse = ResponseTL<{
  todos: Category[];
}>;

export const fetchFrequencies =
  (fetcher: Fetcher) => async (): FrequenciesResponse => {
    const url = `/api/shell/frequencies`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: "fetchFrequencies" });
    }
  };

/** @type {import('../../../../../../app/api/shell/frequencies/[frequencyId]/route').HandlerResponse}  */

export type CategoryResponse = ResponseTL<{
  todo: Category;
}>;

export const fetchCategoryResponse =
  (fetcher: Fetcher) =>
  async (frequencyId: string): CategoryResponse => {
    const url = `/api/shell/category/${frequencyId}/`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: "fetchCategoryResponse" });
    }
  };

/** @type {import('../../../../../../app/api/shell/category/[frequencyId]/route').HandlerResponse}  */

export const createCategory = (fetcher: Fetcher) => async (name: string) => {
  const url = `/api/shell/category`;

  try {
    return await fetcher(url, { body: {} });
  } catch (error) {
    return handleError({ error, origin: "createCategory" });
  }
};
