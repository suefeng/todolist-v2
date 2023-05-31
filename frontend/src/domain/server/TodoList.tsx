import { z } from "zod";
import { Category } from "./Category";
import { Frequency } from "./Frequency";
import { Day } from "./Day";

export const TodoList = z.object({
  categories: z.array(Category).optional(),
  description: z.string().optional(),
  expiration: z.string().optional(),
  id: z.number(),
  frequency: Frequency.optional(),
  days: z.array(Day).optional(),
  status: z.string().optional(),
});

export const TodoListIndex = z.array(TodoList);

export const CreateTodoList = z.object({
  categories: z.array(Category).optional(),
  description: z.string().optional(),
  expiration: z.string().optional(),
  frequency: Frequency.optional(),
  days: z.array(Day).optional(),
  status: z.string().optional(),
});
export const DestroyTodoList = z.object({
  id: z.number(),
});
