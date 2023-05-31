import { TodoList } from "domain/entities/TodoList";
import { Category } from "domain/entities/Category";
import { Fetcher, ResponseTL } from "infrastructure/api/common";
import { handleError } from "infrastructure/api/common/handleError";

/** @type {import('../../../../../../app/api/shell/todolist/route').HandlerResponse}  */

export type TodoListResponse = ResponseTL<{
  todos: TodoList[];
}>;

export const fetchTodolist =
  (fetcher: Fetcher) => async (): TodoListResponse => {
    const url = `/api/shell/todolist`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: "fetchTodolist" });
    }
  };

/** @type {import('../../../../../../app/api/shell/todolist/[todoId]/route').HandlerResponse}  */

export type TodoListItemResponse = ResponseTL<{
  todo: TodoList;
}>;

export const fetchTodoListItemResponse =
  (fetcher: Fetcher) =>
  async (todoId: string): TodoListItemResponse => {
    const url = `/api/shell/todolist/${todoId}/`;

    try {
      return await fetcher(url);
    } catch (error) {
      return handleError({ error, origin: "fetchTodoListItemResponse" });
    }
  };

/** @type {import('../../../../../../app/api/shell/todolist/[todoId]/route').HandlerResponse}  */

export const createTodoListItem =
  (fetcher: Fetcher) =>
  async (
    categories?: Category[],
    description?: string,
    expiration?: string,
    frequency?: string,
    day?: string,
    status?: string
  ) => {
    const url = `/api/shell/todolist`;

    try {
      return await fetcher(url, { body: {} });
    } catch (error) {
      return handleError({ error, origin: "createTodoListItem" });
    }
  };
