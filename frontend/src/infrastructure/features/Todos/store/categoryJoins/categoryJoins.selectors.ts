import { State } from 'infrastructure/store/rootStore';

export const selectCategoryJoins = (state: State) => state.categoryJoins;
