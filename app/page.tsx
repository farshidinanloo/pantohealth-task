import { Suspense } from "react";
import { Home } from "./container";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-500">Loading…</div>}>
      <Home />
    </Suspense>
  );
}