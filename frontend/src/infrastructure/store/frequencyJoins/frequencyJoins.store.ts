import { FrequencyJoin } from 'domain/entities/FrequencyJoin';
import { storeService } from 'infrastructure/services';
import { State } from 'infrastructure/store/rootStore';

export type FrequencyJoinsInitialState = {
  frequencyJoins: {
    list: FrequencyJoin[];
  };
  ssrHandlers: ((ssrState: State) => void)[];
};

export const frequencyJoinsInitialState: FrequencyJoinsInitialState = {
  frequencyJoins: {
    list: [] as FrequencyJoin[],
  },
  ssrHandlers: [ssrFirst],
};

function ssrFirst(ssrState: State) {
  storeService.setState((state: State) => {
    state.frequencyJoins = ssrState.frequencyJoins;
  });
}
