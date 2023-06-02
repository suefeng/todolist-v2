import { NextResponse } from 'next/server';

import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import { fetchTodoItem } from 'infrastructure/api/gateway/shell/todos/todos.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

export async function GET(
  request: Request,
  { params: { todoId } }: { params: { todoId: string } },
) {
  const options = {
    log: true,
    headers: {},
  } as PassedOptions;

  const todoItem = await remoteAPI.todos.fetchTodoItem(todoId, options);

  if (hasErrorInResponse(todoItem)) {
    return NextResponse.json(
      {
        error: todoItem.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerResponse = {
    data: {
      ...todoItem.data,
    },
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<typeof fetchTodoItem>;
