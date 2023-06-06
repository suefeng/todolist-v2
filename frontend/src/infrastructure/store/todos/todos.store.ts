import { Todo } from 'domain/entities/Todo';
import { storeService } from 'infrastructure/services';
import { State } from 'infrastructure/store/rootStore';

export type TodosInitialState = {
  todos: {
    list: Todo[];
  };
  ssrHandlers: ((ssrState: State) => void)[];
};

export const todosInitialState: TodosInitialState = {
  todos: {
    list: [] as Todo[],
  },
  ssrHandlers: [ssrFirst],
};

function ssrFirst(ssrState: State) {
  storeService.setState((state) => {
    state.todos = ssrState.todos;
  });
}
