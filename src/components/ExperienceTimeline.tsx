"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const TURQUOISE = "#00ced1";

const STEPS = [
  {
    number: "01",
    title: "Tell us your story.",
    body: "Share your history, symptoms, and goals so we start with the full picture.",
    video: "/ginistep1.mp4?v=2",
  },
  {
    number: "02",
    title: "Test at home, on rhythm.",
    body: "Collect blood from home and retest on a cadence that tracks how you actually change.",
    video: "/ginistep2.mp4",
  },
  {
    number: "03",
    title: "See the whole you.",
    body: "Connect your labs, history, and patterns into one holistic read of your health.",
    video: "/ginistep3.mp4?v=5",
  },
  {
    number: "04",
    title: "Personalize your insights.",
    body: "Shape guidance around your biology into daily steps toward your goals.",
    video: "/ginistep4.mp4?v=7",
  },
  {
    number: "05",
    title: "Walk in prepared.",
    body: "Arrive at every appointment with clarity, context, and the confidence to advocate for yourself.",
    video: "/ginistep5.mp4?v=2",
  },
] as const;

const WAVE_PATH =
  "M 200 0 C 80 90 320 180 200 270 C 80 360 320 450 200 540 C 80 630 320 720 200 810 C 80 900 320 990 200 1080";

/** Each step fades in as the wave reaches it — keep late steps early enough to read */
const REVEAL_SCHEDULE = [
  { start: 0.08, end: 0.14 },
  { start: 0.17, end: 0.23 },
  { start: 0.26, end: 0.32 },
  { start: 0.35, end: 0.41 },
  { start: 0.44, end: 0.5 },
] as const;

const TIMELINE_SCROLL_VH = 108;
const TIMELINE_SCROLL_VH_MOBILE = 138;
const LINE_END_PROGRESS = 0.58;

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

function StepVideo({ src, active }: { src: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;

    const play = () => {
      if (!active) return;
      video.play().catch(() => {});
    };

    if (active) {
      if (video.readyState >= 2) {
        play();
      } else {
        video.load();
        video.addEventListener("loadeddata", play, { once: true });
        video.addEventListener("canplay", play, { once: true });
      }
    } else {
      video.pause();
    }

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
    };
  }, [active, src]);

  return (
    <div className="relative h-[96px] w-[96px] shrink-0 overflow-hidden bg-gini-surface sm:h-[120px] sm:w-[120px] md:h-[140px] md:w-[140px] lg:h-[180px] lg:w-[180px]">
      <video
        key={src}
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

function Milestone({
  step,
  index,
  progress,
  isMobile,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
  isMobile: boolean;
}) {
  const revealStart = REVEAL_SCHEDULE[index].start;
  const revealEnd = REVEAL_SCHEDULE[index].end;

  const opacity = useTransform(progress, [revealStart, revealEnd], [0, 1]);
  const y = useTransform(progress, [revealStart, revealEnd], [18, 0]);

  const [active, setActive] = useState(false);

  useMotionValueEvent(progress, "change", (value) => {
    if (value >= revealStart) setActive(true);
  });

  useEffect(() => {
    if (progress.get() >= revealStart) setActive(true);
  }, [progress, revealStart]);

  const isLeft = index % 2 === 0;
  const topPercent = 6 + index * (isMobile ? 16 : 14.5);

  return (
    <motion.article
      style={{
        opacity,
        y,
        top: `${topPercent}%`,
        zIndex: 10 + index,
      }}
      className={[
        "absolute left-0 right-0 flex w-full items-center px-4 sm:px-8",
        isMobile
          ? "justify-center"
          : isLeft
            ? "justify-start pl-[4%] sm:pl-[6%]"
            : "justify-end pr-[4%] sm:pr-[6%]",
      ].join(" ")}
    >
      <div
        className={[
          "flex w-full max-w-[min(100%,560px)] items-center gap-3 sm:gap-6",
          isMobile
            ? "flex-col text-center"
            : isLeft
              ? "flex-row text-left"
              : "flex-row-reverse text-right",
        ].join(" ")}
      >
        <StepVideo src={step.video} active={active} />

        <div className="min-w-0 flex-1">
          <p
            className="mb-0.5 text-[10px] font-medium tracking-[0.18em] uppercase sm:text-[11px]"
            style={{ color: TURQUOISE }}
          >
            {step.number}
          </p>
          <h3 className="text-[clamp(0.95rem,4.5vw,1.35rem)] font-semibold leading-snug tracking-[-0.03em] text-neutral-950">
            {step.title}
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-neutral-500 sm:text-[14px]">
            {step.body}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function ExperienceTimeline() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.88", "end 0.05"],
  });

  const lineProgress = useTransform(
    scrollYProgress,
    [0, LINE_END_PROGRESS],
    [0, 1]
  );

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative scroll-mt-24 bg-gini-surface sm:scroll-mt-28"
      style={{
        height: `${isMobile ? TIMELINE_SCROLL_VH_MOBILE : TIMELINE_SCROLL_VH}vh`,
      }}
      aria-label="How Gini works"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden py-6 sm:py-10">
        <div className="relative mx-auto h-full w-full max-w-7xl px-1 sm:px-0">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-90 sm:opacity-100"
            viewBox="0 0 400 1080"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <motion.path
              d={WAVE_PATH}
              fill="none"
              stroke={TURQUOISE}
              strokeWidth={isMobile ? 2 : 2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: lineProgress }}
            />
          </svg>

          {STEPS.map((step, index) => (
            <Milestone
              key={step.number}
              step={step}
              index={index}
              progress={scrollYProgress}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
