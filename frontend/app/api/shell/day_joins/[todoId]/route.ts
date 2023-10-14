import { NextResponse } from 'next/server';
import { z } from 'zod';

import { DayJoin } from 'domain/server/DayJoin/dayJoin';
import { PassedOptions } from 'infrastructure/api/common';
import { updateDayJoin } from 'infrastructure/api/gateway/shell/dayJoins/dayJoins.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

// dayJoin #update
export async function PUT(request: Request) {
  const dayJoinBody = (await request.json()) as Partial<
    z.infer<typeof DayJoin>
  >;

  const options = {
    body: dayJoinBody,
    log: true,
    headers: {},
    method: 'PUT',
  } as PassedOptions;

  try {
    const response = await remoteAPI.dayJoins.updateDayJoin(
      dayJoinBody,
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
  typeof updateDayJoin
>;
