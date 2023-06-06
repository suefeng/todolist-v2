import { APIGateway } from 'infrastructure/services/api/api.service';
import { RootStore } from 'infrastructure/store/rootStore';

export interface AppRegistry {
  store: RootStore;
  API: APIGateway;
}
