import { GetServerSidePropsContext } from 'next';

import { apiFactory } from 'infrastructure/api';
import {
  initializeCategories,
  initializeDays,
  initializeFrequencies,
  initializeTodos,
} from 'infrastructure/features/Todos/store';
import { TodoListComponent } from 'infrastructure/features/Todos/TodoListComponent';
import { storeService } from 'infrastructure/services';
import { dehydrate } from 'infrastructure/store/useTLStore';

export default TodoListComponent;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const store = storeService.getStore();
  const API = apiFactory.initialize(ctx);

  await initializeTodos({ store, API })();
  await initializeCategories({ store, API })();
  await initializeFrequencies({ store, API })();
  await initializeDays({ store, API })();

  const props = {
    store: dehydrate(store),
  };

  return { props };
};
