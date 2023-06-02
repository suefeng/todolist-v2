import { NextResponse } from 'next/server';

import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import { fetchFrequencies } from 'infrastructure/api/gateway/shell/frequencies/frequencies.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

export async function GET() {
  const options = {
    log: true,
    headers: {},
  } as PassedOptions;

  const frequencies = await remoteAPI.frequencies.fetchFrequency({}, options);

  if (hasErrorInResponse(frequencies)) {
    return NextResponse.json(
      {
        error: frequencies.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerResponse = {
    data: {
      ...frequencies.data,
    },
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<
  typeof fetchFrequencies
>;
