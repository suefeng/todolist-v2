import * as categoriesAPI from './categories/categories.api';
import * as categoryJoinsAPI from './categoryJoins/categoryJoins.api';
import * as daysAPI from './days/days.api';
import * as dayJoinsAPI from './dayJoins/dayJoins.api';
import * as frequenciesAPI from './frequencies/frequencies.api';
import * as frequencyJoinsAPI from './frequencyJoins/frequencyJoins.api';
import * as notesAPI from './notes/notes.api';
import * as todosAPI from './todos/todos.api';

export const remoteAPI = {
  categoryJoins: categoryJoinsAPI,
  frequencyJoins: frequencyJoinsAPI,
  categories: categoriesAPI,
  days: daysAPI,
  dayJoins: dayJoinsAPI,
  frequencies: frequenciesAPI,
  notes: notesAPI,
  todos: todosAPI,
};
