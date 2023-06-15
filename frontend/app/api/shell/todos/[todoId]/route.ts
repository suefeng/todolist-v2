import { NextResponse } from 'next/server';

import { Category } from 'domain/entities/Category';
import { Day } from 'domain/entities/Day';
import { Frequency } from 'domain/entities/Frequency';
import { Note } from 'domain/entities/Note';
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

export async function POST(
  request: Request,
  {
    params: {
      description,
      categories,
      expiration,
      frequencies,
      days,
      status,
      note,
    },
  }: {
    params: {
      description: string;
      categories?: Category[] | null;
      expiration?: string | null;
      frequencies?: Frequency[] | null;
      days?: Day[] | null;
      status?: string | null;
      note?: Note | null;
    };
  },
) {
  const res = await request.json();

  const options = {
    log: true,
    headers: {},
    method: 'POST',
    body: { ...res },
    params: res.params,
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

  const todos = await remoteAPI.todos.updateTodoItem(todoId, options);

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
