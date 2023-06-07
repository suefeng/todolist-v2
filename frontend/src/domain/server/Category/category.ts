import { z } from 'zod';

import { ResponseSuccess } from 'infrastructure/api/common';
import { generateTLMock } from 'infrastructure/services/http/httpMockGenerator';

export const Category = z.object({
  id: z.number(),
  name: z.string(),
});

export const validateCategory = <T>(value: ResponseSuccess<T>) => {
  return Category.safeParse(value);
};

validateCategory.mock = generateTLMock(Category);

export const CategoryIndex = z.array(Category);

export const validateCategoryIndex = <T>(value: ResponseSuccess<T>) => {
  return CategoryIndex.safeParse(value);
};

validateCategoryIndex.mock = generateTLMock(CategoryIndex);
