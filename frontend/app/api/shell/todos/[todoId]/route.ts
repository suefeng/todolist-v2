import { NextResponse } from 'next/server';
import { z } from 'zod';

import { Todo } from 'domain/server/Todo/todo';
import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import {
  deleteTodoItem,
  fetchTodoItem,
  updateTodoItem,
} from 'infrastructure/api/gateway/shell/todos/todos.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

// todo #show
export async function GET(
  request: Request,
  { params: { todoId } }: { params: { todoId: string } },
) {
  const options = {
    log: true,
    headers: {},
    method: 'GET',
  } as PassedOptions;

  const todo = await remoteAPI.todos.fetchTodoItem(todoId, options);

  if (hasErrorInResponse(todo)) {
    return NextResponse.json(
      {
        error: todo.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerResponse = {
    ...todo,
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<typeof fetchTodoItem>;

// todo #update
export async function PUT(request: Request) {
  const todoBody = (await request.json()) as Partial<z.infer<typeof Todo>>;

  const options = {
    body: todoBody,
    log: true,
    headers: {},
    method: 'PUT',
  } as PassedOptions;

  try {
    const response = await remoteAPI.todos.updateTodoItem(todoBody, options);

    return NextResponse.json(
      { data: response.data, error: null },
      {
        status: 200,
      },
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return NextResponse.json({ data: null, error: e }, { status: 400 });
  }
}

export type HandlerPUTResponse = GetGatewayFetchReturnType<
  typeof updateTodoItem
>;

// todo #delete
export async function DELETE(
  request: Request,
  {
    params: { todoId },
  }: {
    params: { todoId: number };
  },
) {
  const options = {
    body: { id: todoId },
    headers: {},
    log: true,
    method: 'DELETE',
  } as PassedOptions;

  try {
    const response = await remoteAPI.todos.deleteTodoItem(todoId, options);

    return NextResponse.json(
      { data: response.data, error: null },
      {
        status: 200,
      },
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return NextResponse.json({ data: null, error: e }, { status: 400 });
  }
}

export type HandlerDELETEResponse = GetGatewayFetchReturnType<
  typeof deleteTodoItem
>;
