import { Todo, TodoCreate, TodoDelete } from 'domain/entities/Todo';
import { Fetcher, ResponseTL } from 'infrastructure/api/common';
import { handleError } from 'infrastructure/api/common/handleError';

/** @type {import('../../../../../../app/api/shell/todos/route').HandlerResponse}  */

export type TodosResponse = ResponseTL<Todo[]>;

export const fetchTodos = (fetcher: Fetcher) => async (): TodosResponse => {
  const url = `/api/shell/todos`;

  try {
    return await fetcher(url, { method: 'GET' });
  } catch (error) {
    return handleError({ error, origin: 'fetchTodos' });
  }
};

/** @type {import('../../../../../../app/api/shell/todos/[id]/route').HandlerResponse}  */

export type TodoItemResponse = ResponseTL<Todo>;

export const fetchTodoItem =
  (fetcher: Fetcher) =>
  async (todoId: number): TodoItemResponse => {
    const url = `/api/shell/todos/${todoId}/`;

    try {
      return await fetcher(url, { method: 'GET' });
    } catch (error) {
      return handleError({ error, origin: 'fetchTodoItem' });
    }
  };

/** @type {import('../../../../../../app/api/shell/todos/route').HandlerPOSTResponse}  */

export type CreateTodoItemResponse = ResponseTL<TodoCreate>;

export const createTodoItem =
  (fetcher: Fetcher) =>
  async (todo: Todo): CreateTodoItemResponse => {
    const url = `/api/shell/todos`;

    try {
      return await fetcher(url, { body: { ...todo }, method: 'POST' });
    } catch (error) {
      return handleError({ error, origin: 'createTodoItem' });
    }
  };

/** @type {import('../../../../../../app/api/shell/todos/[id]/route').HandlerPUTResponse}  */

export type UpdateTodoItemResponse = ResponseTL<Todo>;

export const updateTodoItem =
  (fetcher: Fetcher) =>
  async (todo: Todo): UpdateTodoItemResponse => {
    const url = `/api/shell/todos/${todo.id}`;

    try {
      return await fetcher(url, { body: { ...todo }, method: 'PUT' });
    } catch (error) {
      return handleError({ error, origin: 'updateTodoItem' });
    }
  };

/** @type {import('../../../../../../app/api/shell/todos/[id]/route').HandlerDELETEResponse}  */

export type DeleteTodoItemResponse = ResponseTL<TodoDelete>;

export const deleteTodoItem =
  (fetcher: Fetcher) =>
  async (todoId: number): DeleteTodoItemResponse => {
    const url = `/api/shell/todos/${todoId}`;

    try {
      return await fetcher(url, { body: { id: todoId }, method: 'DELETE' });
    } catch (error) {
      return handleError({ error, origin: 'deleteTodoItem' });
    }
  };
