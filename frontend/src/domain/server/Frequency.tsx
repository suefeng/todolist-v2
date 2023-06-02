import { z } from 'zod';

import { ResponseSuccess } from 'infrastructure/api/common';
import { generateTLMock } from 'infrastructure/services/http/httpMockGenerator';

export const Frequency = z.object({
  id: z.number(),
  name: z.string(),
});

export const validateFrequency = <T,>(value: ResponseSuccess<T>) => {
  return Frequency.safeParse(value);
};

validateFrequency.mock = generateTLMock(Frequency);

export const FrequencyIndex = z.array(Frequency);

export const validateFrequencyIndex = <T,>(value: ResponseSuccess<T>) => {
  return FrequencyIndex.safeParse(value);
};

validateFrequencyIndex.mock = generateTLMock(FrequencyIndex);
