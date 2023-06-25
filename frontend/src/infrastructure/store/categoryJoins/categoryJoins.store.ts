import { CategoryJoin } from 'domain/entities/CategoryJoin';
import { storeService } from 'infrastructure/services';
import { State } from 'infrastructure/store/rootStore';

export type CategoryJoinsInitialState = {
  categoryJoins: {
    list: CategoryJoin[];
  };
  ssrHandlers: ((ssrState: State) => void)[];
};

export const categoryJoinsInitialState: CategoryJoinsInitialState = {
  categoryJoins: {
    list: [] as CategoryJoin[],
  },
  ssrHandlers: [ssrFirst],
};

function ssrFirst(ssrState: State) {
  storeService.setState((state: State) => {
    state.categoryJoins = ssrState.categoryJoins;
  });
}
