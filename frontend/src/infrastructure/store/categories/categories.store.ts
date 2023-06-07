import { Category } from 'domain/entities/Category';
import { storeService } from 'infrastructure/services';
import { State } from 'infrastructure/store/rootStore';

export type CategoriesInitialState = {
  categories: {
    list: Category[];
  };
  ssrHandlers: ((ssrState: State) => void)[];
};

export const categoriesInitialState: CategoriesInitialState = {
  categories: {
    list: [] as Category[],
  },
  ssrHandlers: [ssrFirst],
};

function ssrFirst(ssrState: State) {
  storeService.setState((state) => {
    state.categories = ssrState.categories;
  });
}
