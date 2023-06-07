import { State } from 'infrastructure/store/rootStore';

export const selectFrequencies = (state: State) => state.frequencies;
