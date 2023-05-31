import { Category } from "./Category";
import { Day } from "./Day";
import { Frequency } from "./Frequency";

export interface TodoList {
  categories?: Category[];
  description?: string;
  expiration?: string;
  id: number;
  frequencies?: Frequency[];
  day?: Day;
  status?: string;
}

export interface CreateTodoList {
  categories?: Category[];
  description?: string;
  expiration?: string;
  frequencies?: Frequency[];
  day?: Day;
  status?: string;
}
