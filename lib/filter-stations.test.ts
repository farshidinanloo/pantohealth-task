import { describe, it, expect } from "vitest";
import type { Station } from "@/types/station";
import { filterStationsByCity } from "./filter-stations";

describe("filterStationsByCity", () => {
  const stations: Station[] = [
    { id: 1, name: "Berlin Hbf", city: "Berlin", lat: 52.5251, lng: 13.3694 },
    { id: 2, name: "Berlin Ostbahnhof", city: "Berlin", lat: 52.5108, lng: 13.4348 },
    { id: 4, name: "Hamburg Hbf", city: "Hamburg", lat: 53.553, lng: 10.0067 },
  ];

  it("returns all stations when city is empty string", () => {
    expect(filterStationsByCity(stations, "")).toEqual(stations);
  });

  it("returns all stations when city is whitespace only", () => {
    expect(filterStationsByCity(stations, "   ")).toEqual(stations);
  });

  it("returns only stations in the given city", () => {
    const result = filterStationsByCity(stations, "Berlin");
    expect(result).toHaveLength(2);
    expect(result.every((s) => s.city === "Berlin")).toBe(true);
  });

  it("returns empty array when no station matches city", () => {
    expect(filterStationsByCity(stations, "Munich")).toEqual([]);
  });
});
