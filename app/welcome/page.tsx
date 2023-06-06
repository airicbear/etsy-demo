"use client";

import { useSearchParams } from "next/navigation";

export default function WelcomePage() {
  const searchParams = useSearchParams();

  return (
    <main>
      <h1>Etsy Demo: Welcome, {searchParams.get("first_name")}!</h1>
    </main>
  );
}
