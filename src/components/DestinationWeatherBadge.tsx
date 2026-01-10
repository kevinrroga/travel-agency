import { useMemo } from "react";
import { useOpenMeteoWeather } from "@/hooks/useOpenMeteoWeather";
import { useTemperatureUnit } from "@/hooks/useTemperatureUnit";
import {
  openMeteoIconForCode,
  openMeteoLabelForCode,
} from "@/lib/openMeteoCodes";

export type DestinationWeatherBadgeProps = {
  latitude: number;
  longitude: number;
};

const DestinationWeatherBadge = ({
  latitude,
  longitude,
}: DestinationWeatherBadgeProps) => {
  const { temperatureUnit } = useTemperatureUnit();
  const { data, isLoading, isError } = useOpenMeteoWeather({
    latitude,
    longitude,
    temperatureUnit,
  });

  const unitSymbol = temperatureUnit === "fahrenheit" ? "°F" : "°C";

  const current = data?.current;
  const code = current?.weather_code ?? 3;
  const Icon = openMeteoIconForCode(code);
  const label = openMeteoLabelForCode(code);

  const tempText = useMemo(() => {
    if (!current) return null;
    return `${Math.round(current.temperature_2m)}${unitSymbol}`;
  }, [current, unitSymbol]);

  if (isLoading) {
    return <div className="h-6 w-28 rounded-full bg-muted animate-pulse" />;
  }

  if (isError || !current || !tempText) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-muted/70 px-3 py-1 text-sm text-muted-foreground">
      <Icon className="h-4 w-4" />
      <span className="font-medium text-foreground">{tempText}</span>
      <span className="text-muted-foreground/80">·</span>
      <span>{label}</span>
    </div>
  );
};

export default DestinationWeatherBadge;
