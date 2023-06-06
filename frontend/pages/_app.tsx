import 'application/styles/globals.css';

import React, { ComponentProps, useState } from 'react';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';

import { StoreProvider } from 'infrastructure/store/StoreProvider';
import { createEmotionCache } from 'application/common/createEmotionCache';

export type ShellAppProps = AppProps<{
  store: ComponentProps<typeof StoreProvider>['store'];
  dehydratedState: DehydratedState;
}> & { emotionCache: ReturnType<typeof createEmotionCache> };

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function ShellApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: ShellAppProps) {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  const { dehydratedState, store } = pageProps;

  return (
    <CacheProvider value={emotionCache}>
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <ThemeProvider
              attribute="class"
              enableColorScheme={false}
            >
              <Component {...pageProps} />
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </StoreProvider>
    </CacheProvider>
  );
}

export default ShellApp;
