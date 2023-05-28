import React from "react";
import Layout, { Heading } from "application/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import EditTodo from "application/components/features/EditTodo";
import { URLS } from "infrastructure/router/routes";

const Edit = () => {
  const router = useRouter();
  const getTodoId = router.query.todoId || "";
  const todoId = getTodoId.toString();

  return todoId ? (
    <Layout pageTitle="Edit todo">
      <section>
        <Heading classNames="flex items-center justify-between">
          Todos:
          <span className="flex gap-3 items-center">
            <Link
              href={URLS.todos}
              className="text-xl px-3 py-2 bg-emerald-300 rounded-md"
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
