import React from "react";
import { fromUnixTime, format } from "date-fns";
import Image from "next/image";

interface ITemp {
  max: number;
  min: number;
}

interface IWeather {
  description: string;
  icon: string;
}

interface IForecasts {
  dt: number;
  temp: ITemp;
  weather: IWeather[];
}

const Forecasts = ({ dt, temp, weather }: IForecasts) => {
  const formattedDt: string = format(fromUnixTime(dt), "PP");
  const { max, min }: ITemp = temp;
  const { description, icon }: IWeather = weather[0];

  const convertTemperatureKtoC = (temp: number): string => temp.toFixed(0);

  return (
    <div className="grid grid-cols-4 gap-6 lg:ml-20 items-center text-sm lg:text-lg justify-center">
      <p>{formattedDt}</p>
      <div className="flex justify-center">
        <Image src={`https:${icon}`} alt="weather_image" width={50} height={50} className="rounded-full object-contain" />
      </div>
      <p className="font-semibold">
        {convertTemperatureKtoC(max)}°C / {convertTemperatureKtoC(min)}°C
      </p>
      <p>{description}</p>
    </div>
  );
};

export default Forecasts;
