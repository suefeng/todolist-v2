import { NextResponse } from 'next/server';
import { z } from 'zod';

import { FrequencyJoin } from 'domain/server/FrequencyJoin/FrequencyJoin';
import { PassedOptions } from 'infrastructure/api/common';
import { updateFrequencyJoin } from 'infrastructure/api/gateway/shell/frequencyJoins/frequencyJoins.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

// frequencyJoin #update
export async function PUT(request: Request) {
  const frequencyJoinBody = (await request.json()) as Partial<
    z.infer<typeof FrequencyJoin>
  >;

  const options = {
    body: frequencyJoinBody,
    log: true,
    headers: {},
    method: 'PUT',
  } as PassedOptions;

  try {
    const response = await remoteAPI.frequencyJoins.updateFrequencyJoin(
      frequencyJoinBody,
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
  typeof updateFrequencyJoin
>;
