import { Note } from 'domain/entities/Note';

export type NotesInitialState = {
  notes: Note[];
};

export type NoteItemInitialState = {
  note: Note;
};
