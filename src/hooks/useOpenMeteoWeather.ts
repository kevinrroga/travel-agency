import { useQuery } from "@tanstack/react-query";
import {
  fetchOpenMeteoForecast,
  type OpenMeteoForecastResponse,
  type TemperatureUnit,
} from "@/lib/openMeteo";

export type UseOpenMeteoWeatherOptions = {
  latitude: number;
  longitude: number;
  temperatureUnit?: TemperatureUnit;
  enabled?: boolean;
};

export const useOpenMeteoWeather = ({
  latitude,
  longitude,
  temperatureUnit = "celsius",
  enabled = true,
}: UseOpenMeteoWeatherOptions) => {
  return useQuery<OpenMeteoForecastResponse>({
    queryKey: ["open-meteo", latitude, longitude, temperatureUnit],
    queryFn: () =>
      fetchOpenMeteoForecast({
        latitude,
        longitude,
        temperatureUnit,
      }),
    enabled: enabled && Number.isFinite(latitude) && Number.isFinite(longitude),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });
};
