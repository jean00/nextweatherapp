import {
  IWeatherAstronomyResponse,
  IWeatherForecastResponse,
} from "@/utils/weatherInterfaces";
import { getEndpoints } from "./config";

export const weatherService = () => {
  const getForecast = async (
    location: string,
  ): Promise<IWeatherForecastResponse> => {
    const endpoints = await getEndpoints();
    const params = new URLSearchParams();
    location && params.append("q", location);
    params.append("days", "8");
    const response = await fetch(endpoints.forecast + `&${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Error fetching forecast data: ${response.statusText}`);
    }
    return response.json();
  };

  const getAstronomy = async (
    location: string,
    todayDate: string,
  ): Promise<IWeatherAstronomyResponse> => {
    const endpoints = await getEndpoints();
    const params = new URLSearchParams();
    location && params.append("q", location);
    todayDate && params.append("dt", todayDate);
    const response = await fetch(endpoints.astronomy + `&${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Error fetching astronomy data: ${response.statusText}`);
    }
    return response.json();
  };

  return {
    getForecast,
    getAstronomy,
  };
};
