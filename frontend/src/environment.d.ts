declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_GATEWAY: 'http://localhost:3008';
      NODE_ENV: 'development';
      MICRO_GATEWAY: 'http://localhost:3008';
      PROXY_URL: 'http://localhost:3007';
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
