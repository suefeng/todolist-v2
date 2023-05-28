import Layout, { Heading } from "application/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import TodoList from "application/components/features/TodoList";
import { URLS } from "infrastructure/router/routes";

const Type = () => {
  const router = useRouter();
  const getType = router.query.type || "";
  const type = getType.toString();
  const { filter } = router.query;

  return type && filter ? (
    <Layout pageTitle={filter.toString()}>
      <section>
        <Heading classNames="flex items-center justify-between">
          Todos:
          <span className="flex gap-3 items-center">
            <span className="text-xl px-3 py-2 bg-slate-300 rounded-md">
              {filter}
            </span>
            <Link
              href={URLS.todos}
              className="text-xl px-3 py-2 bg-emerald-300 rounded-md"
            >
              view all &rsaquo;
            </Link>
          </span>
        </Heading>
        <TodoList filter={filter.toString()} type={type} />
      </section>
    </Layout>
  ) : null;
};

export default Type;
