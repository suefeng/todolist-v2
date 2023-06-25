import { AppRegistry } from 'infrastructure/services/appRegistry/AppRegistry';

export const initializeTodos =
  ({ store, API }: AppRegistry) =>
  async () => {
    const response = await API.todos.fetchTodos();

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

export const initializeTodoItem =
  ({ store, API }: AppRegistry) =>
  async (todoId: number) => {
    const response = await API.todos.fetchTodoItem(todoId);

    if (response.error !== null) {
      // eslint-disable-next-line no-console
      console.log(response.error);
      // TODO: Show error screen?
      return;
    }

    store.setState((state) => {
      state.todoItem.list = response.data;
    });
  };
