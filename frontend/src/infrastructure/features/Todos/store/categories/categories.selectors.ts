import { State } from 'infrastructure/store/rootStore';

export const selectCategories = (state: State) => state.categories;
