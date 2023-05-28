import { Category } from "./Category";
import {Repeating} from "./Repeating";

export interface TodoList {
  categories?: Category[];
  description?: string;
  expiration?: string;
  id: number;
  repeatings?: Repeating[];
  status?: string;
}

export interface CreateTodoList {
  categories?: Category[];
  description?: string;
  expiration?: string;
  repeatings?: Repeating[];
  status?: string;
}