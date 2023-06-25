import { AppRegistry } from 'infrastructure/services/appRegistry/AppRegistry';

export const initializeFrequencyJoins =
  ({ store, API }: AppRegistry) =>
  async () => {
    const response = await API.frequencyJoins.fetchFrequencyJoins();

    if (response.error !== null) {
      // eslint-disable-next-line no-console
      console.log(response.error);
      // TODO: Show error screen?
      return;
    }

    store.setState((state) => {
      state.frequencyJoins.list = response.data;
    });
  };
