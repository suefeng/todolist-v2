import { NextResponse } from 'next/server';

import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import { fetchCategories } from 'infrastructure/api/gateway/shell/categories/categories.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

export async function GET() {
  const options = {
    log: true,
    headers: {},
  } as PassedOptions;

  const categories = await remoteAPI.categories.fetchCategory({}, options);

  if (hasErrorInResponse(categories)) {
    return NextResponse.json(
      {
        error: categories.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerResponse = {
    data: {
      ...categories.data,
    },
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<typeof fetchCategories>;
