import { Category } from './Category';
import { Day } from './Day';
import { Frequency } from './Frequency';

export interface Todo {
  categories?: Category[];
  description?: string;
  expiration?: string;
  id: number;
  frequencies?: Frequency[];
  days?: Day[];
  status?: string;
}

export interface CreateTodo {
  categories?: Category[];
  description?: string;
  expiration?: string;
  frequencies?: Frequency[];
  days?: Day[];
  status?: string;
}
