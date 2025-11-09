import {
  IAstronomy,
  ICurrent,
  IForecast,
  IForecastDay,
  IWeatherData,
} from "./weatherInterfaces";

export const formatWeatherData = (
  name: string,
  country: string,
  data: ICurrent & IAstronomy["astro"]
): IWeatherData => {
  const {
    temp_c,
    humidity,
    wind_kph,
    vis_km,
    feelslike_c,
    last_updated_epoch,
    sunrise,
    sunset,
    condition: { text: description, icon },
  } = data;
  return {
    name,
    country,
    description,
    temp: temp_c,
    humidity: humidity,
    wind_speed: wind_kph,
    visibility: vis_km,
    feels_like: feelslike_c,
    dt: last_updated_epoch,
    sunrise,
    sunset,
    icon,
  };
};

export const formatForecasts = (data: {
  forecastday: IForecastDay[];
}): IForecast[] => {
  return data.forecastday.slice(1).map((forecast) => {
    const { date_epoch: dt } = forecast;
    const {
      maxtemp_c,
      mintemp_c,
      condition: { text: description, icon, code: id },
    } = forecast.day;

    return {
      dt,
      temp: { max: maxtemp_c, min: mintemp_c },
      weather: [{ id, icon, description }],
    };
  });
};
