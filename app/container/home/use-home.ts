"use client";

import { useMemo, useState, useCallback } from "react";
import { filterStationsByCity } from "@/lib/filter-stations";
import { useStations } from "@/lib/use-stations";
import type { Station } from "@/types/station";

export function useHome() {
  const { data: stations = [], isLoading, isError, error } = useStations();
  const [cityFilter, setCityFilter] = useState("");
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null);

  const cities = useMemo(() => {
    const set = new Set(stations.map((s) => s.city));
    return Array.from(set).sort();
  }, [stations]);

  const filteredStations = useMemo(
    () => filterStationsByCity(stations, cityFilter),
    [stations, cityFilter]
  );

  const selectedStationIdInFiltered =
    selectedStationId !== null && filteredStations.some((s) => s.id === selectedStationId)
      ? selectedStationId
      : filteredStations[0]?.id ?? null;

  const handleStationSelect = useCallback((station: Station) => {
    setSelectedStationId(station.id);
  }, []);

  return {
    stations: filteredStations,
    cities,
    cityFilter,
    setCityFilter,
    selectedStationId: selectedStationIdInFiltered,
    onStationSelect: handleStationSelect,
    isLoading,
    isError,
    error,
  };
}
