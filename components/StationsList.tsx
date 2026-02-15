"use client";

import type { Station } from "@/types/station";

interface StationsListProps {
  stations: Station[];
  selectedStationId: number | null;
  onStationClick: (station: Station) => void;
  isLoading?: boolean;
}

export function StationsList({ stations, selectedStationId, onStationClick, isLoading }: StationsListProps) {
  if (isLoading) {
    return (
      <ul className="flex flex-col gap-1 rounded-lg border border-zinc-200 bg-white p-2" aria-busy="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="h-12 animate-pulse rounded bg-zinc-100" />
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex max-h-[320px] flex-col gap-1 overflow-y-auto rounded-lg border border-zinc-200 bg-white p-2" role="list">
      {stations.length === 0 ? (
        <li className="py-4 text-center text-sm text-zinc-500">No stations match the filter.</li>
      ) : (
        stations.map((station) => (
          <li key={station.id}>
            <button
              type="button"
              onClick={() => onStationClick(station)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedStationId === station.id
                  ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300"
                  : "text-zinc-800 hover:bg-zinc-100"
              }`}
            >
              <span className="font-medium">{station.name}</span>
              <span className="ml-2 text-zinc-500">{station.city}</span>
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
