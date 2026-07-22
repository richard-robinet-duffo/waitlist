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
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    refs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index, isMobile]);

  if (isMobile) {
    // Mobile: all three videos stacked and playing in parallel.
    // Lighter -mobile encodes + poster frames so the hero paints instantly.
    return (
      <div className="relative flex h-full w-full flex-col">
        {HERO_VIDEOS.map((src) => (
          <video
            key={src}
            src={src.replace(".mp4", "-mobile.mp4")}
            poster={src.replace(".mp4", "-poster.jpg")}
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

  // Desktop: keep all three videos mounted and preloaded, crossfade between
  // them so the loop never flashes a blank frame while the next one loads
  return (
    <div className="absolute inset-0">
      {HERO_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={src}
          autoPlay={i === 0}
          muted
          playsInline
          preload="auto"
          onEnded={() => setIndex((current) => (current + 1) % HERO_VIDEOS.length)}
          className={[
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            i === index ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
