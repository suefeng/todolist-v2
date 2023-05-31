type SingleValue = string | boolean | number;
type Value = SingleValue | SingleValue[];
type Params = Record<string, Value>;

export const replaceParams = (endpoint: string, params?: Params) => {
  if (typeof params !== 'object') {
    return endpoint;
  }

  return replaceEndpointParam(endpoint, params);
};

const replaceEndpointParam = (endpoint: string, params: Params) => {
  let url = endpoint + '?';

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (Array.isArray(value)) {
      value.forEach((val) => {
        url += `${key}[]=${encodeURIComponent(val)}&`;
      });
    } else {
      url += `${key}=${encodeURIComponent(value)}&`;
    }
  });

  // Remove trailing '&' character
  url = url.slice(0, -1);

  return url;
};
