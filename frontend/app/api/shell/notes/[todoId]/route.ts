import { NextResponse } from 'next/server';
import { z } from 'zod';

import { Note } from 'domain/server/Note/note';
import { PassedOptions } from 'infrastructure/api/common';
import { hasErrorInResponse } from 'infrastructure/api/common/hasResponseError';
import {
  deleteNoteItem,
  fetchNoteItem,
  updateNoteItem,
} from 'infrastructure/api/gateway/shell/notes/notes.api';
import { remoteAPI } from 'infrastructure/api/remotes/remoteAPI';
import { GetGatewayFetchReturnType } from 'infrastructure/utility-types/utility-types';

// note #show
export async function GET(
  request: Request,
  { params: { noteId } }: { params: { noteId: string } },
) {
  const options = {
    log: true,
    headers: {},
    method: 'GET',
  } as PassedOptions;

  const note = await remoteAPI.notes.fetchNoteItem(noteId, options);

  if (hasErrorInResponse(note)) {
    return NextResponse.json(
      {
        error: note.error,
      },
      { status: 400 },
    );
  }

  const response: HandlerResponse = {
    ...note,
    error: null,
  };

  return NextResponse.json(response, { status: 200 });
}

export type HandlerResponse = GetGatewayFetchReturnType<typeof fetchNoteItem>;

// note #update
export async function PUT(request: Request) {
  const noteBody = (await request.json()) as Partial<z.infer<typeof Note>>;

  const options = {
    body: noteBody,
    log: true,
    headers: {},
    method: 'PUT',
  } as PassedOptions;

  try {
    const response = await remoteAPI.notes.updateNoteItem(noteBody, options);

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

export type HandlerPUTResponse = GetGatewayFetchReturnType<
  typeof updateNoteItem
>;

// note #delete
export async function DELETE(
  request: Request,
  {
    params: { noteId },
  }: {
    params: { noteId: number };
  },
) {
  const options = {
    body: { id: noteId },
    headers: {},
    log: true,
    method: 'DELETE',
  } as PassedOptions;

  try {
    const response = await remoteAPI.notes.deleteNoteItem(noteId, options);

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

export type HandlerDELETEResponse = GetGatewayFetchReturnType<
  typeof deleteNoteItem
>;
