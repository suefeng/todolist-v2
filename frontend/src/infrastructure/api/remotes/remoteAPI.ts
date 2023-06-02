import * as categoryAPI from './categories/categories.api';
import * as dayAPI from './days/days.api';
import * as frequencyAPI from './frequencies/frequencies.api';
import * as todoAPI from './todos/todos.api';

export const remoteAPI = {
  todos: todoAPI,
  categories: categoryAPI,
  frequencies: frequencyAPI,
  days: dayAPI,
};
