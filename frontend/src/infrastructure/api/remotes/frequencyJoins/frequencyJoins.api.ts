import { z } from 'zod';

import {
  FrequencyJoin,
  FrequencyJoinIndex,
  validateFrequencyJoin,
  validateFrequencyJoinIndex,
} from 'domain/server/FrequencyJoin/fequencyJoin';
import { createFetchAndValidateData } from 'infrastructure/api/common/createFetchWithValidation';
import { fetcher, PassedOptions } from 'infrastructure/api/common/fetcher';
import { handleError } from 'infrastructure/api/common/handleError';
import { ResponseTL } from 'infrastructure/api/common/ResponseTL';

const baseURL = `/api/v1`;

// frequency_joins #index
const fetchFrequencyJoinsAPI = async (
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof FrequencyJoinIndex>> => {
  const url = `${baseURL}/categories`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'fetchFrequencyJoinsAPI' });
  }
};

export const fetchFrequencyJoins = createFetchAndValidateData(
  fetchFrequencyJoinsAPI,
  validateFrequencyJoinIndex,
);

// frequency_joins #create
const createFrequencyJoinAPI = async (
  frequencyJoin: Partial<z.infer<typeof FrequencyJoin>>,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof FrequencyJoin>> => {
  const url = `${baseURL}/frequency_joins/`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'createFrequencyJoinAPI' });
  }
};

export const createFrequencyJoin = createFetchAndValidateData(
  createFrequencyJoinAPI,
  validateFrequencyJoin,
);

// frequency_joins #update
const updateFrequencyJoinAPI = async (
  frequencyJoin: Partial<z.infer<typeof FrequencyJoin>>,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof FrequencyJoin>> => {
  const url = `${baseURL}/frequency_joins/${frequencyJoin.todo_id}`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'updateFrequencyJoinAPI' });
  }
};

export const updateFrequencyJoin = createFetchAndValidateData(
  updateFrequencyJoinAPI,
  validateFrequencyJoin,
);
