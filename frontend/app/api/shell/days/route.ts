import { NextResponse } from 'next/server';

import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import { fetchDays } from 'infrastructure/api/gateway/shell/days/days.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

export async function GET() {
  const options = {
    log: true,
    headers: {},
  } as PassedOptions;

  const days = await remoteAPI.days.fetchDay({}, options);

  if (hasErrorInResponse(days)) {
    return NextResponse.json(
      {
        error: days.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerResponse = {
    ...days,
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<typeof fetchDays>;
