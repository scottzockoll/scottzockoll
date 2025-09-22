"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./GoofeInBed.module.css";

interface TimeAwareGoofeProps {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  animate?: boolean;
  animationSpeed?: number;
  forceSleepy?: boolean;
}

export default function TimeAwareGoofe({
  width = 300,
  height = 300,
  alt = "Goofe in bed",
  className,
  animate = false,
  animationSpeed = 6,
  forceSleepy = false
}: TimeAwareGoofeProps) {
  const [isSleepy, setIsSleepy] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (forceSleepy) {
      setIsSleepy(true);
    } else {
      const now = new Date();
      const hour = now.getHours();
      setIsSleepy(hour < 8);
    }
  }, [forceSleepy]);

  const animationStyle = animate
    ? { animationDuration: `${animationSpeed}s` }
    : {};

  const imageClassName = [
    className,
    animate ? styles.rocking : ""
  ].filter(Boolean).join(" ");

  // Show regular goofe during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <Image
        src="/goofe-in-bed.svg"
        alt={alt}
        width={width}
        height={height}
        className={imageClassName}
        style={animationStyle}
        priority
      />
    );
  }

  return (
    <Image
      src={isSleepy ? "/sleepy-goofe-in-bed.svg" : "/goofe-in-bed.svg"}
      alt={isSleepy ? "Sleepy Goofe in bed" : alt}
      width={width}
      height={height}
      className={imageClassName}
      style={animationStyle}
      priority
    />
  );
}