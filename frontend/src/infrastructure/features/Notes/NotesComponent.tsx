import React from 'react';

import { useTLStore } from 'infrastructure/store/useTLStore';
import Layout, { Heading } from 'application/components/Layout';
import { NoteList } from './NoteList';

export const NotesComponent = () => {
  const notes = useTLStore((state) => state.notes.list);

  return (
    <Layout pageTitle="Notes">
      <section>
        <Heading classNames="flex items-center justify-between">Notes:</Heading>
        <NoteList noteList={notes} />
      </section>
    </Layout>
  );
};
