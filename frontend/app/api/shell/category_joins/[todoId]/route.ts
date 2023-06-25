import { NextResponse } from 'next/server';
import { z } from 'zod';

import { CategoryJoin } from 'domain/server/CategoryJoin/categoryJoin';
import { PassedOptions } from 'infrastructure/api/common';
import { updateCategoryJoin } from 'infrastructure/api/gateway/shell/categoryJoins/categoryJoins.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

// categoryJoin #update
export async function PUT(request: Request) {
  const categoryJoinBody = (await request.json()) as Partial<
    z.infer<typeof CategoryJoin>
  >;

  const options = {
    body: categoryJoinBody,
    log: true,
    headers: {},
    method: 'PUT',
  } as PassedOptions;

  try {
    const response = await remoteAPI.categoryJoins.updateCategoryJoin(
      categoryJoinBody,
      options,
    );

    return NextResponse.json(
      { data: response, error: null },
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
  typeof updateCategoryJoin
>;
