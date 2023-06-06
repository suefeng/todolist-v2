import React, { useRef } from 'react';

import { storeService } from 'infrastructure/services';
import {
  isClient,
  isServer,
} from 'infrastructure/services/server/server.service';
import { initializeStore, RootStore, State } from './rootStore';
import { StoreContext } from './useTLStore';

type StoreProviderProps = {
  children: React.ReactNode;
  store: {
    state: State;
  };
};

export const StoreProvider = ({
  children,
  store: { state } = {
    state: {} as State,
  },
}: StoreProviderProps) => {
  const storeRef = useRef<RootStore>();

  initializeClientState(state, storeRef);

  if (isClient) {
    Object.values(storeService.getStore().getState().ssrHandlers).forEach(
      (action) => {
        action(state);
      },
    );
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

const initializeClientState = (
  newState: State,
  storeRef: React.MutableRefObject<RootStore | undefined>,
) => {
  if (isServer) {
    storeRef.current = storeService.getStore(newState);

    return;
  }

  /*
   * This is Client State initialization it's called only once
   * And we keep link to the store for entire browser session
   * */
  if (!storeService.getStore()) {
    const newStore = initializeStore(newState);
    storeService.setStore(newStore);
    storeRef.current = storeService.getStore();
  }
};
