import React from 'react';

import { useTLStore } from 'infrastructure/store/useTLStore';
import Layout, { Heading } from 'application/components/Layout';
import { TodoList } from './TodoList';

export const TodoListComponent = () => {
  // const todos = useTLStore((state) => state.todos);
  const todos = useTLStore((state) => state.todos.list);

  return (
    <Layout pageTitle="Todos">
      <section>
        <Heading classNames="flex items-center justify-between">Todos:</Heading>
        <TodoList todoList={todos} />
      </section>
    </Layout>
  );
};
