import { z } from 'zod';

import { ResponseSuccess } from 'infrastructure/api/common';
import { generateTLMock } from 'infrastructure/services/http/httpMockGenerator';

export const Note = z.object({
  note: z.string(),
});

export const validateNote = <T,>(value: ResponseSuccess<T>) => {
  return Note.safeParse(value);
};

validateNote.mock = generateTLMock(Note);
