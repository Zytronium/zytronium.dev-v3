// src/components/ProfileSection.tsx
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LustreText from "@/components/ui/lustretext";
import { Badge } from "@/components/ui/badge";
import Flexbox from "@/components/Flexbox";

export default function ProfileSection() {
  return (
    <>
      <Avatar className="w-48 h-48 border-2 border-primary">
        <AvatarImage
          src={"https://zytronium.dev/images/zytronium_dev_logo.png"}
          alt={"Zytronium"} />
        <AvatarFallback>{"Z"}</AvatarFallback>
      </Avatar>
      <h2
        className="relative z-20 text-center font-bold text-black dark:text-white font-sans tracking-tight text-[clamp(1.5rem,5vw,6rem)]"
      >
        <div
          className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div
            className="absolute font-[Xolonium] left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-cyan-300 via-indigo-500 to-fuchsia-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span>Zytronium</span>
          </div>
          <div
            className="relative font-[Xolonium] bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-cyan-300 via-indigo-500 to-fuchsia-500 py-4">
            <span><LustreText speed={3} variant={2} text="Zytronium" /></span>
          </div>
        </div>
      </h2>

      <Badge bgColor="#ff6555" fgColor="white" shiny={true}>
        Web Developer
      </Badge>
      <div
        className="relative max-w-3xl mt-4 mb-3 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
        style={{
          boxShadow:
            "rgb(168, 85, 247) 0px 0px 20px, rgba(168, 85, 247, 0.6) 0px 0px 40px, rgba(168, 85, 247, 0.4) 0px 0px 60px",
          width: "80%",
          opacity: 1,
        }}
      >
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-full h-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)",
            filter: "blur(15px)",
            opacity: 1,
          }}
          />
      </div>
      <Flexbox className="gap-2 mb-4" justify="center" wrap>

        <Badge bgColor="var(--color-silver)" fgColor="#111529" shiny={true}>
          React
        </Badge>

        <Badge bgColor="#1c1c1c" fgColor="white" shiny={true}>
        Next.js
          </Badge>

          <Badge bgColor="#f7ba1e" fgColor="#343434" shiny={true}>
            JavaScript
          </Badge>

          <Badge bgColor="#0ea5e9" fgColor="white" shiny={true}>
            TypeScript
          </Badge>

          <Badge bgColor="#bae5f8" fgColor="#0f172a" shiny={true}>
            TailwindCSS
          </Badge>

        </Flexbox>
        <p className="px-4 sm:px-12 md:px-18 lg:px-32">
          Welcome to my personal developer website! I&apos;m Zytronium, a
          passionate developer from Oklahoma who loves programming,
          aerospace, and gaming. This site serves as a home base for my
          projects, experiments, and developer identity.
        </p>
    </>
  );
}
