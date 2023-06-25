import { AppRegistry } from 'infrastructure/services/appRegistry/AppRegistry';

export const initializeCategoryJoins =
  ({ store, API }: AppRegistry) =>
  async () => {
    const response = await API.categoryJoins.fetchCategoryJoins();

    if (response.error !== null) {
      // eslint-disable-next-line no-console
      console.log(response.error);
      // TODO: Show error screen?
      return;
    }

    store.setState((state) => {
      state.categoryJoins.list = response.data;
    });
  };
