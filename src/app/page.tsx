import React from "react";
import HeroLoader from "@/components/HeroLoader";

export default function Page() {
    return (
        <main>
            <div id="hero-fallback" aria-hidden="true" className="min-h-[480px] w-full">
                {/* keep markup and sizing similar to client to avoid layout shift */}
                <div className="max-w-4xl mx-auto px-4 py-20">
                    <div className="flex items-start justify-start w-full mb-6">
                        <button className="rounded-full px-6 py-2 bg-neutral-900 text-white">ScrollX UI</button>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold pb-1">Hello World!</h1>
                    <p className="max-w-xl text-neutral-700 mt-1 mb-4">I&apos;m Zytronium</p>
                </div>
            </div>

            <HeroLoader />
        </main>
    );
}