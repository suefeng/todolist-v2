import TodoList from 'application/components/features/TodoList';
import Layout, { Heading } from 'application/components/Layout';

const Todos = () => (
  <Layout pageTitle="Todos">
    <section>
      <Heading classNames="flex items-center justify-between">Todos:</Heading>
      <TodoList />
    </section>
  </Layout>
);

export default Todos;
