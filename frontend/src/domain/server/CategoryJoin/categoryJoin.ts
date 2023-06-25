import { z } from 'zod';

import { ResponseSuccess } from 'infrastructure/api/common';
import { generateTLMock } from 'infrastructure/services/http/httpMockGenerator';

export const CategoryJoin = z.object({
  category_id: z.number(),
  todo_id: z.number(),
});

export const validateCategoryJoin = <T>(value: ResponseSuccess<T>) => {
  return CategoryJoin.safeParse(value);
};

validateCategoryJoin.mock = generateTLMock(CategoryJoin);

export const CategoryJoinIndex = z.array(CategoryJoin);

export const validateCategoryJoinIndex = <T>(value: ResponseSuccess<T>) => {
  return CategoryJoinIndex.safeParse(value);
};

validateCategoryJoinIndex.mock = generateTLMock(CategoryJoinIndex);
