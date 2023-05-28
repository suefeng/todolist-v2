import Layout, { Heading } from "application/components/Layout";
import TodoList from "application/components/features/TodoList";

const Todos = () => (
  <Layout pageTitle="Todos">
    <section>
      <Heading classNames="flex items-center justify-between">Todos:</Heading>
      <TodoList />
    </section>
  </Layout>
);

export default Todos;
