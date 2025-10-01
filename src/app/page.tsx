import React from "react";
import HeroServer from "@/components/HeroServer";
import HeroClient from "@/components/HeroClient";
import { ThemeSwitch } from "@/components/ui/theme-switch"; // direct import of client component

export default function Page() {
  return (
    <main className="relative">
      <HeroServer />
      <HeroClient />
      {/* rest of page */}
    </main>
  );
}
