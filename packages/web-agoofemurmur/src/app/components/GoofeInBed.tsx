import Image from "next/image";
import styles from "./GoofeInBed.module.css";

interface GoofeInBedProps {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  animate?: boolean;
}

export default function GoofeInBed({
  width = 300,
  height = 300,
  alt = "Goofe in bed",
  className,
  animate = false
}: GoofeInBedProps) {
  const imageClassName = [
    className,
    animate ? styles.rocking : ""
  ].filter(Boolean).join(" ");

  return (
    <Image
      src="/goofe-in-bed.svg"
      alt={alt}
      width={width}
      height={height}
      className={imageClassName}
      priority
    />
  );
}