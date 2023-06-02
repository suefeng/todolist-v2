import { z } from 'zod';

import { CategoryIndex, validateCategoryIndex } from 'domain/server/Category';
import { createFetchAndValidateData } from 'infrastructure/api/common/createFetchWithValidation';
import { fetcher, PassedOptions } from 'infrastructure/api/common/fetcher';
import { handleError } from 'infrastructure/api/common/handleError';
import { ResponseTL } from 'infrastructure/api/common/ResponseTL';

const baseURL = `/api/v1`;

const fetchCategoryAPI = async (
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof CategoryIndex>> => {
  const url = `${baseURL}/categories`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'fetchCategoryAPI' });
  }
};

export const fetchCategory = createFetchAndValidateData(
  fetchCategoryAPI,
  validateCategoryIndex,
);
