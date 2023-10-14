import { z } from 'zod';

import {
  DayJoin,
  DayJoinIndex,
  validateDayJoin,
  validateDayJoinIndex,
} from 'domain/server/DayJoin/dayJoin';
import { createFetchAndValidateData } from 'infrastructure/api/common/createFetchWithValidation';
import { fetcher, PassedOptions } from 'infrastructure/api/common/fetcher';
import { handleError } from 'infrastructure/api/common/handleError';
import { ResponseTL } from 'infrastructure/api/common/ResponseTL';

const baseURL = `/api/v1`;

// day_joins #index
const fetchDayJoinsAPI = async (
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof DayJoinIndex>> => {
  const url = `${baseURL}/days`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'fetchDayAPI' });
  }
};

export const fetchDayJoins = createFetchAndValidateData(
  fetchDayJoinsAPI,
  validateDayJoinIndex,
);

// day_joins #create
const createDayJoinAPI = async (
  dayJoin: Partial<z.infer<typeof DayJoin>>,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof DayJoin>> => {
  const url = `${baseURL}/day_joins/`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'createDayJoinAPI' });
  }
};

export const createDayJoin = createFetchAndValidateData(
  createDayJoinAPI,
  validateDayJoin,
);

// day_joins #update
const updateDayJoinAPI = async (
  dayJoin: Partial<z.infer<typeof DayJoin>>,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof DayJoin>> => {
  const url = `${baseURL}/day_joins/${dayJoin.todo_id}`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'updateDayJoinAPI' });
  }
};

export const updateDayJoin = createFetchAndValidateData(
  updateDayJoinAPI,
  validateDayJoin,
);
