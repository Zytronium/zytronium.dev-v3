"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const VenomBeam = dynamic(() => import("@/components/ui/venom-beam"), { ssr: false });

// Respect prefers-reduced-motion and pause when not visible
export default function HeroClient() {
  useEffect(() => {
    // nothing to do here — venom-beam handles pausing if it's implemented correctly
  }, []);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme ?? "dark";

  const buttonBg = theme === "light" ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)";
  const buttonTextClass = theme === "light" ? "text-neutral-900" : "text-white";
  const containerTextClass = theme === "light" ? "text-neutral-900" : "text-neutral-400";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10"
      style={{ top: 0, left: 0 }}
    >
      <VenomBeam className="w-full h-full">

        <div className="flex flex-row justify-around w-full backdrop-blur-sm rounded-xl bg-dark-translucent shadow-md shadow-dark-translucent-2 p-2">
          <AnimatedButton
            className={`${buttonTextClass}`}
            variant="default"
            size="default"
            glow
            textEffect="normal"
            uppercase
            rounded="custom"
            hideAnimations={false}
            shimmerColor={theme === "light" ? "#c48fff" : "#7300cb"}
            shimmerSize="0.15em"
            shimmerDuration="3s"
            borderRadius="100px"
            background={buttonBg}
          >
            ScrollX UI
          </AnimatedButton>

          <ThemeSwitch
            variant="icon-click"
            modes={["light", "dark", "system"]}
            icons={[
              <Sun key="sun" size={16} />,
              <Moon key="moon" size={16} />,
              <Laptop key="laptop" size={16} />,
            ]}
            showInactiveIcons="all"
          />
        </div>

        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-5xl lg:text-7xl font-sans pb-1 md:pb-2 pt-2 md:pt-4 relative z-20 font-bold tracking-tight leading-tight">
          Hello World!
        </h2>

        <p className={`max-w-xl mx-auto text-base md:text-lg text-center mt-1 mb-4 ${containerTextClass}`}>
          I&apos;m Zytronium
        </p>
      </VenomBeam>
    </div>
  );
}
