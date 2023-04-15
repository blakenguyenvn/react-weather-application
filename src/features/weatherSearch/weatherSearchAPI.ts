import { makeRequest } from 'utils/weatherAPI';

export interface WeatherDataType {
  current?: any;
  location?: any;
  forecast?: any;
}

export interface LocationOptionType {
  id?: string;
  name?: any;
  region?: string;
  country?: string;
  url?: string;
}

export interface ForcastDataType {
  location?: any;
  forecast?: any;
}

interface QueryType {
  query: string;
}

export const searchLocation = async ({ query }: QueryType): Promise<any> => {
  const response: any = await fetch(
    makeRequest('GET', {
      api: 'search.json',
      queries: {
        q: query,
      },
    }),
  );

  return response.json();
};

export const fetchCurrentWeather = async ({ query }: QueryType): Promise<any> => {
  const response: any = await fetch(
    makeRequest('GET', {
      api: 'forecast.json',
      queries: {
        q: query,
        aqi: 'no',
        days: 5,
      },
    }),
  );

  return response.json();
};

export const fetchPastWeather = async ({ query }: QueryType): Promise<any> => {
  const response: any = await fetch(
    makeRequest('GET', {
      api: 'current.json',
      queries: {
        q: query,
        aqi: 'no',
      },
    }),
  );

  return response.json();
};
