"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Station } from "@/types/station";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const GERMANY_CENTER: L.LatLngExpression = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;
const MARKER_ZOOM = 14;

export interface UseStationMapParams {
  stations: Station[];
  selectedStationId: number | null;
  onStationSelect: (station: Station) => void;
}

export function useStationMap({ stations, selectedStationId, onStationSelect }: UseStationMapParams) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());

  // Init map once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const map = L.map("stations-map").setView(GERMANY_CENTER, DEFAULT_ZOOM);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  // Update markers when stations change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const prev = markersRef.current;
    prev.forEach((m) => m.remove());
    prev.clear();
    stations.forEach((station) => {
      const marker = L.marker([station.lat, station.lng], { icon: defaultIcon })
        .addTo(map)
        .on("click", () => onStationSelect(station));
      marker.bindTooltip(station.name, { permanent: false });
      prev.set(station.id, marker);
    });
  }, [stations, onStationSelect]);

  // Fly to selected station when selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || selectedStationId == null) return;
    const station = stations.find((s) => s.id === selectedStationId);
    if (station) {
      map.flyTo([station.lat, station.lng], MARKER_ZOOM, { duration: 0.5 });
      const marker = markersRef.current.get(station.id);
      if (marker) marker.openTooltip();
    }
  }, [selectedStationId, stations]);
}
