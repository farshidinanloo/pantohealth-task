"use client";

import type { Station } from "@/types/station";
import { useStationMap } from "./use-station-map";

interface StationsMapProps {
  stations: Station[];
  selectedStationId: number | null;
  onStationSelect: (station: Station) => void;
}

export function StationsMap({ stations, selectedStationId, onStationSelect }: StationsMapProps) {
  useStationMap({ stations, selectedStationId, onStationSelect });

  return <div id="stations-map" className="h-full min-h-[400px] w-full rounded-lg border border-zinc-200 bg-zinc-50" />;
}
