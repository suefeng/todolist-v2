import { omit } from 'lodash';
import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  CategoriesInitialState,
  categoriesInitialState,
} from 'infrastructure/store/categories/categories.store';
import {
  CategoryJoinsInitialState,
  categoryJoinsInitialState,
} from 'infrastructure/store/categoryJoins/categoryJoins.store';
import {
  DaysInitialState,
  daysInitialState,
} from 'infrastructure/store/days/days.store';
import {
  DayJoinsInitialState,
  dayJoinsInitialState,
} from 'infrastructure/store/dayJoins/dayJoins.store';
import {
  FrequenciesInitialState,
  frequenciesInitialState,
} from 'infrastructure/store/frequencies/frequencies.store';
import {
  FrequencyJoinsInitialState,
  frequencyJoinsInitialState,
} from 'infrastructure/store/frequencyJoins/frequencyJoins.store';
import {
  NoteItemInitialState,
  noteItemInitialState,
  NotesInitialState,
  notesInitialState,
} from 'infrastructure/store/notes/notes.store';
import {
  TodoItemInitialState,
  todoItemInitialState,
  TodosInitialState,
  todosInitialState,
} from 'infrastructure/store/todos/todos.store';

export const initializeStore = (preloadedState: State = {} as State) => {
  return createStore<State>()(
    immer(() => ({
      ...omit(categoriesInitialState, 'ssrHandlers'),
      ...omit(daysInitialState, 'ssrHandlers'),
      ...omit(dayJoinsInitialState, 'ssrHandlers'),
      ...omit(frequenciesInitialState, 'ssrHandlers'),
      ...omit(todosInitialState, 'ssrHandlers'),
      ...omit(todoItemInitialState, 'ssrHandlers'),
      ...omit(notesInitialState, 'ssrHandlers'),
      ...omit(noteItemInitialState, 'ssrHandlers'),
      ...omit(categoryJoinsInitialState, 'ssrHandlers'),
      ...omit(frequencyJoinsInitialState, 'ssrHandlers'),
      ...preloadedState,
      ssrHandlers: [
        ...categoriesInitialState.ssrHandlers,
        ...daysInitialState.ssrHandlers,
        ...dayJoinsInitialState.ssrHandlers,
        ...frequenciesInitialState.ssrHandlers,
        ...todosInitialState.ssrHandlers,
        ...todoItemInitialState.ssrHandlers,
        ...notesInitialState.ssrHandlers,
        ...noteItemInitialState.ssrHandlers,
        ...categoryJoinsInitialState.ssrHandlers,
        ...frequencyJoinsInitialState.ssrHandlers,
      ],
    })),
  );
};

export type RootStore = ReturnType<typeof initializeStore>;

export type State = CategoriesInitialState &
  DaysInitialState &
  DayJoinsInitialState &
  FrequenciesInitialState &
  TodosInitialState &
  TodoItemInitialState &
  CategoryJoinsInitialState &
  FrequencyJoinsInitialState &
  NotesInitialState &
  NoteItemInitialState;
