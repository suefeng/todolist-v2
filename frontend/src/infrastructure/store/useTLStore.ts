import { createContext, useContext } from 'react';
import { useStore as useZustandStore } from 'zustand';
import { shallow } from 'zustand/shallow';

import { RootStore, State } from 'infrastructure/store/rootStore';

export const StoreContext = createContext<RootStore | undefined>(undefined);

export function useTLStore<T>(
  selector: (state: State) => T,
  equals: typeof shallow = shallow,
) {
  const store = useContext(StoreContext);

  if (store === undefined) {
    throw new Error('no provider');
  }

  return useZustandStore(store, selector, equals);
}

export const dehydrate = (store: RootStore) => {
  return {
    state: JSON.parse(JSON.stringify(store.getState())),
  };
};
