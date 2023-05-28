import { TodoListIndex } from "../TodoList";
import { z } from "zod";

export const SortedTodos = (todos: z.infer<typeof TodoListIndex>) => {
  return todos.sort((a, b) => {
    const bStatus = b.status || "not-started";
    const aStatus = a.status || "not-started";
    const bId = b.id || 100000;
    const aId = a.id || 100000;

    if (bStatus !== "completed" && aStatus === "completed") {
      return 1;
    }
    if (aStatus !== "completed" && bStatus === "completed") {
      return -1;
    }
    if (bId > aId) {
      return 1;
    }
    if (aId > bId) {
      return -1;
    }
    return -1;
  });
};
