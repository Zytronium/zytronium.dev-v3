// src/components/ProfileSection.tsx
import React from "react";
import {
  BorderGlideCard,
  BorderGlideContent
} from "@/components/ui/border-glide";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileSection() {
  return (
    // This is the *content* that will be the child of BorderGlide (now provided in page.tsx)
      <BorderGlideContent
        className="flex flex-col h-full justify-between p-6 text-center space-y-4">
        <div className="flex flex-col items-center gap-2">
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
                <span>Zytronium</span>
              </div>
            </div>
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8" />
          <div>
            <p>
              Welcome to my personal developer website! I&apos;m Zytronium, a
              passionate developer from Oklahoma who loves programming,
              aerospace, and gaming. This site serves as a home base for my
              projects, experiments, and developer identity.
            </p>
          </div>
        </div>
      </BorderGlideContent>
  );
}
