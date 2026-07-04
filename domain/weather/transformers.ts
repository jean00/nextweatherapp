import {
  IAstronomy,
  ICurrent,
  IForecast,
  IForecastDay,
  IWeatherData,
  IWeatherForecastResponse,
} from "@/utils/weatherInterfaces";

export type WeatherScreenData = {
  current: IWeatherData;
  forecasts: IForecast[];
};

type SafeCurrent = Partial<ICurrent> & {
  condition?: Partial<ICurrent["condition"]>;
};

type SafeForecastDay = Partial<IForecastDay> & {
  day?: Partial<IForecastDay["day"]> & {
    condition?: Partial<IForecastDay["day"]["condition"]>;
  };
};

const getSafeCurrent = (current?: SafeCurrent): Required<IWeatherData> => {
  const condition: Partial<ICurrent["condition"]> = current?.condition ?? {};
  return {
    name: "",
    country: "",
    description: condition.text ?? "N/A",
    temp: current?.temp_c ?? 0,
    humidity: current?.humidity ?? 0,
    wind_speed: current?.wind_kph ?? 0,
    visibility: current?.vis_km ?? 0,
    feels_like: current?.feelslike_c ?? 0,
    dt: current?.last_updated_epoch ?? Math.floor(Date.now() / 1000),
    sunrise: "N/A",
    sunset: "N/A",
    icon: condition.icon ?? "",
  };
};

const toCurrentWeather = (
  location: IWeatherForecastResponse["location"] | undefined,
  current: SafeCurrent,
  astronomy: IAstronomy["astro"] | undefined,
): IWeatherData => {
  const base = getSafeCurrent(current);
  return {
    ...base,
    name: location?.name ?? "Unknown",
    country: location?.country ?? "Unknown",
    sunrise: astronomy?.sunrise ?? "N/A",
    sunset: astronomy?.sunset ?? "N/A",
  };
};

const toForecastList = (days?: SafeForecastDay[]): IForecast[] => {
  return (days ?? []).slice(1).map((forecast) => {
    const day: Partial<IForecastDay["day"]> = forecast.day ?? {};
    const condition: Partial<IForecastDay["day"]["condition"]> =
      day.condition ?? {};
    return {
      dt: forecast.date_epoch ?? 0,
      temp: {
        max: day.maxtemp_c ?? 0,
        min: day.mintemp_c ?? 0,
      },
      weather: [
        {
          id: condition.code ?? 0,
          icon: condition.icon ?? "",
          description: condition.text ?? "N/A",
        },
      ],
    };
  });
};

export const toWeatherScreenData = (
  forecastRes: IWeatherForecastResponse,
  astronomy: IAstronomy["astro"] | undefined,
): WeatherScreenData => {
  return {
    current: toCurrentWeather(
      forecastRes?.location,
      forecastRes?.current,
      astronomy,
    ),
    forecasts: toForecastList(forecastRes?.forecast?.forecastday),
  };
};
