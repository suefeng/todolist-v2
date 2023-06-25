import { State } from 'infrastructure/store/rootStore';

export const selectTodos = (state: State) => state.todos;
export const selectTodoItem = (state: State) => state.todoItem;
