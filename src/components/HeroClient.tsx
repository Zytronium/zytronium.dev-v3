"use client";

import React, { useEffect } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import LustreText from "@/components/ui/lustretext";

export default function HeroClient() {
  useEffect(() => {
    // When this component is mounted on the client, remove #hero server fallback if present
    const heroSection = document.getElementById("hero");
    if (heroSection) heroSection.remove();
  }, []);

  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme ?? "dark";

  const buttonBg = theme === "light" ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)";
  const buttonTextClass = theme === "light" ? "text-neutral-900" : "text-white";

  // IMPORTANT: keep this wrapper position-relative and a higher z-index than the background
  return (
    <div className="relative z-20">
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
        <LustreText speed={6} variant={"2"} text="Hello World!" />
      </h2>
    </div>
  );
}
