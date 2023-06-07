import { z } from 'zod';

import {
  FrequencyIndex,
  validateFrequencyIndex,
} from 'domain/server/Frequency/frequency';
import { createFetchAndValidateData } from 'infrastructure/api/common/createFetchWithValidation';
import { fetcher, PassedOptions } from 'infrastructure/api/common/fetcher';
import { handleError } from 'infrastructure/api/common/handleError';
import { ResponseTL } from 'infrastructure/api/common/ResponseTL';

const baseURL = `/api/v1`;

const fetchFrequencyAPI = async (
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof FrequencyIndex>> => {
  const url = `${baseURL}/frequencies`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'fetchFrequencyAPI' });
  }
};

export const fetchFrequency = createFetchAndValidateData(
  fetchFrequencyAPI,
  validateFrequencyIndex,
);
