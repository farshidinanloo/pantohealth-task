"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStations } from "./api";

export function useStations() {
  return useQuery({
    queryKey: ["stations"],
    queryFn: fetchStations,
  });
}
