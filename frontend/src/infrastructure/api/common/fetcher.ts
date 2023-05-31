import { replaceParams } from 'infrastructure/services/api/replaceParams';

type BaseURL =
  | ''
  | typeof process.env.API_GATEWAY
  | typeof process.env.MICRO_GATEWAY;

export type FetcherDeps = {
  getBaseUrl: () => BaseURL;
};

export type PassedOptions = {
  body?: Record<string, unknown> | RequestInit['body'];
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: Parameters<typeof replaceParams>[1];
  log?: boolean;
  returnResponse?: boolean;
  withMock?: boolean;
};

export const createFetcher =
  ({ getBaseUrl }: FetcherDeps) =>
  (passedUrl: string, passedOptions: PassedOptions = {}) => {
    const baseUrl = getBaseUrl();
    const endpoint = baseUrl + passedUrl;
    const url = replaceParams(endpoint, passedOptions.params);
    const withLogs = passedOptions.log;

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...passedOptions.headers,
    } as RequestInit['headers'];

    const options = {
      ...passedOptions,
      headers,
    } as RequestInit & PassedOptions;

    if (passedOptions.body) {
      options.body = JSON.stringify(passedOptions.body);
      options.method = 'POST';
    }

    if (passedOptions.method) {
      options.method = passedOptions.method;
    }

    return fetch(url, options).then((response) => {
      // Ruby sometimes doing force redirects right after fetch
      // We want to keep redirection responsibility in Next.js so just returning response here
      if (response.type === 'opaqueredirect') {
        return response;
      }

      if (passedOptions.returnResponse) {
        return response;
      }

      const jsonData = response.json();

      return jsonData;
    });
  };

export type Fetcher = ReturnType<typeof createFetcher>;

export const fetcher = createFetcher({
  getBaseUrl: () =>
    typeof window !== 'undefined'
      ? process.env.MICRO_GATEWAY
      : process.env.API_GATEWAY,
});
