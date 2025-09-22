"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./GoofeInBed.module.css";
import Rain from "./Rain";

interface TimeAwareWindowProps {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  showRain?: boolean;
}

export default function TimeAwareWindow({
  width = 200,
  height = 200,
  alt = "Window",
  className,
  showRain = false
}: TimeAwareWindowProps) {
  const [windowType, setWindowType] = useState("morning");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // For now, always use morning window
    // Later we can add time-based logic here
    setWindowType("morning");
  }, []);

  // Show morning window during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <Image
          src="/morning-window.svg"
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority
        />
        <Rain isActive={showRain} />
      </div>
    );
  }

  // For now, always show morning window
  const windowSrc = "/morning-window.svg";

  return (
    <>
      <Image
        src={windowSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority
      />
      {showRain && (
        <div
          className={className}
          style={{ zIndex: 10 }}>
          <Rain isActive={showRain} />
        </div>
      )}
    </>
  );
}