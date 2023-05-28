export const URLS = {
  notes: "/notes",
  todos: "/todos",
  todosAdd: "/todos/add",
  todoFilter: (filter: string, type: string) =>
    `/todos/${type}?filter=${filter}`,
  todoShow: (todoId: number) => `/todos/${todoId}`,
  todoEdit: (todoId: number) => `/todos/edit/${todoId}`,
};

export const publicRoutes = {
  general: [
    {
      name: "Todos",
      href: URLS.todos,
    },
    {
      name: "Notes",
      href: URLS.notes,
    },
  ],
};
