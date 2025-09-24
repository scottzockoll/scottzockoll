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
  timeOverride?: 'night' | 'sleepy' | 'day';
}

export default function TimeAwareGoofe({
  width = 300,
  height = 300,
  alt = "Goofe in bed",
  className,
  animate = false,
  animationSpeed = 6,
  forceSleepy = false,
  timeOverride
}: TimeAwareGoofeProps) {
  const [goofeState, setGoofeState] = useState<'awake' | 'sleepy' | 'reading'>('awake');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (forceSleepy) {
      setGoofeState('sleepy');
    } else if (timeOverride) {
      // Use time override for testing
      switch (timeOverride) {
        case 'night':
          setGoofeState('reading');
          break;
        case 'sleepy':
          setGoofeState('sleepy');
          break;
        case 'day':
          setGoofeState('awake');
          break;
      }
    } else {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 20 || hour < 4) {
        // 8pm to 4am: Night time reading
        setGoofeState('reading');
      } else if (hour < 8) {
        // 4am to 8am: Tired/sleepy
        setGoofeState('sleepy');
      } else {
        // 8am to 8pm: Awake
        setGoofeState('awake');
      }
    }
  }, [forceSleepy, timeOverride]);

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

  const getGoofeImage = () => {
    switch (goofeState) {
      case 'reading':
        return { src: "/goofe-in-bed-with-book.svg", alt: "Goofe reading in bed" };
      case 'sleepy':
        return { src: "/sleepy-goofe-in-bed.svg", alt: "Sleepy goofe in bed" };
      case 'awake':
      default:
        return { src: "/goofe-in-bed.svg", alt: alt };
    }
  };

  const { src, alt: imageAlt } = getGoofeImage();

  return (
    <Image
      src={src}
      alt={imageAlt}
      width={width}
      height={height}
      className={imageClassName}
      style={animationStyle}
      priority
    />
  );
}