"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import TimeAwareGoofe from "./components/TimeAwareGoofe";
import TimeAwareWindow from "./components/TimeAwareWindow";
import RainAudio from "./components/RainAudio";

export default function Home() {
  const [isRainPlaying, setIsRainPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);

  return (
    <div className={styles.page}>
      <div className={styles.scene}>
        <TimeAwareWindow
          width={475}
          height={544}
          className={styles.window}
          showRain={isRainPlaying}
          timeOverride={undefined}
        />
        <TimeAwareGoofe
          width={1200}
          height={900}
          className={styles.goofe}
          animate
          animationSpeed={6}
          forceSleepy={false}
          timeOverride={undefined}
        />
        <RainAudio isPlaying={isRainPlaying} volume={volume} />

        <div className={styles.rainControls}>
          <button
            className={styles.playButton}
            onClick={() => setIsRainPlaying(!isRainPlaying)}
          >
            {isRainPlaying ? (
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="4" height="16" fill="black"/>
                <rect x="14" y="4" width="4" height="16" fill="black"/>
              </svg>
            ) : (
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                <polygon points="5,3 19,12 5,21" fill="black"/>
              </svg>
            )}
          </button>

          <div className={styles.volumeControl}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className={styles.volumeSlider}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
