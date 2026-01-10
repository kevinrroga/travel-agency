export type TemperatureUnit = "celsius" | "fahrenheit";

export type OpenMeteoForecastResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  current?: {
    time: string;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
};

export type OpenMeteoForecastParams = {
  latitude: number;
  longitude: number;
  temperatureUnit?: TemperatureUnit;
};

export const fetchOpenMeteoForecast = async ({
  latitude,
  longitude,
  temperatureUnit = "celsius",
}: OpenMeteoForecastParams): Promise<OpenMeteoForecastResponse> => {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.search = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    timezone: "auto",
    current: "temperature_2m,weather_code,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    temperature_unit: temperatureUnit,
  }).toString();

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Open-Meteo request failed (${res.status})`);
  }

  return (await res.json()) as OpenMeteoForecastResponse;
};
