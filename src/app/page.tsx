import React from "react";
import HeroServer from "@/components/HeroServer";
import HeroClient from "@/components/HeroClient";
import BorderGlideAutosize from "@/components/BorderGlideAutosize";
import BackgroundVenom from "@/components/BackgroundVenom";
import ProfileSection from "@/components/ProfileSection";
import BackgroundMeteors from "@/components/ui/backgroundmeteors";
import ProfileCard from "@/components/ui/profilecard";
import ZytroniumCard from "@/assets/ZytronumCard.png"
import GitHubIcon from "@/assets/icons/github.svg"
import BskyIcon from "@/assets/icons/bluesky.svg"
import DailyDevIcon from "@/assets/icons/dailydotdev.svg"
import YouTubeIcon from "@/assets/icons/youtube.svg"

export default function Page() {
  return (
    <main className="relative">
      <BackgroundVenom />
      <HeroServer />
      <HeroClient />
      <div className="py-8">
        <BorderGlideAutosize>
          <ProfileSection />
        </BorderGlideAutosize>

      </div>

      <BackgroundMeteors>
        <ProfileCard
          spotlight
          spotlightColor="116,106,255"
          img={ZytroniumCard.src}
          name="Zytronium"
          bio="A Software Engineer who loves web development, game development, and mobile app development."
          skills={[
            {
              name: "JavaScript",
              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            },
            {
              name: "TypeScript",
              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
            },
            {
              name: "Kotlin",
              icon: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Kotlin_icon_%282021-present%29.svg",
            },
            {
              name: "Python",
              icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
            },
            {
              name: "Rust",
              icon: "https://www.svgrepo.com/show/374056/rust.svg",
            },
            {
              name: "Next.js",
              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
            },
            {
              name: "React",
              icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            },
            {
              name: "TailwindCSS",
              icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
            }
          ]}
          socialLinks={[
            {
              name: "GitHub",
              url: "https://github.com/Zytronium",
              icon: GitHubIcon.src,
            },
            {
              name: "Daily.Dev",
              url: "https://app.daily.dev/zytronium",
              icon: DailyDevIcon.src,
            },
            {
              name: "BlueSky",
              url: "https://bsky.app/profile/zytronium.dev",
              icon: BskyIcon.src,
            },
            {
              name: "YouTube",
              url: "https://www.youtube.com/@Zytronium",
              icon: YouTubeIcon.src,
            }
          ]}
          position="Web Developer"
        />
        {/*<PortfolioSection />*/}
        {/*<ContactSection />*/}
      </BackgroundMeteors>
      {/*<Footer />*/}
    </main>
  );
}