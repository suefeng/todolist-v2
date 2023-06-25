import { Frequency } from 'domain/entities/Frequency';
import { storeService } from 'infrastructure/services';
import { State } from 'infrastructure/store/rootStore';

export type FrequenciesInitialState = {
  frequencies: {
    list: Frequency[];
  };
  ssrHandlers: ((ssrState: State) => void)[];
};

export const frequenciesInitialState: FrequenciesInitialState = {
  frequencies: {
    list: [] as Frequency[],
  },
  ssrHandlers: [ssrFirst],
};

function ssrFirst(ssrState: State) {
  storeService.setState((state: State) => {
    state.frequencies = ssrState.frequencies;
  });
}
