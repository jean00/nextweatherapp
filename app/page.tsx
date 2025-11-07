"use client";

import { useEffect, useState } from "react";
import Weather from "@/components/Weather";
import { useRouter, useSearchParams } from "next/navigation";
import { IAstronomy, ICurrent, IForecast, IWeatherData } from "@/utils/weatherInterfaces";
import { weatherService } from "@/services/weatherService";
import { format } from "date-fns";
import { formatForecasts, formatWeatherData } from "@/utils/functions";

const Home = (): React.JSX.Element => {
  const [input, setInput] = useState<string>("");
  const [currWeather, setCurrWeather] = useState<IWeatherData | null>(null);
  const [forecasts, setForecasts] = useState<IForecast[]>([]);
  const [error, setError] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const searchCity = searchParams.get("search");
  const router = useRouter();
  const { getForecast, getAstronomy } = weatherService();

  useEffect(() => {
    if (!searchCity) return;
    getForecast(searchCity);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // Reset error, forecasts, and currWeather
    setError(false);
    setForecasts([]);
    setCurrWeather(null);
    // Fetch weather data
    try {
      const { location, current, forecast } = await getForecast(input);
      const { astronomy } = await getAstronomy(input, format(new Date(), "yyyy-MM-dd"));
      const daily = astronomy.astro;
      const currentForecast: ICurrent & IAstronomy["astro"] = {
        ...current,
        ...daily,
      };

      const { name, country } = location;
      setCurrWeather(formatWeatherData(name, country, currentForecast));
      console.log("aaaa", forecast);

      setForecasts(formatForecasts(forecast));
    } catch (err) {
      setError(true);
      setInput("");
    }
    // Reset pathname to /
    router.push("/", undefined);
  };

  return (
    <section className="w-full flex-center flex-col">
      <form className="relative w-full flex-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the country name"
          value={input}
          onChange={handleChange}
          required
          className="search_input peer"
        />
      </form>
      {currWeather ? (
        <Weather curr={currWeather} forecasts={forecasts} />
      ) : (
        error && <h1 className="mt-5">City/Country/State not found</h1>
      )}
    </section>
  );
};

export default Home;
