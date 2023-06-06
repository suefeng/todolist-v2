import { NextResponse } from 'next/server';

import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import {
  createTodoItem,
  fetchTodoItem,
  updateTodoItem,
} from 'infrastructure/api/gateway/shell/todos/todos.api';
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
    ...todoItem,
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<typeof fetchTodoItem>;

export async function POST() {
  const options = {
    log: true,
    headers: {},
    method: 'POST',
  } as PassedOptions;

  const todos = await remoteAPI.todos.createTodoItem({}, options);

  if (hasErrorInResponse(todos)) {
    return NextResponse.json(
      {
        error: todos.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerPOSTResponse = {
    ...todos,
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerPOSTResponse = GetGatewayFetchReturnType<
  typeof createTodoItem
>;

export async function PUT(
  request: Request,
  {
    params: { todoId },
  }: {
    params: { todoId: number };
  },
) {
  const options = {
    log: true,
    headers: {},
    method: 'PUT',
  } as PassedOptions;

  const todos = await remoteAPI.todos.updateTodoItem({ todoId }, options);

  if (hasErrorInResponse(todos)) {
    return NextResponse.json(
      {
        error: todos.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerPUTResponse = {
    ...todos,
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerPUTResponse = GetGatewayFetchReturnType<
  typeof updateTodoItem
>;
