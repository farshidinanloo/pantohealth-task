import type { Station } from "@/types/station";

export async function fetchStations(): Promise<Station[]> {
  const url = typeof window === "undefined" ? `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/stations` : "/api/stations";
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch stations");
  }
  return res.json();
}
