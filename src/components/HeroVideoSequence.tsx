"use client";

import { useEffect, useRef, useState } from "react";

const HERO_VIDEOS = [
  "/verygoodhero1.mp4",
  "/verygoodhero2.mp4",
  "/verygoodhero3.mp4",
] as const;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function HeroVideoSequence() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.src = HERO_VIDEOS[index];
    video.load();
    video.play().catch(() => {});
  }, [index, isMobile]);

  if (isMobile) {
    // Mobile: all three videos stacked and playing in parallel
    return (
      <div className="relative flex h-full w-full flex-col">
        {HERO_VIDEOS.map((src) => (
          <video
            key={src}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="min-h-0 w-full flex-1 object-cover"
          />
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black/15"
        />
      </div>
    );
  }

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
