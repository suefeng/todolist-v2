import * as categoryAPI from './categories/categories.api';
import * as dayAPI from './days/days.api';
import * as frequencyAPI from './frequencies/frequencies.api';
import * as todoAPI from './todos/todos.api';

export const remoteAPI = {
  categories: categoryAPI,
  days: dayAPI,
  frequencies: frequencyAPI,
  todos: todoAPI,
};
