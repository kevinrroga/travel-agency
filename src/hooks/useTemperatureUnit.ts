import { useEffect, useState } from "react";
import type { TemperatureUnit } from "@/lib/openMeteo";

const STORAGE_KEY = "wanderlust.temperatureUnit";

export const useTemperatureUnit = () => {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(() => {
    if (typeof window === "undefined") return "celsius";
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === "fahrenheit" ? "fahrenheit" : "celsius";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, temperatureUnit);
    } catch {
      // ignore storage errors
    }
  }, [temperatureUnit]);

  return {
    temperatureUnit,
    setTemperatureUnit,
    toggle: () =>
      setTemperatureUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius")),
  };
};
