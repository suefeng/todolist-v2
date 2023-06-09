import { NextResponse } from 'next/server';
import { z } from 'zod';

import { Todo } from 'domain/server/Todo/todo';
import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import {
  createTodoItem,
  fetchTodos,
} from 'infrastructure/api/gateway/shell/todos/todos.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

// todos #index
export async function GET() {
  const options = {
    log: true,
    headers: {},
    method: 'GET',
  } as PassedOptions;

  const todos = await remoteAPI.todos.fetchTodo({}, options);

  if (hasErrorInResponse(todos)) {
    return NextResponse.json(
      {
        error: todos.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerResponse = {
    ...todos,
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<typeof fetchTodos>;

// todos #create
export async function POST(request: Request) {
  const todoBody = (await request.json()) as Partial<z.infer<typeof Todo>>;

  const options = {
    body: todoBody,
    log: true,
    headers: {},
    method: 'POST',
  } as PassedOptions;

  try {
    const response = await remoteAPI.todos.createTodoItem(todoBody, options);

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

export type HandlerPOSTResponse = GetGatewayFetchReturnType<
  typeof createTodoItem
>;
