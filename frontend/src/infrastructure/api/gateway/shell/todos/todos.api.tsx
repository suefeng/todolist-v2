import { Category } from 'domain/entities/Category';
import { Day } from 'domain/entities/Day';
import { Frequency } from 'domain/entities/Frequency';
import { Note } from 'domain/entities/Note';
import { Todo } from 'domain/entities/Todo';
import { Fetcher, ResponseTL } from 'infrastructure/api/common';
import { handleError } from 'infrastructure/api/common/handleError';

/** @type {import('../../../../../../app/api/shell/todos/route').HandlerResponse}  */

export type TodosResponse = ResponseTL<Todo[]>;

export const fetchTodos =
  (fetcher: Fetcher) => async (): ResponseTL<Todo[]> => {
    const url = `/api/shell/todos`;

    try {
      return await fetcher(url);
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
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: 'fetchTodoItem' });
    }
  };

/** @type {import('../../../../../../app/api/shell/todos/route').HandlerResponse}  */

export const createTodoItem =
  (fetcher: Fetcher) =>
  async (
    description: string,
    categories?: Category[] | null,
    expiration?: string | null,
    frequencies?: Frequency[] | null,
    days?: Day[] | null,
    status?: string | null,
    note?: Note | null,
  ) => {
    const url = `/api/shell/todos`;

    try {
      return await fetcher(url, { body: {} });
    } catch (error) {
      return handleError({ error, origin: 'createTodoItem' });
    }
  };

/** @type {import('../../../../../../app/api/shell/todos/[id]/route').HandlerResponse}  */

export const updateTodoItem =
  (fetcher: Fetcher) =>
  async (
    todoId: number,
    description: string,
    categories?: Category[] | null,
    expiration?: string | null,
    frequencies?: Frequency[] | null,
    days?: Day[] | null,
    status?: string | null,
    note?: Note | null,
  ) => {
    const url = `/api/shell/todos/${todoId}`;

    try {
      return await fetcher(url, { body: {} });
    } catch (error) {
      return handleError({ error, origin: 'updateTodoItem' });
    }
  };
