import { NextResponse } from 'next/server';

import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import { fetchTodos } from 'infrastructure/api/gateway/shell/todos/todos.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

export async function GET() {
  const options = {
    log: true,
    headers: {},
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
    data: {
      ...todos.data,
    },
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<typeof fetchTodos>;
