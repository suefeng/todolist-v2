import { Category } from "./Category";
import { Day } from "./Day";
import { Frequency } from "./Frequency";

export interface TodoList {
  categories?: Category[];
  description?: string;
  expiration?: string;
  id: number;
  frequency?: Frequency;
  day?: Day;
  status?: string;
}

export interface CreateTodoList {
  categories?: Category[];
  description?: string;
  expiration?: string;
  frequency?: Frequency;
  day?: Day;
  status?: string;
}
