import { z } from 'zod';

import { ResponseSuccess } from 'infrastructure/api/common';
import { generateTLMock } from 'infrastructure/services/http/httpMockGenerator';

export const DayJoin = z.object({
  category_id: z.number(),
  todo_id: z.number(),
});

export const validateDayJoin = <T>(value: ResponseSuccess<T>) => {
  return DayJoin.safeParse(value);
};

validateDayJoin.mock = generateTLMock(DayJoin);

export const DayJoinIndex = z.array(DayJoin);

export const validateDayJoinIndex = <T>(value: ResponseSuccess<T>) => {
  return DayJoinIndex.safeParse(value);
};

validateDayJoinIndex.mock = generateTLMock(DayJoinIndex);
