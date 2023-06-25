import { z } from 'zod';

import { ResponseSuccess } from 'infrastructure/api/common';
import { generateTLMock } from 'infrastructure/services/http/httpMockGenerator';

export const Note = z.object({
  todo_id: z.number(),
  message: z.string(),
});

export const validateNote = <T>(value: ResponseSuccess<T>) => {
  return Note.safeParse(value);
};

validateNote.mock = generateTLMock(Note);

export const NoteIndex = z.array(Note);

export const validateNoteIndex = <T>(value: ResponseSuccess<T>) => {
  return NoteIndex.safeParse(value);
};

validateNoteIndex.mock = generateTLMock(NoteIndex);

export const NoteDelete = z.object({
  todo_id: z.number(),
});

export const validateNoteDelete = <T>(value: ResponseSuccess<T>) => {
  return NoteDelete.safeParse(value);
};

validateNoteDelete.mock = generateTLMock(NoteDelete);

export const NoteForm = Note;
