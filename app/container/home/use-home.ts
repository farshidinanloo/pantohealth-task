"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { filterStationsByCity } from "@/lib/filter-stations";
import { useStations } from "@/lib/use-stations";
import type { Station } from "@/types/station";

const CITY_PARAM = "city";
const STATION_ID_PARAM = "stationId";

function getInitialStateFromUrl(searchParams: ReturnType<typeof useSearchParams>): {
  city: string;
  stationId: number | null;
} {
  const city = searchParams.get(CITY_PARAM) ?? "";
  const stationIdRaw = searchParams.get(STATION_ID_PARAM);
  const stationId =
    stationIdRaw != null && stationIdRaw !== "" && /^\d+$/.test(stationIdRaw)
      ? parseInt(stationIdRaw, 10)
      : null;
  return { city, stationId: stationId !== null && Number.isFinite(stationId) ? stationId : null };
}

export function useHome() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { city: urlCity, stationId: urlStationId } = getInitialStateFromUrl(searchParams);

  const { data: stations = [], isLoading, isError, error } = useStations();
  const [cityFilter, setCityFilter] = useState(urlCity);
  const [selectedStationId, setSelectedStationId] = useState<number | null>(urlStationId);

  // Sync cityFilter and selectedStationId to URL when they change
  useEffect(() => {
    const urlCityNow = searchParams.get(CITY_PARAM) ?? "";
    const urlStationIdRaw = searchParams.get(STATION_ID_PARAM);
    const urlStationIdNow =
      urlStationIdRaw != null && /^\d+$/.test(urlStationIdRaw)
        ? parseInt(urlStationIdRaw, 10)
        : null;
    if (cityFilter === urlCityNow && (selectedStationId ?? null) === urlStationIdNow) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    if (cityFilter) {
      params.set(CITY_PARAM, cityFilter);
    } else {
      params.delete(CITY_PARAM);
    }
    if (selectedStationId !== null) {
      params.set(STATION_ID_PARAM, String(selectedStationId));
    } else {
      params.delete(STATION_ID_PARAM);
    }
    const query = params.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [cityFilter, selectedStationId, pathname, router, searchParams]);

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
