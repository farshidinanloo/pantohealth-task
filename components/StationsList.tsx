"use client";

import { AnimatePresence, motion } from "motion/react";
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
    <motion.ul className="flex max-h-[320px] flex-col gap-1 overflow-y-auto rounded-lg border border-zinc-200 bg-white p-2" role="list" layout>
      <AnimatePresence mode="wait" initial={false}>
        {stations.length === 0 ? (
          <motion.li
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-4 text-center text-sm text-zinc-500"
          >
            No stations match the filter.
          </motion.li>
        ) : (
          stations.map((station, index) => (
            <motion.li
              key={station.id}
              layout
              initial={{ opacity: 0}}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0}}
              transition={{
                duration: 0.25,
                ease: "easeOut",
                delay: stations.length > 3 ? 0 : index * 0.1,
              }}
            >
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
            </motion.li>
          ))
        )}
      </AnimatePresence>
    </motion.ul>
  );
}
