import { State } from 'infrastructure/store/rootStore';

export const selectNotes = (state: State) => state.notes;
export const selectNoteItem = (state: State) => state.noteItem;
