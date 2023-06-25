import { z } from 'zod';

import {
  CategoryJoin,
  CategoryJoinIndex,
  validateCategoryJoin,
  validateCategoryJoinIndex,
} from 'domain/server/CategoryJoin/categoryJoin';
import { createFetchAndValidateData } from 'infrastructure/api/common/createFetchWithValidation';
import { fetcher, PassedOptions } from 'infrastructure/api/common/fetcher';
import { handleError } from 'infrastructure/api/common/handleError';
import { ResponseTL } from 'infrastructure/api/common/ResponseTL';

const baseURL = `/api/v1`;

// category_joins #index
const fetchCategoryJoinsAPI = async (
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof CategoryJoinIndex>> => {
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

export const fetchCategoryJoins = createFetchAndValidateData(
  fetchCategoryJoinsAPI,
  validateCategoryJoinIndex,
);

// category_joins #create
const createCategoryJoinAPI = async (
  categoryJoin: Partial<z.infer<typeof CategoryJoin>>,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof CategoryJoin>> => {
  const url = `${baseURL}/category_joins/`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'createCategoryJoinAPI' });
  }
};

export const createCategoryJoin = createFetchAndValidateData(
  createCategoryJoinAPI,
  validateCategoryJoin,
);

// category_joins #update
const updateCategoryJoinAPI = async (
  categoryJoin: Partial<z.infer<typeof CategoryJoin>>,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof CategoryJoin>> => {
  const url = `${baseURL}/category_joins/${categoryJoin.todo_id}`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'updateCategoryJoinAPI' });
  }
};

export const updateCategoryJoin = createFetchAndValidateData(
  updateCategoryJoinAPI,
  validateCategoryJoin,
);
