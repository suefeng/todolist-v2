import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { URLS } from 'infrastructure/router/routes';
import EditTodo from 'application/components/features/EditTodo';
import Layout, { Heading } from 'application/components/Layout';

const Edit = () => {
  const router = useRouter();
  const getTodoId = router.query.todoId || '';
  const todoId = getTodoId.toString();

  return todoId ? (
    <Layout pageTitle="Edit todo">
      <section>
        <Heading classNames="flex items-center justify-between">
          Todos:
          <span className="flex items-center gap-3">
            <Link
              href={URLS.todos}
              className="rounded-md bg-emerald-300 px-3 py-2 text-xl"
            >
              view all &rsaquo;
            </Link>
          </span>
        </Heading>
        <EditTodo todoId={todoId} />
      </section>
    </Layout>
  ) : null;
};

export default Edit;
