"use client";
import React, {useEffect, useRef} from "react";
import {AnimatedButton} from "@/components/ui/animated-button";
import VenomBeam from "@/components/ui/venom-beam";
import { Sun, Moon, Laptop } from "lucide-react";
import {ThemeSwitch} from "@/components/ui/theme-switch";


export default function Home() {
    const beamWrapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const root = beamWrapRef.current;
        if (!root) return;

        // locate the canvas that VenomBeam creates
        const canvas = root.querySelector("canvas") as HTMLCanvasElement | null;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // keep originals so we can restore on cleanup
        const originalFillRect = (ctx as any).fillRect.bind(ctx);

        // pick your background color here:
        const DESIRED_BG = "rgba(12, 24, 56, 1)"; // <- change this

        // override fillRect to swap out the component's background fills
        (ctx as any).fillRect = function (x: number, y: number, w: number, h: number) {
            try {
                const fs = String(this.fillStyle).replace(/\s+/g, "");
                // detect the component's solid or semi-transparent "background" fills
                // (covers: "#000000", "#f8f8ff", "rgba(0,0,0,0.05)", "rgba(248,248,255,0.1)", etc.)
                const isComponentBg =
                    /(^#000000|^black|rgba?\(0,0,0(,0?\.?\d+)?\))/i.test(fs) ||
                    /(^#f8f8ff|^white|rgba?\(248,248,255(,0?\.?\d+)?\))/i.test(fs) ||
                    fs.includes("rgba(0,0,0,0.05)") ||
                    fs.includes("rgba(248,248,255,0.1)") ||
                    fs.includes("248,248,255") ||
                    fs.includes("0,0,0,0.05");

                if (isComponentBg) {
                    // draw our chosen background instead of the component's
                    this.save();
                    this.fillStyle = DESIRED_BG;
                    originalFillRect(x, y, w, h);
                    this.restore();
                    return;
                }
            } catch (e) {
                // if anything goes wrong, fall back to original behavior
            }
            // otherwise behave normally
            return originalFillRect(x, y, w, h);
        };

        // cleanup: restore original
        return () => {
            try {
                (ctx as any).fillRect = originalFillRect;
            } catch {
            }
        };
    }, []);

    return (
        <div ref={beamWrapRef} className="min-h-screen">
            <VenomBeam className="flex items-center w-full flex-col px-4">


                <div className="flex flex-row justify-around w-full backdrop-blur-sm rounded-xl bg-dark-translucent shadow-md shadow-dark-translucent-2 p-2">

                    <AnimatedButton
                        className="bg-purple-500 text-white"
                        variant="default"
                        size="default"
                        glow={true}
                        textEffect="normal"
                        uppercase={true}
                        rounded="custom"
                        asChild={false}
                        hideAnimations={false}
                        shimmerColor="#7300cb"
                        shimmerSize="0.15em"
                        shimmerDuration="3s"
                        borderRadius="100px"
                        background="rgba(0, 0, 0, 1)"
                    >
                        ScrollX UI
                    </AnimatedButton>
                    <ThemeSwitch
                        variant="icon-click"
                        modes={["light", "dark", "system"]}
                        icons={[
                            <Sun key="sun-icon" size={16} />,
                            <Moon key="moon-icon" size={16} />,
                            <Laptop key="laptop-icon" size={16} />,
                        ]}
                        showInactiveIcons="all"
                    />
                </div>
                <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-5xl lg:text-7xl font-sans pb-1 md:pb-2 pt-2 md:pt-4 relative z-20 font-bold tracking-tight leading-tight">
                    Hello World!
                </h2>
                <p className="max-w-xl mx-auto text-base md:text-lg text-neutral-700 dark:text-neutral-400 text-center mt-1 mb-4">
                    I&#39;m Zytronium
                </p>
            </VenomBeam>
        </div>
    );
}
