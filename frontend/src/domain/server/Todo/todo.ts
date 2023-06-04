import { z } from 'zod';

import { ResponseSuccess } from 'infrastructure/api/common';
import { generateTLMock } from 'infrastructure/services/http/httpMockGenerator';
import { Category } from '../Category';
import { Day } from '../Day';
import { Frequency } from '../Frequency';
import { Note } from '../Note';

export const Todo = z.object({
  categories: z.array(Category).optional(),
  description: z.string(),
  expiration: z.string().optional().nullable(),
  id: z.number(),
  frequencies: z.array(Frequency).optional(),
  days: z.array(Day).optional(),
  status: z.string().optional(),
  note: Note.optional(),
});

export const validateTodo = <T>(value: ResponseSuccess<T>) => {
  return Todo.safeParse(value);
};

validateTodo.mock = generateTLMock(Todo);

export const TodoIndex = z.array(Todo);

export const validateTodoIndex = <T>(value: ResponseSuccess<T>) => {
  return TodoIndex.safeParse(value);
};

validateTodoIndex.mock = generateTLMock(TodoIndex);

export const CreateTodo = z.object({
  categories: z.array(Category).optional(),
  description: z.string(),
  expiration: z.string().optional().nullable(),
  frequencies: z.array(Frequency).optional(),
  days: z.array(Day).optional(),
  status: z.string().optional(),
  note: Note.optional(),
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
