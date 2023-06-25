import { Day } from 'domain/entities/Day';
import { storeService } from 'infrastructure/services';
import { State } from 'infrastructure/store/rootStore';

export type DaysInitialState = {
  days: {
    list: Day[];
  };
  ssrHandlers: ((ssrState: State) => void)[];
};

export const daysInitialState: DaysInitialState = {
  days: {
    list: [] as Day[],
  },
  ssrHandlers: [ssrFirst],
};

function ssrFirst(ssrState: State) {
  storeService.setState((state: State) => {
    state.days = ssrState.days;
  });
}
