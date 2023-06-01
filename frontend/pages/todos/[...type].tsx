import Link from 'next/link';
import { useRouter } from 'next/router';

import { URLS } from 'infrastructure/router/routes';
import TodoList from 'application/components/features/TodoList';
import Layout, { Heading } from 'application/components/Layout';

const Type = () => {
  const router = useRouter();
  const getType = router.query.type || '';
  const type = getType.toString();
  const { filter } = router.query;

  return type && filter ? (
    <Layout pageTitle={filter.toString()}>
      <section>
        <Heading classNames="flex items-center justify-between">
          Todos:
          <span className="flex items-center gap-3">
            <span className="rounded-md bg-slate-300 px-3 py-2 text-xl">
              {filter}
            </span>
            <Link
              href={URLS.todos}
              className="rounded-md bg-emerald-300 px-3 py-2 text-xl"
            >
              view all &rsaquo;
            </Link>
          </span>
        </Heading>
        <TodoList
          filter={filter.toString()}
          type={type}
        />
      </section>
    </Layout>
  ) : null;
};

export default Type;
