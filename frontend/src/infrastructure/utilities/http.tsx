const DELETE = "DELETE";
const GET = "GET";
const PATCH = "PATCH";
const POST = "POST";
const PUT = "PUT";

const PREFIX = process.env.GATEWAY_ENDPOINT || "";

// export const getCsrfToken = () => {
//   const csrfToken = document.querySelector('meta[name="csrf-token"]');
//   return csrfToken && csrfToken.content;
// };

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const buildInit = (method: string, headers: HeadersInit, options: object): RequestInit => ({
  method,
  headers,
  ...options,
});

const createRequest = (method: string, url: string, options: object, headers: HeadersInit) => {
  const init = buildInit(method, headers, options);
  return fetch(`${PREFIX}${url}`, init);
};

export default {
  get: (url: string, options = {}, headers = DEFAULT_HEADERS) => {
    return createRequest(GET, url, options, headers);
  },
  delete: (url: string, options = {}, headers = DEFAULT_HEADERS) => {
    return createRequest(DELETE, url, options, headers);
  },
  patch: (url: string, options = {}, headers = DEFAULT_HEADERS) => {
    return createRequest(PATCH, url, options, headers);
  },
  post: (url: string, options = {}, headers = DEFAULT_HEADERS) => {
    return createRequest(POST, url, options, headers);
  },
  put: (url: string, options = {}, headers = DEFAULT_HEADERS) => {
    return createRequest(PUT, url, options, headers);
  },
};
