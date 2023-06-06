import { createAPI } from 'infrastructure/services/api/api.service';
import * as categoriesAPI from './gateway/shell/categories/categories.api';
import * as daysAPI from './gateway/shell/days/days.api';
import * as frequenciesAPI from './gateway/shell/frequencies/frequencies.api';
import * as todoListAPI from './gateway/shell/todos/todos.api';

const apiGateway = {
  todoList: todoListAPI,
  categories: categoriesAPI,
  frequencies: frequenciesAPI,
  days: daysAPI,
};

export type APIGatewayWithoutInjections = typeof apiGateway;

export const apiFactory = createAPI(apiGateway);
export const API = apiFactory.initialize();
