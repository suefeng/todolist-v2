import { createAPI } from 'infrastructure/services/api/api.service';
import * as categoriesAPI from './gateway/shell/categories/categories.api';
import * as categoryJoinsAPI from './gateway/shell/categoryJoins/categoryJoins.api';
import * as dayJoinsAPI from './gateway/shell/dayJoins/dayJoins.api';
import * as daysAPI from './gateway/shell/days/days.api';
import * as frequenciesAPI from './gateway/shell/frequencies/frequencies.api';
import * as frequencyJoinsAPI from './gateway/shell/frequencyJoins/frequencyJoins.api';
import * as notesAPI from './gateway/shell/notes/notes.api';
import * as todosAPI from './gateway/shell/todos/todos.api';

const apiGateway = {
  categories: categoriesAPI,
  categoryJoins: categoryJoinsAPI,
  days: daysAPI,
  dayJoins: dayJoinsAPI,
  frequencyJoins: frequencyJoinsAPI,
  frequencies: frequenciesAPI,
  todos: todosAPI,
  notes: notesAPI,
};

export type APIGatewayWithoutInjections = typeof apiGateway;

export const apiFactory = createAPI(apiGateway);
export const API = apiFactory.initialize();
