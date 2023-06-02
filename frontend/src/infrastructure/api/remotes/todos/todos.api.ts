import { z } from 'zod';

import {
  Todo,
  TodoIndex,
  validateTodo,
  validateTodoIndex,
} from 'domain/server/Todo/todo';
import { createFetchAndValidateData } from 'infrastructure/api/common/createFetchWithValidation';
import { fetcher, PassedOptions } from 'infrastructure/api/common/fetcher';
import { handleError } from 'infrastructure/api/common/handleError';
import { ResponseTL } from 'infrastructure/api/common/ResponseTL';

const baseURL = `/api/v1`;

const fetchTodoAPI = async (
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof TodoIndex>> => {
  const url = `${baseURL}/todos`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'fetchTodoAPI' });
  }
};

export const fetchTodo = createFetchAndValidateData(
  fetchTodoAPI,
  validateTodoIndex,
);

const fetchTodoItemAPI = async (
  todoId: string,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof Todo>> => {
  const url = `${baseURL}/todos/${todoId}`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'fetchTodoItemAPI' });
  }
};

export const fetchTodoItem = createFetchAndValidateData(
  fetchTodoItemAPI,
  validateTodo,
);
