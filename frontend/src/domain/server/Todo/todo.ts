import { z } from 'zod';

import { ResponseSuccess } from 'infrastructure/api/common';
import { generateTLMock } from 'infrastructure/services/http/httpMockGenerator';
import { Category } from '../Category/category';
import { Day } from '../Day/day';
import { Frequency } from '../Frequency/frequency';
import { Note } from '../Note/note';

export const Todo = z.object({
  categories: z.array(Category).optional(),
  description: z.string(),
  expiration: z.string().optional().nullable(),
  id: z.number(),
  frequency: Frequency.optional().or(z.object({})),
  days: z.array(Day).optional(),
  status: z.string().optional(),
  note: Note.optional().or(z.object({})),
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

export const TodoCreate = z.object({
  categories: z.array(Category).optional(),
  description: z.string(),
  expiration: z.string().optional().nullable(),
  frequency: Frequency.optional().or(z.object({})),
  days: z.array(Day).optional(),
  status: z.string().optional(),
  note: Note.optional().or(z.object({})),
  id: z.number().optional(),
});

export const validateTodoCreate = <T>(value: ResponseSuccess<T>) => {
  return TodoCreate.safeParse(value);
};

validateTodoCreate.mock = generateTLMock(TodoCreate);

export const TodoDelete = z.object({
  id: z.number(),
});

export const validateTodoDelete = <T>(value: ResponseSuccess<T>) => {
  return TodoDelete.safeParse(value);
};

validateTodoDelete.mock = generateTLMock(TodoDelete);

export const TodoForm = z.object({
  categories: z.string().optional(),
  description: z.string({
    required_error: 'Please enter a description',
  }),
  expiration: z.coerce
    .date({
      invalid_type_error: 'Please select a date',
    })
    .optional()
    .nullable(),
  frequency: z.string().optional(),
  days: z.string().optional(),
  status: z.string().optional(),
  note: z.string().optional(),
});
