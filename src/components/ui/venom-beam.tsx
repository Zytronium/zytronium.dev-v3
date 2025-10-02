// src/components/ui/venom-beam.tsx
"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

interface VenomBeamProps {
  children?: React.ReactNode;
  className?: string;
}

/*
  VenomBeam — tuned:
  - Light-mode particles: brighter purple (but still darker than background)
  - Dark-mode particles: slightly lighter
  - Lines: form from further away and a touch thicker
  - Theme-aware via next-themes `useTheme`
  - Preserves DPR, reduced-motion, pause when offscreen/hidden, pointer-events-none
*/
const VenomBeam: React.FC<VenomBeamProps> = ({ children, className = "" }) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme ?? "light";

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isRunningRef = useRef(true);
  const resizeTimeoutRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  // Canvas background matched to theme (keeps CSS gradient visible)
  const canvasStyle = useMemo<React.CSSProperties>(() => {
    if (theme === "dark") {
      return {
        backgroundImage: "var(--canvas-backgroundImage-dark)",
        backgroundColor: "var(--canvas-backgroundColor-dark)",
      } as React.CSSProperties;
    }
    // Light theme: slightly dim steel-blue -> subtle purple tint (kept light-ish)
    return {
      backgroundImage: "var(--canvas-backgroundImage-light)",
      backgroundColor: "var(--canvas-backgroundColor-light)",
    } as React.CSSProperties;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme === "dark";

    let dpr = Math.max(1, window.devicePixelRatio || 1);

    // Slightly adjusted density/size/opacities to make particles visible in both themes.
    const particlesPer100k = 12;
    const createParticlesForArea = (width: number, height: number) => {
      const cssArea = width * height;
      const count = Math.round((cssArea / 100000) * particlesPer100k);
      const list: Particle[] = [];
      for (let i = 0; i < count; i++) {
        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isDark ? 1.4 : 1.1),
          vy: (Math.random() - 0.5) * (isDark ? 1.4 : 1.1),
          life: Math.random() * 100,
          maxLife: Math.random() * 220 + 60,
          // Slightly larger in light mode so the darker purple is visible
          size: Math.random() * 2 + 1.2,
          // light mode base opacity remains high so darker purple reads; dark mode slightly lighter
          opacity: Math.random() * (isDark ? 0.75 : 0.15) + (isDark ? 0.15 : 0.35),
        });
      }
      return list;
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.max(1, window.devicePixelRatio || 1);

      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particlesRef.current = createParticlesForArea(rect.width, rect.height);
    };

    resizeCanvas();

    const onWindowResize = () => {
      if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = window.setTimeout(() => resizeCanvas(), 120);
    };
    window.addEventListener("resize", onWindowResize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener(
      "touchmove",
      (e: TouchEvent) => {
        if (e.touches && e.touches[0]) {
          mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      },
      { passive: true }
    );

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      particlesRef.current.slice(0, 80).forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = `rgba(255,230,255,${p.opacity * 0.75})`; // slightly lighter in dark
        } else {
          ctx.fillStyle = `rgba(35,20,60,${p.opacity * 0.95})`; // dark purple-ish for light
        }
        ctx.fill();
      });
      isRunningRef.current = false;
      return () => {
        window.removeEventListener("resize", onWindowResize);
        window.removeEventListener("mousemove", onMouseMove);
      };
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        isRunningRef.current = false;
      } else if (!isRunningRef.current) {
        isRunningRef.current = true;
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
              animationRef.current = null;
            }
            isRunningRef.current = false;
          } else if (!isRunningRef.current) {
            isRunningRef.current = true;
            animate();
          }
        });
      },
      { threshold: 0.05 }
    );
    observerRef.current.observe(canvas);

    // ANIMATION LOOP
    const animate = () => {
      if (!canvas || !ctx) return;
      animationRef.current = requestAnimationFrame(animate);

      const cssW = canvas.width / dpr;
      const cssH = canvas.height / dpr;

      // leave the canvas transparent so CSS background shows through
      ctx.clearRect(0, 0, cssW, cssH);

      const particles = particlesRef.current;

      // update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;

        if (dist < 160) {
          const force = (160 - dist) / 160;
          p.vx += (dx / dist) * force * 0.06;
          p.vy += (dy / dist) * force * 0.06;
        }

        p.vx *= 0.985;
        p.vy *= 0.985;

        if (p.x < 0) {
          p.x = 0;
          p.vx *= -0.6;
        } else if (p.x > cssW) {
          p.x = cssW;
          p.vx *= -0.6;
        }
        if (p.y < 0) {
          p.y = 0;
          p.vy *= -0.6;
        } else if (p.y > cssH) {
          p.y = cssH;
          p.vy *= -0.6;
        }

        if (p.life > p.maxLife) {
          p.x = Math.random() * cssW;
          p.y = Math.random() * cssH;
          p.vx = (Math.random() - 0.5) * (isDark ? 1.2 : 1.0);
          p.vy = (Math.random() - 0.5) * (isDark ? 1.2 : 1.0);
          p.life = 0;
          p.maxLife = Math.random() * 220 + 60;
        }

        const alpha = p.opacity * (1 - p.life / p.maxLife);

        // Particle gradients:
        // Light mode: darker-than-background BUT now a brighter purple (not black)
        // Dark mode: slightly lighter purple than before
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(3, p.size * 3));
        if (isDark) {
          // bright/purple but slightly lighter than previous
          grad.addColorStop(0, `rgba(255,235,255,${alpha * 1.0})`); // inner: bright
          grad.addColorStop(0.45, `rgba(210,140,255,${alpha * 0.95})`); // mid: lighter purple
          grad.addColorStop(1, `rgba(110,40,120,${alpha * 0.14})`); // rim
        } else {
          // LIGHT MODE particles: brighter purple but still darker than background
          grad.addColorStop(0, `rgba(70,36,110,${Math.min(1, alpha * 1.0)})`);   // deeper purple center
          grad.addColorStop(0.45, `rgba(95,55,150,${Math.min(1, alpha * 0.95)})`); // mid: brighter violet
          grad.addColorStop(1, `rgba(120,95,170,${alpha * 0.08})`);                // faint outer glow
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // CONNECTING LINES: further away and a bit thicker
      // Increase maxConnectDist multiplier so lines form from further away
      const baseMax = Math.min(220, Math.max(90, (cssW + cssH) / 26)); // increased reach
      const maxConnectDist = baseMax * 1.15; // a touch more distance
      for (let i = 0; i < particles.length; i++) {
        const pa = particles[i];
        for (let j = i + 1; j < Math.min(particles.length, i + 14); j++) {
          const pb = particles[j];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxConnectDist) {
            const raw = 1 - dist / maxConnectDist;
            const lineAlpha = clamp(raw * 0.45 * pa.opacity * pb.opacity, 0, 1);

            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);

            if (isDark) {
              ctx.strokeStyle = `rgba(180,110,255,${lineAlpha * 0.9})`; // slightly lighter purple lines
            } else {
              ctx.strokeStyle = `rgba(40,38,54,${lineAlpha * 0.95})`; // dark purple-ish lines for light mode
            }
            // a little thicker now
            ctx.lineWidth = isDark ? 0.7 : 0.9;
            ctx.stroke();
          }
        }
      }
    };

    // start
    isRunningRef.current = true;
    animate();

    // cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current);
        resizeTimeoutRef.current = null;
      }
    };
    // re-run when theme changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={canvasStyle} />

      {/* dark-only overlay so light mode stays clean */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block bg-gradient-to-b from-transparent via-black/12 to-black/60" />

      <div className={`absolute inset-0 z-10 ${className}`}>{children}</div>

      <div className="absolute top-20 left-10 w-2 h-2 rounded-full animate-pulse opacity-60 pointer-events-none" style={{ backgroundColor: "#7c5bff" }} />
      <div className="absolute top-40 right-20 w-1 h-1 rounded-full animate-pulse opacity-40 pointer-events-none" style={{ backgroundColor: "#6b4bff" }} />
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 rounded-full animate-pulse opacity-50 pointer-events-none" style={{ backgroundColor: "#6f57ff" }} />
      <div className="absolute bottom-20 right-1/3 w-1 h-1 rounded-full animate-pulse opacity-30 pointer-events-none" style={{ backgroundColor: "#5e3fff" }} />
    </div>
  );
};

export default VenomBeam;
