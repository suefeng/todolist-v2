import {
  isClient,
  isServer,
} from 'infrastructure/services/server/server.service';
import {
  initializeStore,
  RootStore,
  State,
} from 'infrastructure/store/rootStore';

const createStoreService = () => {
  let store: RootStore;
  const setStore = (passedStore: RootStore) => {
    store = passedStore;
  };
  const getStore = (rootState?: State) => {
    if (isServer) {
      return initializeStore(rootState);
    }

    return store;
  };

  const setState = (state: Parameters<typeof store.setState>[0]) => {
    return store.setState(state);
  };

  const getState = () => {
    return store.getState();
  };

  return { setStore, getStore, setState, getState };
};

export const storeService = createStoreService();
export type StoreService = ReturnType<typeof createStoreService>;

if (isClient && process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-underscore-dangle
  window.__storeService = storeService;
}
