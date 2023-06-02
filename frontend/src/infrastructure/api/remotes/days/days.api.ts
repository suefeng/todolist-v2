import { z } from 'zod';

import { DayIndex, validateDayIndex } from 'domain/server/Day';
import { createFetchAndValidateData } from 'infrastructure/api/common/createFetchWithValidation';
import { fetcher, PassedOptions } from 'infrastructure/api/common/fetcher';
import { handleError } from 'infrastructure/api/common/handleError';
import { ResponseTL } from 'infrastructure/api/common/ResponseTL';

const baseURL = `/api/v1`;

const fetchDayAPI = async (
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof DayIndex>> => {
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

export const fetchDay = createFetchAndValidateData(
  fetchDayAPI,
  validateDayIndex,
);
