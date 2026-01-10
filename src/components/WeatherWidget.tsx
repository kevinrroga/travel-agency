import { useMemo } from "react";
import { useOpenMeteoWeather } from "@/hooks/useOpenMeteoWeather";
import type { TemperatureUnit } from "@/lib/openMeteo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind } from "lucide-react";
import {
  openMeteoIconForCode,
  openMeteoLabelForCode,
} from "@/lib/openMeteoCodes";
import { useTemperatureUnit } from "@/hooks/useTemperatureUnit";

export type WeatherWidgetProps = {
  title?: string;
  latitude: number;
  longitude: number;
  temperatureUnit?: TemperatureUnit;
  compact?: boolean;
  showUnitToggle?: boolean;
};

const WeatherWidget = ({
  title = "Weather",
  latitude,
  longitude,
  temperatureUnit,
  compact = false,
  showUnitToggle = true,
}: WeatherWidgetProps) => {
  const unitPref = useTemperatureUnit();
  const effectiveUnit = temperatureUnit ?? unitPref.temperatureUnit;

  const { data, isLoading, isError } = useOpenMeteoWeather({
    latitude,
    longitude,
    temperatureUnit: effectiveUnit,
  });

  const unitSymbol = effectiveUnit === "fahrenheit" ? "°F" : "°C";

  const current = data?.current;
  const today = useMemo(() => {
    if (!data?.daily) return null;
    return {
      min: data.daily.temperature_2m_min?.[0],
      max: data.daily.temperature_2m_max?.[0],
      code: data.daily.weather_code?.[0],
    };
  }, [data?.daily]);

  const code = current?.weather_code ?? today?.code ?? 3;
  const Icon = openMeteoIconForCode(code);
  const label = openMeteoLabelForCode(code);

  return (
    <Card className={compact ? "shadow-card" : "shadow-elevated"}>
      <CardHeader className={compact ? "py-4" : undefined}>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>

          {showUnitToggle && !temperatureUnit && (
            <div className="inline-flex rounded-lg border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => unitPref.setTemperatureUnit("celsius")}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                  effectiveUnit === "celsius"
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Use Celsius"
              >
                °C
              </button>
              <button
                type="button"
                onClick={() => unitPref.setTemperatureUnit("fahrenheit")}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                  effectiveUnit === "fahrenheit"
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Use Fahrenheit"
              >
                °F
              </button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className={compact ? "pt-0" : undefined}>
        {isLoading ? (
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="h-9 w-9 rounded-lg bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-muted animate-pulse" />
              <div className="h-3 w-24 rounded bg-muted animate-pulse" />
            </div>
          </div>
        ) : isError || !current ? (
          <p className="text-sm text-muted-foreground">
            Weather unavailable right now.
          </p>
        ) : (
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(current.temperature_2m)}
                  {unitSymbol}
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            </div>

            <div className="text-right text-sm text-muted-foreground">
              {typeof today?.min === "number" &&
                typeof today?.max === "number" && (
                  <div>
                    Today: {Math.round(today.min)}
                    {unitSymbol} – {Math.round(today.max)}
                    {unitSymbol}
                  </div>
                )}
              <div className="mt-1 inline-flex items-center justify-end gap-2">
                <Wind className="h-4 w-4" />
                <span>{Math.round(current.wind_speed_10m)} km/h</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
