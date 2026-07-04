"use client";

import { useEffect, useState } from "react";
import Weather from "@/components/Weather";
import { useSearchParams } from "next/navigation";
import { useWeather } from "@/hooks/use-weather";

const Home = (): React.JSX.Element => {
  const [input, setInput] = useState("");
  const { current, forecasts, error, fetchWeather } = useWeather();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) fetchWeather(input);
  };

  useEffect(() => {
    const city = searchParams.get("search");
    if (city) fetchWeather(city);
  }, [searchParams]);

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
          onChange={(e) => setInput(e.target.value)}
          required
          className="w-full focus:outline-none"
        />
        <button type="submit" className="black_btn">
          Search
        </button>
      </form>
      {current && forecasts ? (
        <Weather curr={current} forecasts={forecasts} />
      ) : (
        error && <h1 className="mt-5">City/Country/State not found</h1>
      )}
    </section>
  );
};

export default Home;
