"use client";

import { useEffect, useRef, useState } from "react";

interface RainAudioProps {
  isPlaying?: boolean;
  volume?: number;
}

export default function RainAudio({
  isPlaying = false,
  volume = 0.5
}: RainAudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      setIsLoading(false);
      console.log("Rain audio ready to play");
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      console.log("Started loading rain audio in background");
    };

    const handleEnded = () => {
      // Seamless loop by immediately restarting
      audio.currentTime = 0;
      if (isPlaying) {
        audio.play().catch(console.error);
      }
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('ended', handleEnded);

    // Start background download after a short delay to let UI render first
    const startBackgroundLoad = setTimeout(() => {
      audio.load();
    }, 1000);

    return () => {
      clearTimeout(startBackgroundLoad);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    audio.volume = Math.max(0, Math.min(1, volume));

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, volume, isLoaded]);

  return (
    <audio
      ref={audioRef}
      preload="none"
      style={{ display: 'none' }}
    >
      <source src="/rain_2s_crossfade.wav" type="audio/wav" />
      Your browser does not support the audio element.
    </audio>
  );
}