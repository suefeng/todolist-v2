import { omit } from 'lodash';
import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  CategoriesInitialState,
  categoriesInitialState,
} from 'infrastructure/store/categories/categories.store';
import {
  DaysInitialState,
  daysInitialState,
} from 'infrastructure/store/days/days.store';
import {
  FrequenciesInitialState,
  frequenciesInitialState,
} from 'infrastructure/store/frequencies/frequencies.store';
import {
  TodosInitialState,
  todosInitialState,
} from 'infrastructure/store/todos/todos.store';

export const initializeStore = (preloadedState: State = {} as State) => {
  return createStore<State>()(
    immer(() => ({
      ...omit(categoriesInitialState, 'ssrHandlers'),
      ...omit(daysInitialState, 'ssrHandlers'),
      ...omit(frequenciesInitialState, 'ssrHandlers'),
      ...omit(todosInitialState, 'ssrHandlers'),
      ...preloadedState,
      ssrHandlers: [
        ...categoriesInitialState.ssrHandlers,
        ...daysInitialState.ssrHandlers,
        ...frequenciesInitialState.ssrHandlers,
        ...todosInitialState.ssrHandlers,
      ],
    })),
  );
};

export type RootStore = ReturnType<typeof initializeStore>;

export type State = CategoriesInitialState &
  DaysInitialState &
  FrequenciesInitialState &
  TodosInitialState;
