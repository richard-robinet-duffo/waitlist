"use client";

import { useEffect, useRef, useState } from "react";

const HERO_VIDEOS = [
  "/verygoodhero1.mp4",
  "/verygoodhero2.mp4",
  "/verygoodhero3.mp4",
] as const;

export default function HeroVideoSequence() {
  const ref = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.src = HERO_VIDEOS[index];
    video.load();
    video.play().catch(() => {});
  }, [index]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      playsInline
      preload="auto"
      onEnded={() => setIndex((current) => (current + 1) % HERO_VIDEOS.length)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
