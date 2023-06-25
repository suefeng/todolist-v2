import { GetServerSidePropsContext } from 'next';

import { apiFactory } from 'infrastructure/api';
import { NotesComponent } from 'infrastructure/features/Notes/NotesComponent';
import { initializeNotes } from 'infrastructure/features/Todos/store';
import { storeService } from 'infrastructure/services';
import { dehydrate } from 'infrastructure/store/useTLStore';

export default NotesComponent;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const store = storeService.getStore();
  const API = apiFactory.initialize(ctx);

  await initializeNotes({ store, API })();

  const props = {
    store: dehydrate(store),
  };

  return { props };
};
