import Image from "next/image";
import styles from "./GoofeInBed.module.css";

interface WindowProps {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  animate?: boolean;
  animationSpeed?: number;
}

export default function Window({
  width = 200,
  height = 200,
  alt = "Window",
  className,
  animate = false,
  animationSpeed = 10
}: WindowProps) {
  const animationStyle = animate
    ? { animationDuration: `${animationSpeed}s` }
    : {};

  const imageClassName = [
    className,
    animate ? styles.rockingReverse : ""
  ].filter(Boolean).join(" ");

  return (
    <Image
      src="/window.svg"
      alt={alt}
      width={width}
      height={height}
      className={imageClassName}
      style={animationStyle}
      priority
    />
  );
}