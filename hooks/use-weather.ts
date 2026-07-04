import { weatherService } from "@/services/weatherService";
import { useState } from "react";
import { format } from "date-fns";
import { toWeatherScreenData } from "@/domain/weather/transformers";
import { IForecast, IWeatherData } from "@/utils/weatherInterfaces";

export const useWeather = () => {
  const [data, setData] = useState<{
    current: IWeatherData | null;
    forecasts: IForecast[] | null;
  }>({ current: null, forecasts: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { getForecast, getAstronomy } = weatherService();

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(false);
    try {
      const [forecast, { astronomy }] = await Promise.all([
        getForecast(city),
        getAstronomy(city, format(new Date(), "yyyy-MM-dd")),
      ]);

      const screenData = toWeatherScreenData(forecast, astronomy.astro);
      setData({ current: screenData.current, forecasts: screenData.forecasts });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { ...data, loading, error, fetchWeather };
};
