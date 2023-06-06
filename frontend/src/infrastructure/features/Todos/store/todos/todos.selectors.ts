import { State } from 'infrastructure/store/rootStore';

export const selectTodos = (state: State) => state.todos;
