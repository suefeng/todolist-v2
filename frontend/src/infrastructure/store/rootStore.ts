import { omit } from 'lodash';
import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  TodosInitialState,
  todosInitialState,
} from 'infrastructure/store/todos/todos.store';

export const initializeStore = (preloadedState: State = {} as State) => {
  return createStore<State>()(
    immer(() => ({
      ...omit(todosInitialState, 'ssrHandlers'),
      ...preloadedState,
      ssrHandlers: [...todosInitialState.ssrHandlers],
    })),
  );
};

export type RootStore = ReturnType<typeof initializeStore>;

export type State = TodosInitialState;
