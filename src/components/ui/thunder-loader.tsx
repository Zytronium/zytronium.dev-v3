"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const thunderLoaderVariants = cva("inline-block overflow-visible", {
  variants: {
    size: {
      xs: "w-6 h-6",
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
      xl: "w-20 h-20",
      "2xl": "w-26 h-28",
      "3xl": "w-34 h-34",
      "4xl": "w-42 h-42",
    },
    variant: {
      default: "",
      electric: "",
      fire: "",
      ice: "",
      rainbow: "",
      subtle: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

interface ThunderLoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof thunderLoaderVariants> {
  fillColor?: string;
  glowColor?: string;
  baseColor?: string;
  strokeWidth?: number;
  showGlow?: boolean;
  showFill?: boolean;
  animate?: boolean | "thunder";
  customPath?: string;
}

const variantColors = {
  default: { shimmer: "#60a5fa", glow: "#3b82f6", base: "#1e40af" },
  fire: { shimmer: "#fbbf24", glow: "#f59e0b", base: "#d97706" },
  electric: { shimmer: "#fb7185", glow: "#f43f5e", base: "#e11d48" },
  ice: { shimmer: "#67e8f9", glow: "#06b6d4", base: "#0891b2" },
  rainbow: { shimmer: "#a855f7", glow: "#8b5cf6", base: "#7c3aed" },
  subtle: { shimmer: "#94a3b8", glow: "#64748b", base: "#475569" },
};

const defaultThunderPath =
  "M50 10 L 35 45 L 55 45 L 40 70 L 70 35 L 50 35 L 65 10 Z";

const ThunderLoader = React.forwardRef<HTMLDivElement, ThunderLoaderProps>(
  (
    {
      className,
      size,
      variant = "default",
      fillColor,
      glowColor,
      baseColor,
      strokeWidth = 2,
      showGlow = false,
      showFill = false,
      animate = "thunder",
      customPath,
      ...props
    },
    ref
  ) => {
    const colors = variantColors[variant] || variantColors.default;
    const finalFillColor = fillColor || colors.shimmer;
    const finalGlowColor = glowColor || colors.glow;
    const finalBaseColor = baseColor || colors.base;
    const thunderPath = customPath || defaultThunderPath;

    const __uid = React.useId();
    const safeId = __uid.replace(/[:]/g, "-");
    const gradientId = `thunder-gradient-${safeId}`;
    const filterId = `thunder-filter-${safeId}`;

    return (
      <div
        ref={ref}
        className={cn(thunderLoaderVariants({ size, variant }), className)}
        {...props}
      >
        <style>
          {`
          @keyframes dash-${safeId} {
            0% { stroke-dashoffset: 200; }
            50% { stroke-dashoffset: -200; }
            100% { stroke-dashoffset: 200; }
          }
          @keyframes glow-${safeId} {
            0%,100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          `}
        </style>
        <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
          <defs>
            {showFill && (
              <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={finalFillColor} stopOpacity="0.7" />
                <stop offset="100%" stopColor={finalFillColor} stopOpacity="0.1" />
              </linearGradient>
            )}
            {showGlow && (
              <filter
                id={filterId}
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )}
          </defs>

          {showGlow && (
            <path
              d={thunderPath}
              stroke={finalGlowColor}
              strokeWidth={strokeWidth + 1}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#${filterId})`}
              style={{ animation: `glow-${safeId} 3s infinite` }}
            />
          )}

          <path
            d={thunderPath}
            stroke={finalBaseColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={200}
            strokeDashoffset={200}
            style={{ animation: `dash-${safeId} 2s linear infinite` }}
          />

          {showFill && (
            <path
              d={thunderPath}
              fill={`url(#${gradientId})`}
              stroke="none"
            />
          )}
        </svg>
      </div>
    );
  }
);

ThunderLoader.displayName = "ThunderLoader";

export { ThunderLoader, thunderLoaderVariants, type ThunderLoaderProps };
