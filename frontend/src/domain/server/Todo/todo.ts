import { z } from 'zod';

import { ResponseSuccess } from 'infrastructure/api/common';
import { generateTLMock } from 'infrastructure/services/http/httpMockGenerator';
import { Category } from '../Category';
import { Day } from '../Day';
import { Frequency } from '../Frequency';

export const Todo = z.object({
  categories: z.array(Category).optional(),
  description: z.string().optional(),
  expiration: z.string().optional(),
  id: z.number(),
  frequencies: z.array(Frequency).optional(),
  days: z.array(Day).optional(),
  status: z.string().optional(),
});

export const validateTodo = <T>(value: ResponseSuccess<T>) => {
  return Todo.safeParse(value);
};

validateTodo.mock = generateTLMock(Todo);

export const TodoIndex = z.array(Todo);

export const CreateTodo = z.object({
  categories: z.array(Category).optional(),
  description: z.string().optional(),
  expiration: z.string().optional(),
  frequencies: z.array(Frequency).optional(),
  days: z.array(Day).optional(),
  status: z.string().optional(),
});

export const validateCreateTodo = <T>(value: ResponseSuccess<T>) => {
  return CreateTodo.safeParse(value);
};

validateCreateTodo.mock = generateTLMock(CreateTodo);

export const DestroyTodo = z.object({
  id: z.number(),
});

export const validateDestroyTodo = <T>(value: ResponseSuccess<T>) => {
  return DestroyTodo.safeParse(value);
};

validateDestroyTodo.mock = generateTLMock(DestroyTodo);
