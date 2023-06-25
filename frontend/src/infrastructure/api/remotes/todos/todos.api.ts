import { z } from 'zod';

import {
  Todo,
  TodoDelete,
  TodoIndex,
  validateTodo,
  validateTodoCreate,
  validateTodoDelete,
  validateTodoIndex,
} from 'domain/server/Todo/todo';
import { createFetchAndValidateData } from 'infrastructure/api/common/createFetchWithValidation';
import { fetcher, PassedOptions } from 'infrastructure/api/common/fetcher';
import { handleError } from 'infrastructure/api/common/handleError';
import { ResponseTL } from 'infrastructure/api/common/ResponseTL';

const baseURL = `/api/v1`;

// todos #index
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

// todos #show
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

// todos #create
const createTodoItemAPI = async (
  todo: Partial<z.infer<typeof Todo>>,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof Todo>> => {
  const url = `${baseURL}/todos`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'createTodoItemAPI' });
  }
};

export const createTodoItem = createFetchAndValidateData(
  createTodoItemAPI,
  validateTodoCreate,
);

// todos #update
const updateTodoItemAPI = async (
  todo: Partial<z.infer<typeof Todo>>,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof Todo>> => {
  const url = `${baseURL}/todos/${todo.id}`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'updateTodoItemAPI' });
  }
};

export const updateTodoItem = createFetchAndValidateData(
  updateTodoItemAPI,
  validateTodo,
);

// todos #delete
const deleteTodoItemAPI = async (
  todoId: number,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof TodoDelete>> => {
  const url = `${baseURL}/todos/${todoId}`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'deleteTodoItemAPI' });
  }
};

export const deleteTodoItem = createFetchAndValidateData(
  deleteTodoItemAPI,
  validateTodoDelete,
);
