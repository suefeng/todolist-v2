import { z } from "zod";
import { Category } from "./Category";
import { Repeating } from "./Repeating";

export const TodoList = z.object({
  categories: z.array(Category).optional(),
  description: z.string().optional(),
  expiration: z.string().optional(),
  id: z.number(),
  repeatings: z.array(Repeating).optional(),
  status: z.string().optional(),
});

export const TodoListIndex = z.array(TodoList);

export const CreateTodoList = z.object({
  categories: z.array(Category).optional(),
  description: z.string().optional(),
  expiration: z.string().optional(),
  repeatings: z.array(Repeating).optional(),
  status: z.string().optional(),
});
export const DestroyTodoList = z.object({
  id: z.number(),
});
