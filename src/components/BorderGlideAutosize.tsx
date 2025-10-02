// src/components/BorderGlideAutosize.tsx
"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { BorderGlide } from "@/components/ui/border-glide";
import BackgroundMeteors from "@/components/ui/backgroundmeteors";
import ProfileSection from "@/components/ProfileSection";

/**
 * Autosize wrapper for BorderGlide.
 *
 * Technique:
 * - Render an invisible, offscreen measurement node containing the same content (ProfileSection).
 * - Measure that node's height (ResizeObserver + rAF + image load handling).
 * - Apply measured height to a visible wrapper that contains BorderGlide (so BorderGlide's absolute children have a parent height).
 *
 * This avoids modifying BorderGlide internals and yields a stable height even when images/fonts load late.
 */

interface Props {
  className?: string;
  autoPlayInterval?: number;
  borderDuration?: number;
  borderColor?: string;
  borderWidth?: string;
  children?: ReactNode;
}

export default function BorderGlideAutosize({
                                              className,
                                              autoPlayInterval = 6000,
                                              borderDuration = 4000,
                                              borderColor = "radial-gradient(ellipse, #3b82f6, transparent)",
                                              borderWidth = "8rem",
                                              children,
                                            }: Props) {
  // measured height (px)
  const [heightPx, setHeightPx] = useState<number | null>(null);

  // refs
  const measureRef = useRef<HTMLDivElement | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const rafRef = useRef<number | null>(null);

  // desired width for measurement (must match visible container width)
  const desiredWidth = typeof window !== "undefined" ? Math.min(960, Math.round(window.innerWidth * 0.8)) : 960;

  useEffect(() => {
    const measureEl = measureRef.current;
    if (!measureEl) return;

    const measure = () => {
      // ensure we read layout after paint
      if (!measureRef.current) return;
      const bounds = measureRef.current.getBoundingClientRect();
      const h = Math.max(120, Math.ceil(bounds.height)); // clamp minimum
      setHeightPx(h);
    };

    // initial measure after one frame (let fonts/images start rendering)
    rafRef.current = requestAnimationFrame(() => {
      measure();
    });

    // observe size changes (e.g., images loaded or responsive text)
    roRef.current = new ResizeObserver(() => {
      measure();
    });
    roRef.current.observe(measureEl);

    // also watch for window resizes (width changes will affect wrapping and height)
    const onWin = () => {
      // update measurement element width to match new viewport 85vw clamped
      const w = Math.min(960, Math.round(window.innerWidth * 0.8));
      if (measureRef.current) measureRef.current.style.width = `${w}px`;
      // re-measure in next frame
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => measure());
    };
    window.addEventListener("resize", onWin);

    // images can load after initial paint — ensure we re-measure when they finish
    const imgs = Array.from(measureEl.querySelectorAll("img"));
    const imgListeners: { img: HTMLImageElement; handler: () => void }[] = [];
    imgs.forEach((img) => {
      if (img.complete) return;
      const handler = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => measure());
      };
      img.addEventListener("load", handler);
      img.addEventListener("error", handler);
      imgListeners.push({ img, handler });
    });

    return () => {
      if (roRef.current) roRef.current.disconnect();
      roRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onWin);
      imgListeners.forEach(({ img, handler }) => {
        img.removeEventListener("load", handler);
        img.removeEventListener("error", handler);
      });
    };
  }, [desiredWidth]);

  // wrapper style to give BorderGlide a real height & width
  const wrapperStyle: React.CSSProperties = {
    height: heightPx ? `${heightPx}px` : undefined,
    width: "85vw",
    maxWidth: "960px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <>
      {/* Invisible measurement node — same content as the visible slide.
          It must be in the DOM but removed from layout (left:-9999) so it doesn't affect page flow.
          We explicitly set its width to match the visible 85vw clamp. */}
      <div
        aria-hidden
        ref={measureRef}
        style={{
          position: "absolute",
          left: -99999,
          top: 0,
          visibility: "hidden",
          width: desiredWidth,
          pointerEvents: "none",
        }}
      >
        <ProfileSection />
      </div>

      {/* Visible wrapper: we set explicit height here so BorderGlide's absolute internals can layout correctly */}
      <div className={`mx-auto ${className ?? ""}`} style={{ maxWidth: "960px" }}>
        <div style={wrapperStyle} className="mx-auto">
          <BorderGlide
            className="mx-auto w-full h-full"
            autoPlayInterval={autoPlayInterval}
            borderDuration={borderDuration}
            borderColor={borderColor}
            borderWidth={borderWidth}
          >
            <BackgroundMeteors /* this should fill parent height (h-full behavior) */>
              {/* Place the real content here; BorderGlide will show this as the slide */}
              { children }
            </BackgroundMeteors>
          </BorderGlide>
        </div>
      </div>
    </>
  );
}
