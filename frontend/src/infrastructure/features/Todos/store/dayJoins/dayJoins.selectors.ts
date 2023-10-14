import { State } from 'infrastructure/store/rootStore';

export const selectDayJoins = (state: State) => state.dayJoins;
