import { State } from 'infrastructure/store/rootStore';

export const selectFrequencyJoins = (state: State) => state.frequencyJoins;
