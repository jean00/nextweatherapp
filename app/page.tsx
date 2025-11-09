"use client";

import { useEffect, useState } from "react";
import Weather from "@/components/Weather";
import { useRouter, useSearchParams } from "next/navigation";
import {
  IAstronomy,
  ICurrent,
  IForecast,
  IWeatherData,
} from "@/utils/weatherInterfaces";
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

  const handleSearch = async (searchCity?: string) => {
    const { location, current, forecast } = await getForecast(
      searchCity || input
    );
    const { astronomy } = await getAstronomy(
      input,
      format(new Date(), "yyyy-MM-dd")
    );
    const daily = astronomy?.astro;
    const currentForecast: ICurrent & IAstronomy["astro"] = {
      ...current,
      ...daily,
    };

    const { name, country } = location;
    setCurrWeather(formatWeatherData(name, country, currentForecast));
    setForecasts(formatForecasts(forecast));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInput(e.target.value);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // Reset error, forecasts, and currWeather
    setError(false);
    setForecasts([]);
    setCurrWeather(null);
    // Fetch weather data
    try {
      handleSearch();
    } catch (err) {
      setError(true);
      setInput("");
    }

    // Reset pathname to /
    router.push("/", undefined);
  };

  useEffect(() => {
    if (!searchCity) return;
    handleSearch(searchCity);
  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <form
        className="search_input peer w-full flex justify-between"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter the country name"
          value={input}
          onChange={handleChange}
          required
          className="w-full focus:outline-none"
        />
        <button type="submit" className="black_btn">
          Search
        </button>
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
