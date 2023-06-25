import { NextResponse } from 'next/server';
import { z } from 'zod';

import { FrequencyJoin } from 'domain/server/FrequencyJoin/fequencyJoin';
import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import {
  createFrequencyJoin,
  fetchFrequencyJoins,
} from 'infrastructure/api/gateway/shell/frequencyJoins/frequencyJoins.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

// frequency_joins #index
export async function GET() {
  const options = {
    log: true,
    headers: {},
  } as PassedOptions;

  const frequencyJoins = await remoteAPI.frequencyJoins.fetchFrequencyJoins(
    {},
    options,
  );

  if (hasErrorInResponse(frequencyJoins)) {
    return NextResponse.json(
      {
        error: frequencyJoins.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerResponse = {
    ...frequencyJoins,
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<
  typeof fetchFrequencyJoins
>;

// frequency_joins #create
export async function POST(request: Request) {
  const frequencyJoinBody = (await request.json()) as Partial<
    z.infer<typeof FrequencyJoin>
  >;

  const options = {
    body: frequencyJoinBody,
    log: true,
    headers: {},
    method: 'POST',
  } as PassedOptions;

  try {
    const response = await remoteAPI.frequencyJoins.createFrequencyJoin(
      frequencyJoinBody,
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
  typeof createFrequencyJoin
>;
