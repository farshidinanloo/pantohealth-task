"use client";

import { useCityFilter } from "./use-city-filter";

interface CityFilterProps {
  cities: string[];
  value: string;
  onChange: (city: string) => void;
  disabled?: boolean;
}

export function CityFilter({ cities, value, onChange, disabled }: CityFilterProps) {
  const { open, setOpen, query, setQuery, filtered, close, inputRef, containerRef } = useCityFilter(cities);

  const displayLabel = value || "All cities";

  return (
    <div className="flex flex-col gap-1" ref={containerRef}>
      <label htmlFor="city-filter" className="text-sm font-medium text-zinc-700">
        Filter by city
      </label>
      <div className="relative">
        <button
          id="city-filter"
          type="button"
          onClick={() => !disabled && setOpen((o) => !o)}
          disabled={disabled}
          className="flex w-full items-center justify-between rounded-lg border border-zinc-300 bg-white py-2 pl-3 pr-2 text-left text-zinc-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:bg-zinc-100"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label="Filter by city"
        >
          <span className="truncate">{displayLabel}</span>
          <svg
            className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div
            className="absolute top-full left-0 z-10 mt-1 w-full rounded-lg border border-zinc-200 bg-white py-1 shadow-lg"
            role="listbox"
          >
            <div className="border-b border-zinc-100 px-2 pb-2">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cities..."
                className="w-full rounded border border-zinc-200 py-1.5 px-2 text-sm text-zinc-900 placeholder:text-zinc-400  focus:outline-none focus:ring-1 focus:ring-amber-500"
                role="combobox"
                aria-autocomplete="list"
                aria-controls="city-list"
                aria-expanded={open}
              />
            </div>
            <ul id="city-list" className="max-h-48 overflow-y-auto py-1" role="listbox">
              <li
                role="option"
                aria-selected={value === ""}
                onClick={() => {
                  onChange("");
                  close();
                }}
                className={`cursor-pointer px-3 py-2 text-sm text-zinc-700 hover:bg-amber-50 ${value === "" ? "bg-amber-100" : ""}`}
              >
                All cities
              </li>
              {filtered.map((city) => (
                <li
                  key={city}
                  role="option"
                  aria-selected={value === city}
                  onClick={() => {
                    onChange(city);
                    close();
                  }}
                  className={`cursor-pointer px-3 py-2 text-sm text-zinc-700 hover:bg-amber-50 ${value === city ? "bg-amber-100" : ""}`}
                >
                  {city}
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-3 py-4 text-center text-sm text-zinc-500">No cities match your search</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
