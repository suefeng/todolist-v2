import { AppRegistry } from 'infrastructure/services/appRegistry/AppRegistry';

export const initializeFrequencies =
  ({ store, API }: AppRegistry) =>
  async () => {
    const response = await API.frequencies.fetchFrequencies();

    if (response.error !== null) {
      // eslint-disable-next-line no-console
      console.log(response.error);
      // TODO: Show error screen?
      return;
    }

    store.setState((state) => {
      state.frequencies.list = response.data;
    });
  };
