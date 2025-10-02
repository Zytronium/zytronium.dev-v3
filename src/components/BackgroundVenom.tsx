"use client";

import dynamic from "next/dynamic";
import React from "react";

const VenomBeam = dynamic(() => import("@/components/ui/venom-beam"), {
  ssr: false,
});

export default function BackgroundVenom() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <VenomBeam className="w-full h-full" />
    </div>
  );
}
