import { AppRegistry } from 'infrastructure/services/appRegistry/AppRegistry';

export const initializeDayJoins =
  ({ store, API }: AppRegistry) =>
  async () => {
    const response = await API.dayJoins.fetchDayJoins();

    if (response.error !== null) {
      // eslint-disable-next-line no-console
      console.log(response.error);
      // TODO: Show error screen?
      return;
    }

    store.setState((state) => {
      state.dayJoins.list = response.data;
    });
  };
