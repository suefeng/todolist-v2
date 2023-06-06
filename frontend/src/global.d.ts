import { StoreService } from 'infrastructure/services';

declare global {
  interface Window {
    __storeService: StoreService;
  }
}

export {};
