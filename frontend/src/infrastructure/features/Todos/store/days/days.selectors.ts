import { State } from 'infrastructure/store/rootStore';

export const selectDays = (state: State) => state.days;
