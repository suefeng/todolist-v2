import { AppRegistry } from 'infrastructure/services/appRegistry/AppRegistry';

export const initializeDays =
  ({ store, API }: AppRegistry) =>
  async () => {
    const response = await API.days.fetchDays();

    if (response.error !== null) {
      // eslint-disable-next-line no-console
      console.log(response.error);
      // TODO: Show error screen?
      return;
    }

    store.setState((state) => {
      state.days.list = response.data;
    });
  };
