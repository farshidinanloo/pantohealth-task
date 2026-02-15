import type { Station } from "@/types/station";

export function filterStationsByCity(stations: Station[], city: string): Station[] {
  if (!city.trim()) return stations;
  return stations.filter((s) => s.city === city);
}
