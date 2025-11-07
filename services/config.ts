type Endpoints = typeof endpoints;

const BASE_URL = "http://api.weatherapi.com/v1";
const KEY_PARAM = `?key=${process.env.NEXT_PUBLIC_API_KEY}`;

const endpoints = {
  current: "/current.json",
  astronomy: "/astronomy.json",
  forecast: "/forecast.json",
};

export const getEndpoints = async (): Promise<Endpoints> => {
  return Object.fromEntries(Object.entries(endpoints).map(([k, value]) => [k, BASE_URL + value + KEY_PARAM])) as Endpoints;
};
