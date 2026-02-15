"use client";

import dynamic from "next/dynamic";
import { useHome } from "./use-home";
import { CityFilter } from "@/components/city-filter";
import { StationsList } from "@/components/station-list";

const StationsMap = dynamic(
  () => import("@/components/station-map").then((m) => ({ default: m.StationsMap })),
  { ssr: false, loading: () => <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-500">Loading map…</div> }
);

export function Home() {
  const {
    stations,
    cities,
    cityFilter,
    setCityFilter,
    selectedStationId,
    onStationSelect,
    isLoading,
    isError,
    error,
  } = useHome();

  return (
    <div className="min-h-screen bg-zinc-100 font-sans">
      <header className="border-b border-zinc-200 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold text-zinc-900">PANTOhealth — German train stations</h1>
          <p className="text-sm text-zinc-600">Select a city to filter and click a station to zoom on the map.</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {isError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800" role="alert">
            Failed to load stations: {error?.message ?? "Unknown error"}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="flex flex-col gap-4">
            <CityFilter cities={cities} value={cityFilter} onChange={setCityFilter} disabled={isLoading} />
            <div>
              <h2 className="mb-2 text-sm font-medium text-zinc-700">Stations</h2>
              <StationsList
                stations={stations}
                selectedStationId={selectedStationId}
                onStationClick={onStationSelect}
                isLoading={isLoading}
              />
            </div>
          </aside>
          <section className="min-w-0">
            <h2 className="sr-only">Map</h2>
            <StationsMap
              stations={stations}
              selectedStationId={selectedStationId}
              onStationSelect={onStationSelect}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
