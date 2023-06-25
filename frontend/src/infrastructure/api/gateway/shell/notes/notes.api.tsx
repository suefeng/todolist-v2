import { Note, NoteDelete } from 'domain/entities/Note';
import { Fetcher, ResponseTL } from 'infrastructure/api/common';
import { handleError } from 'infrastructure/api/common/handleError';

/** @type {import('../../../../../../app/api/shell/notes/route').HandlerResponse}  */

export type NotesResponse = ResponseTL<Note[]>;

export const fetchNotes =
  (fetcher: Fetcher) => async (): ResponseTL<Note[]> => {
    const url = `/api/shell/notes`;

    try {
      return await fetcher(url, { method: 'GET' });
    } catch (error) {
      return handleError({ error, origin: 'fetchNotes' });
    }
  };

/** @type {import('../../../../../../app/api/shell/notes/[id]/route').HandlerResponse}  */

export type NoteItemResponse = ResponseTL<Note>;

export const fetchNoteItem =
  (fetcher: Fetcher) =>
  async (todoId: number): NoteItemResponse => {
    const url = `/api/shell/notes/${todoId}/`;

    try {
      return await fetcher(url, { method: 'GET' });
    } catch (error) {
      return handleError({ error, origin: 'fetchNoteItem' });
    }
  };

/** @type {import('../../../../../../app/api/shell/notes/route').HandlerPOSTResponse}  */

export type CreateNoteItemResponse = ResponseTL<Note>;

export const createNoteItem =
  (fetcher: Fetcher) =>
  async (note: Note): CreateNoteItemResponse => {
    const url = `/api/shell/notes`;

    try {
      return await fetcher(url, { body: { ...note }, method: 'POST' });
    } catch (error) {
      return handleError({ error, origin: 'createNoteItem' });
    }
  };

/** @type {import('../../../../../../app/api/shell/notes/[id]/route').HandlerPUTResponse}  */

export type UpdateNoteItemResponse = ResponseTL<Note>;

export const updateNoteItem =
  (fetcher: Fetcher) =>
  async (note: Note): UpdateNoteItemResponse => {
    const url = `/api/shell/notes/${note.todo_id}`;

    try {
      return await fetcher(url, { body: { ...note }, method: 'PUT' });
    } catch (error) {
      return handleError({ error, origin: 'updateNoteItem' });
    }
  };

/** @type {import('../../../../../../app/api/shell/notes/[id]/route').HandlerDELETEResponse}  */

export type DeleteNoteItemResponse = ResponseTL<NoteDelete>;

export const deleteNoteItem =
  (fetcher: Fetcher) =>
  async (todoId: number): DeleteNoteItemResponse => {
    const url = `/api/shell/notes/${todoId}`;

    try {
      return await fetcher(url, { body: { id: todoId }, method: 'DELETE' });
    } catch (error) {
      return handleError({ error, origin: 'deleteNoteItem' });
    }
  };
