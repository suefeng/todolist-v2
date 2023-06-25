import { Todo } from 'domain/entities/Todo';

export type TodosInitialState = {
  todos: Todo[];
};

export type TodoItemInitialState = {
  todo: Todo;
};
