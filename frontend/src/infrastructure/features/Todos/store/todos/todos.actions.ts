import { AppRegistry } from 'infrastructure/services/appRegistry/AppRegistry';

export const initializeTodos =
  ({ store, API }: AppRegistry) =>
  async () => {
    const response = await API.todoList.fetchTodos();

    if (response.error !== null) {
      // eslint-disable-next-line no-console
      console.log(response.error);
      // TODO: Show error screen?
      return;
    }

    store.setState((state) => {
      state.todos.list = response.data;
    });
  };
