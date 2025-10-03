import React from "react";

interface LustreTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  variant?: number;
  className?: string;
}

const LustreText: React.FC<LustreTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  variant = 1,
  className = "",
}) => {
  const animationStyle = {
    animationDuration: `${variant === 1 ? speed : speed * 4}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationFillMode: "forwards",
  };

  return (
    <span
      className={`
    lustre-text
    ${!disabled ? `${variant === 1 ? "animate-shine" : `animate-shine-${variant}`}` : ""}
    ${variant === 1 ? "lustre-dark" : `lustre-${variant}`}
    ${className}
  `}
      style={!disabled ? animationStyle : undefined}
    >
      {text}
    </span>
  );
};

export default LustreText;
