import { NextResponse } from 'next/server';
import { z } from 'zod';

import { CategoryJoin } from 'domain/server/CategoryJoin/categoryJoin';
import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import {
  createCategoryJoin,
  fetchCategoryJoins,
} from 'infrastructure/api/gateway/shell/categoryJoins/categoryJoins.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

// category_joins #index
export async function GET() {
  const options = {
    log: true,
    headers: {},
  } as PassedOptions;

  const categoryJoins = await remoteAPI.categoryJoins.fetchCategoryJoins(
    {},
    options,
  );

  if (hasErrorInResponse(categoryJoins)) {
    return NextResponse.json(
      {
        error: categoryJoins.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerResponse = {
    ...categoryJoins,
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<
  typeof fetchCategoryJoins
>;

// category_joins #create
export async function POST(request: Request) {
  const categoryJoinBody = (await request.json()) as Partial<
    z.infer<typeof CategoryJoin>
  >;

  const options = {
    body: categoryJoinBody,
    log: true,
    headers: {},
    method: 'POST',
  } as PassedOptions;

  try {
    const response = await remoteAPI.categoryJoins.createCategoryJoin(
      categoryJoinBody,
      options,
    );

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
  typeof createCategoryJoin
>;
