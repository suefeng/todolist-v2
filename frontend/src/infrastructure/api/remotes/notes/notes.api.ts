import { z } from 'zod';

import {
  Note,
  NoteDelete,
  NoteIndex,
  validateNote,
  validateNoteDelete,
  validateNoteIndex,
} from 'domain/server/Note/note';
import { createFetchAndValidateData } from 'infrastructure/api/common/createFetchWithValidation';
import { fetcher, PassedOptions } from 'infrastructure/api/common/fetcher';
import { handleError } from 'infrastructure/api/common/handleError';
import { ResponseTL } from 'infrastructure/api/common/ResponseTL';

const baseURL = `/api/v1`;

// notes #index
const fetchNoteAPI = async (
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof NoteIndex>> => {
  const url = `${baseURL}/notes`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'fetchNoteAPI' });
  }
};

export const fetchNote = createFetchAndValidateData(
  fetchNoteAPI,
  validateNoteIndex,
);

// notes #show
const fetchNoteItemAPI = async (
  todoId: string,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof Note>> => {
  const url = `${baseURL}/notes/${todoId}`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'fetchNoteItemAPI' });
  }
};

export const fetchNoteItem = createFetchAndValidateData(
  fetchNoteItemAPI,
  validateNote,
);

// notes #create
const createNoteItemAPI = async (
  note: Partial<z.infer<typeof Note>>,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof Note>> => {
  const url = `${baseURL}/notes`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'createNoteItemAPI' });
  }
};

export const createNoteItem = createFetchAndValidateData(
  createNoteItemAPI,
  validateNote,
);

// notes #update
const updateNoteItemAPI = async (
  note: Partial<z.infer<typeof Note>>,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof Note>> => {
  const url = `${baseURL}/notes/${note.todo_id}`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'updateNoteItemAPI' });
  }
};

export const updateNoteItem = createFetchAndValidateData(
  updateNoteItemAPI,
  validateNote,
);

// notes #delete
const deleteNoteItemAPI = async (
  todoId: number,
  passedOptions?: PassedOptions,
): ResponseTL<z.infer<typeof NoteDelete>> => {
  const url = `${baseURL}/notes/${todoId}`;

  const options = {
    ...passedOptions,
  } as PassedOptions;

  try {
    return await fetcher(url, options);
  } catch (error) {
    return handleError({ error, origin: 'deleteNoteItemAPI' });
  }
};

export const deleteNoteItem = createFetchAndValidateData(
  deleteNoteItemAPI,
  validateNoteDelete,
);
