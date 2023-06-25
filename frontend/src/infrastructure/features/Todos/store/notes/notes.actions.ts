import { AppRegistry } from 'infrastructure/services/appRegistry/AppRegistry';

export const initializeNotes =
  ({ store, API }: AppRegistry) =>
  async () => {
    const response = await API.notes.fetchNotes();

    if (response.error !== null) {
      // eslint-disable-next-line no-console
      console.log(response.error);
      // TODO: Show error screen?
      return;
    }

    store.setState((state) => {
      state.notes.list = response.data;
    });
  };

export const initializeNoteItem =
  ({ store, API }: AppRegistry) =>
  async (todoId: number) => {
    const response = await API.notes.fetchNoteItem(todoId);

    if (response.error !== null) {
      // eslint-disable-next-line no-console
      console.log(response.error);
      // TODO: Show error screen?
      return;
    }

    store.setState((state) => {
      state.noteItem.list = response.data;
    });
  };
