import { ThunderLoader } from "@/components/ui/thunder-loader";
import React from "react";

export default function HeroServer() {
/*  const buttonBg = "rgba(0,0,0,1)";
  const buttonTextClass = "text-white";
  const containerTextClass = "text-neutral-400";*/

  return (
    <section id="hero" className="relative w-full">
      {/*<div className="flex flex-row justify-around w-full backdrop-blur-sm rounded-xl bg-dark-translucent shadow-md shadow-dark-translucent-2 p-2">
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
      </div>*/}

      {/*<h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-5xl lg:text-7xl font-sans pb-1 md:pb-2 pt-2 md:pt-4 relative z-20 font-bold tracking-tight leading-tight">
        Hello, World!
      </h2>*/}

      <div className="flex justify-center items-center mt-6 w-full">
        {/* Hydrated client component replaces this */}
        <ThunderLoader
          size="4xl"
          animate="thunder"
          showGlow={true}
          showFill={true}
        />
      </div>

    </section>
  );
}
