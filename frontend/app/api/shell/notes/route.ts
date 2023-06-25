import { NextResponse } from 'next/server';
import { z } from 'zod';

import { Note } from 'domain/server/Note/note';
import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import {
  createNoteItem,
  fetchNotes,
} from 'infrastructure/api/gateway/shell/notes/notes.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

// notes #index
export async function GET() {
  const options = {
    log: true,
    headers: {},
    method: 'GET',
  } as PassedOptions;

  const notes = await remoteAPI.notes.fetchNote({}, options);

  if (hasErrorInResponse(notes)) {
    return NextResponse.json(
      {
        error: notes.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerResponse = {
    ...notes,
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<typeof fetchNotes>;

// notes #create
export async function POST(request: Request) {
  const noteBody = (await request.json()) as Partial<z.infer<typeof Note>>;

  const options = {
    body: noteBody,
    log: true,
    headers: {},
    method: 'POST',
  } as PassedOptions;

  try {
    const response = await remoteAPI.notes.createNoteItem(noteBody, options);

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
  typeof createNoteItem
>;
