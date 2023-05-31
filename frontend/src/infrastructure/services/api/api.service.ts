import { GetServerSidePropsContext } from 'next';
import { NextRequest } from 'next/server';

import { APIGatewayWithoutInjections } from 'infrastructure/api';
import { createFetcher, Fetcher } from 'infrastructure/api/common';

export type APIGateway = {
  [K in keyof APIGatewayWithoutInjections]: DeepFunctionReturnTypes<
    APIGatewayWithoutInjections[K]
  >;
};

type NextRequestProvider = GetServerSidePropsContext | NextRequest;

export const createAPI = (apiGateway: APIGatewayWithoutInjections) => {
  let api: APIGateway;

  return {
    initialize: (ssrContext?: NextRequestProvider) => {
      const gatewayFetcher = ssrContext
        ? createFetcher({
            getBaseUrl,
          })
        : createFetcher({ getBaseUrl: () => '' });

      api = injectGatewayFetcher(apiGateway, gatewayFetcher);
      return api;
    },
    get API() {
      return api;
    },
  };
};

const injectGatewayFetcher = (
  apiGateway: APIGatewayWithoutInjections,
  gatewayFetcher: Fetcher,
) => {
  const newAPI = {} as APIGateway;

  for (const [serviceName, service] of Object.entries(apiGateway)) {
    for (const [methodName, methodFunction] of Object.entries(service)) {
      const method = methodFunction(gatewayFetcher);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (newAPI as any)[serviceName] = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(newAPI as any)[serviceName],
        [methodName]: method,
      };
    }
  }

  return newAPI;
};

const getBaseUrl = () => process.env.MICRO_GATEWAY;

type DeepFunctionReturnTypes<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : T[K] extends object
    ? DeepFunctionReturnTypes<T[K]>
    : never;
};
