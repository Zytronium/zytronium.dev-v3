import React from "react";
import HeroServer from "@/components/HeroServer";
import HeroClient from "@/components/HeroClient";
import BorderGlideAutosize from "@/components/BorderGlideAutosize";
import BackgroundVenom from "@/components/BackgroundVenom";
import ProfileSection from "@/components/ProfileSection";
import BackgroundMeteors from "@/components/ui/backgroundmeteors";
import LustreText from "@/components/ui/lustretext";

export default function Page() {
  return (
    <main className="relative">
      <BackgroundVenom />
      <HeroServer />
      <HeroClient />
      <div className="py-8">
        <BorderGlideAutosize>
          <ProfileSection />
          {/*<PortfolioSection />*/}
          {/*<ContactSection />*/}
        </BorderGlideAutosize>
      </div>
      <BackgroundMeteors />
      {/*<Footer />*/}
    </main>
  );
}