import { DayJoin } from 'domain/entities/DayJoin';
import { storeService } from 'infrastructure/services';
import { State } from 'infrastructure/store/rootStore';

export type DayJoinsInitialState = {
  dayJoins: {
    list: DayJoin[];
  };
  ssrHandlers: ((ssrState: State) => void)[];
};

export const dayJoinsInitialState: DayJoinsInitialState = {
  dayJoins: {
    list: [] as DayJoin[],
  },
  ssrHandlers: [ssrFirst],
};

function ssrFirst(ssrState: State) {
  storeService.setState((state: State) => {
    state.dayJoins = ssrState.dayJoins;
  });
}
