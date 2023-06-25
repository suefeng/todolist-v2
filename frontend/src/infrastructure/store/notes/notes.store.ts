import { Note } from 'domain/entities/Note';
import { storeService } from 'infrastructure/services';
import { State } from 'infrastructure/store/rootStore';

export type NotesInitialState = {
  notes: {
    list: Note[];
  };
  ssrHandlers: ((ssrState: State) => void)[];
};

export const notesInitialState: NotesInitialState = {
  notes: {
    list: [] as Note[],
  },
  ssrHandlers: [ssrFirst],
};

export type NoteItemInitialState = {
  noteItem: {
    list: Note;
  };
  ssrHandlers: ((ssrState: State) => void)[];
};

export const noteItemInitialState: NoteItemInitialState = {
  noteItem: {
    list: {} as Note,
  },
  ssrHandlers: [ssrFirst],
};

function ssrFirst(ssrState: State) {
  storeService.setState((state: State) => {
    state.noteItem = ssrState.noteItem;
    state.notes = ssrState.notes;
  });
}
