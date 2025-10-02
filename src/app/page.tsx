import React from "react";
import HeroServer from "@/components/HeroServer";
import HeroClient from "@/components/HeroClient";
import ParallaxCards from "@/components/ui/parallaxcards";

export default function Page() {
  return (
    <main className="relative">
      <HeroServer />
      <HeroClient />
    </main>
  );
}
