/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */

const env = process.env.ENV_NAME || process.env.ENV || 'global';

const runtimeConfig = require(`./runtime.config.dev.js`);

let { PROXY_URL, API_GATEWAY } = runtimeConfig.publicRuntimeConfig;

console.log('PROXY: ', PROXY_URL);
console.log('API_GATEWAY: ', API_GATEWAY);
console.log('ENV: ', env);
console.log('NODE_ENV: ', process.env.NODE_ENV);

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/base': {
      transform: '@mui/base/{{member}}',
    },
  },
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  // eslint-disable-next-line require-await
  async rewrites() {
    return {
      // These rewrites are checked after headers/redirects
      // and before all files including _next/public files which
      // allows overriding page files
      beforeFiles: [
        {
          source: '/404',
          destination: `${PROXY_URL}/404`,
        },
      ],
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
        {
          source: '/favicon.ico',
          destination: `/favicon/favicon.ico`,
        },
      ],
      // These rewrites are checked after both pages/public files
      // and dynamic routes are checked
      fallback: [
        {
          source: '/:path*',
          destination: `${PROXY_URL}/:path*`,
        },
      ],
    };
  },
  images: {
    domains: ['localhost'],
  },
  serverRuntimeConfig: {
    ...runtimeConfig.serverRuntimeConfig,
  },
  publicRuntimeConfig: {
    ...runtimeConfig.publicRuntimeConfig,
  },
  env: {
    PROXY_URL,
    API_GATEWAY,
  },
};

module.exports = nextConfig;
