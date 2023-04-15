const API_KEY: string = process.env.REACT_APP_API_KEY || '';

const BASE_URL: string | undefined =
  process.env.REACT_APP_API_URL || 'https://api.weatherapi.com/v1/';

export const makeUrl = (api: string, queries: any) => {
  const params = new URLSearchParams();

  params.append('key', API_KEY);
  Object.keys(queries).forEach((queryName) => {
    params.append(queryName, queries[queryName]);
  });

  return `${BASE_URL}${api}?${params.toString()}`;
};

export const makeRequest = (method: string, data: any) => {
  const { api, queries, body } = data;
  const url = makeUrl(api, queries);

  return new Request(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      dataType: 'json',
    },
    mode: 'cors',
    cache: 'default',
    body: body ? JSON.stringify(body) : null,
  });
};
