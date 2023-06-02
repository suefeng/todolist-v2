import { Category } from 'domain/entities/Category';
import { Day } from 'domain/entities/Day';
import { Frequency } from 'domain/entities/Frequency';
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

/** @type {import('../../../../../../app/api/shell/todos/[todoId]/route').HandlerResponse}  */

export type TodoItemResponse = ResponseTL<Todo>;

export const fetchTodoItem =
  (fetcher: Fetcher) =>
  async (todoId: string): TodoItemResponse => {
    const url = `/api/shell/todos/${todoId}/`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: 'fetchTodoItem' });
    }
  };

/** @type {import('../../../../../../app/api/shell/todos/[todoId]/route').HandlerResponse}  */

export const createTodoItem =
  (fetcher: Fetcher) =>
  async (
    categories?: Category[],
    description?: string,
    expiration?: string,
    frequency?: Frequency[],
    day?: Day[],
    status?: string,
  ) => {
    const url = `/api/shell/todos`;

    try {
      return await fetcher(url, { body: {} });
    } catch (error) {
      return handleError({ error, origin: 'createTodoItem' });
    }
  };
