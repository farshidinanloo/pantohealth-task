# PANTOhealth — German train stations

## Tech stack

- **React** (Next.js 16 App Router)
- **TypeScript**
- **Leaflet** + **react-leaflet** for the map
- **TanStack Query** for API calls and caching
- **Tailwind CSS** for styling

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev` — Start development server
- `pnpm build` — Production build
- `pnpm start` — Start production server
- `pnpm test` — Run tests (Vitest)
- `pnpm test:watch` — Run tests in watch mode
- `pnpm lint` — Run ESLint

## API

The app uses an internal API route at `/api/stations` that returns the list of German train stations (id, name, city, lat, lng).

## Demo (Vercel)
[Link](https://pantohealth-task.vercel.app/).


## Project structure

- `app/` — Next.js App Router (layout, page, API route, providers)
- `components/` — React components (StationsMap, StationsList, CityFilter)
- `lib/` — API client, TanStack Query hook, filter utility
- `types/` — TypeScript types (Station)
