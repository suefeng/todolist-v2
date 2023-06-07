import { AppRegistry } from 'infrastructure/services/appRegistry/AppRegistry';

export const initializeCategories =
  ({ store, API }: AppRegistry) =>
  async () => {
    const response = await API.categories.fetchCategories();

    if (response.error !== null) {
      // eslint-disable-next-line no-console
      console.log(response.error);
      // TODO: Show error screen?
      return;
    }

    store.setState((state) => {
      state.categories.list = response.data;
    });
  };
