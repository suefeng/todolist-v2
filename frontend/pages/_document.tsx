import React from 'react';
import getConfig from 'next/config';
import { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

import { nextjsEmotionCacheForMUI } from 'infrastructure/services';

const { publicRuntimeConfig } = getConfig();

type TLDocumentProps = {
  emotionStyleTags: React.ReactNode;
};

export default function TLDocument({ emotionStyleTags }: TLDocumentProps) {
  return (
    <Html>
      <Head>
        <meta
          name="robots"
          content={publicRuntimeConfig.ROBOTS_META}
        />
        <meta
          name="emotion-insertion-point"
          content=""
        />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

TLDocument.getInitialProps = (ctx: DocumentContext) => {
  return nextjsEmotionCacheForMUI(ctx);
};
