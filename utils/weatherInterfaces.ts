interface IWeatherAPIResponse {
  location: ILocation;
}
export type IWeatherForecastResponse<T extends IWeatherAPIResponse = IWeatherAPIResponse> = T & {
  current: ICurrent;
  forecast: {
    forecastday: IForecastDay[];
  };
};

export interface IForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: {
      source: string;
      parsedValue: number;
    };
    totalprecip_mm: {
      source: string;
      parsedValue: number;
    };
    totalprecip_in: {
      source: string;
      parsedValue: number;
    };
    totalsnow_cm: {
      source: string;
      parsedValue: number;
    };
    avgvis_km: {
      source: string;
      parsedValue: number;
    };
    avgvis_miles: {
      source: string;
      parsedValue: number;
    };
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: number;
    is_moon_up?: number;
    is_sun_up?: number;
  };
}

export type IWeatherAstronomyResponse<T extends IWeatherAPIResponse = IWeatherAPIResponse> = T & {
  astronomy: IAstronomy;
};

export interface IAstronomy {
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
  };
}

interface ILocation {
  name: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export type ICurrent = {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
};
export interface IWeatherData {
  name: string;
  country: string;
  description: string;
  temp: number;
  humidity: number;
  wind_speed: number;
  visibility: number;
  feels_like: number;
  dt: number;
  sunrise: string;
  sunset: string;
  icon: string;
}

export interface IForecast {
  dt: number;
  temp: {
    max: number;
    min: number;
  };
  weather: {
    id: number;
    icon: string;
    description: string;
  }[];
}

export interface ICurrForecastData {
  curr: IWeatherData;
  forecasts: IForecast[];
}

export interface ISavedCity {
  _id: string;
  name: string;
  country: string;
  creator: { _id: string; name: string; email: string; username: string; iamge: string };
}
