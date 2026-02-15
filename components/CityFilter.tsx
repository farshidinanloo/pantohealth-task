"use client";

interface CityFilterProps {
  cities: string[];
  value: string;
  onChange: (city: string) => void;
  disabled?: boolean;
}

export function CityFilter({ cities, value, onChange, disabled }: CityFilterProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="city-filter" className="text-sm font-medium text-zinc-700">
        Filter by city
      </label>
      <select
        id="city-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:bg-zinc-100"
      >
        <option value="">All cities</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}
