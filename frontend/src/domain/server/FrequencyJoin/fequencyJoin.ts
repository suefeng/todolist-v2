import { z } from 'zod';

import { ResponseSuccess } from 'infrastructure/api/common';
import { generateTLMock } from 'infrastructure/services/http/httpMockGenerator';

export const FrequencyJoin = z.object({
  frequency_id: z.number(),
  todo_id: z.number(),
});

export const validateFrequencyJoin = <T>(value: ResponseSuccess<T>) => {
  return FrequencyJoin.safeParse(value);
};

validateFrequencyJoin.mock = generateTLMock(FrequencyJoin);

export const FrequencyJoinIndex = z.array(FrequencyJoin);

export const validateFrequencyJoinIndex = <T>(value: ResponseSuccess<T>) => {
  return FrequencyJoinIndex.safeParse(value);
};

validateFrequencyJoinIndex.mock = generateTLMock(FrequencyJoinIndex);
