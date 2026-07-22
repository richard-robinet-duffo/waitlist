"use client";

import HeroVideoSequence from "@/components/HeroVideoSequence";
import GlassNav from "@/components/GlassNav";
import {
  JoinModalProvider,
  useJoinModal,
} from "@/components/JoinWaitlistModal";
import {
  GlassButton,
  GlassFilter,
} from "@/components/ui/liquid-glass";
import { TextScramble } from "@/components/ui/text-scramble";
import { TypewriterLoop } from "@/components/ui/typewriter-loop";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import FaqAccordion from "@/components/FaqAccordion";
import ManifestoStats from "@/components/ManifestoStats";

const FRAGMENTED_SYSTEM = [
  "See your OB-GYN.",
  "See an endocrinologist.",
  "See a fertility specialist.",
  "Come back in three months.",
  "Try this pill first. Track it. Wait. Repeat.",
] as const;

const SECTION =
  "scroll-mt-24 border-t border-neutral-200/80 py-12 sm:scroll-mt-28 sm:py-16";
const SECTION_INNER = "mx-auto max-w-[38rem] px-5 sm:px-6";
const SECTION_LABEL =
  "font-editorial text-center text-[clamp(1.2rem,2.8vw,1.65rem)] italic text-gini-accent";
const SECTION_TITLE =
  "mt-3 text-center text-[clamp(1.75rem,3.5vw,2.45rem)] leading-[1.15] tracking-[-0.03em] text-pretty";
const SECTION_BODY =
  "mt-4 text-[16px] leading-[1.7] text-neutral-500 sm:text-[17px] text-pretty";

function GiniLandingContent() {
  const { openJoinModal } = useJoinModal();

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-gini-surface text-neutral-950">
      <GlassFilter />
      <GlassNav />

      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <HeroVideoSequence />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <div className="flex w-full justify-center overflow-x-hidden px-1">
            <TextScramble
              as="h1"
              singleLine
              duration={2.1}
              speed={0.05}
              characterSet="abcdefghijklmnopqrstuvwxyz0123456789' "
              className="max-w-full text-[clamp(1.2rem,6.5vw,4rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-white lowercase drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)]"
            >
              women&apos;s health deciphered
            </TextScramble>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)] sm:mt-8 sm:text-[17px]">
            Your assistant for navigating your health, connecting hormones, biomarkers, energy,
            and longevity in one clear picture.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <GlassButton
              onClick={openJoinModal}
              className="!rounded-full"
              contentClassName="text-[14px] font-semibold text-white"
            >
              Join Now
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Typewriter */}
      <section className="relative flex min-h-[100svh] items-center justify-center px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-5xl text-center">
          <p className="text-[clamp(1.35rem,6vw,3.25rem)] leading-[1.25] font-semibold tracking-[-0.03em] text-neutral-950 sm:leading-[1.2]">
            what you&apos;re feeling is not{" "}
            <TypewriterLoop className="mt-1 block text-[#00ced1] sm:mt-0 sm:inline" />
          </p>
        </div>
      </section>

      <ManifestoStats />

      <ExperienceTimeline />

      {/* About / Manifesto */}
      <section id="about" className={`${SECTION} pt-4 sm:pt-6`}>
        <div className={SECTION_INNER}>
          <p className={SECTION_LABEL}>Why this matters</p>
          <h2 className={SECTION_TITLE}>
            <span className="font-semibold">Women&apos;s health should not take </span>
            <span className="font-editorial text-[1.08em] italic text-gini-accent">
              years to understand.
            </span>
          </h2>
          <p className={`${SECTION_BODY} text-center`}>
            It is not one appointment, one lab result, one symptom, or one doctor.
            Yet that is how the system still works.
          </p>
          <p className={SECTION_BODY}>
            A woman feels off. She is tired. Her cycle changes, her skin changes,
            her weight changes. Her pain gets worse. Her mood shifts.{" "}
            <span className="font-editorial text-[1.12em] italic text-neutral-800">
              Her body is trying to say something.
            </span>{" "}
            The system answers with fragments.
          </p>
          <ul className="mx-auto mt-6 max-w-md space-y-2.5 border-l-2 border-gini-accent/40 pl-5">
            {FRAGMENTED_SYSTEM.map((item) => (
              <li
                key={item}
                className="text-[15px] leading-relaxed text-neutral-600 sm:text-[16px]"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className={`${SECTION_BODY} text-center`}>
            And still, too often, no one sees the full picture.{" "}
            <span className="font-semibold text-neutral-900">
              This is not rare. This is routine.
            </span>
          </p>
        </div>
      </section>

      {/* Science */}
      <section id="science" className={SECTION}>
        <div className={SECTION_INNER}>
          <p className={SECTION_LABEL}>The science gap</p>
          <h2 className={SECTION_TITLE}>
            <span className="font-semibold">Women&apos;s health is connected.</span>{" "}
            <span className="font-editorial text-[1.06em] italic text-gini-accent">
              Care should be too.
            </span>
          </h2>
          <p className={SECTION_BODY}>
            PCOS affects an estimated{" "}
            <span className="font-semibold text-gini-accent">10–13%</span> of
            reproductive-age women, and up to{" "}
            <span className="font-semibold text-gini-accent">70%</span> may still
            be undiagnosed. Nearly half see at least three professionals before
            they get an answer, and one in three wait more than two years.
          </p>
          <p className={SECTION_BODY}>
            Endometriosis affects about 1 in 10 women. Diagnosis can take 5.4 to
            11.4 years. That is{" "}
            <span className="font-editorial italic text-neutral-800">
              years of pain, years of doubt, years of second-guessing your own body.
            </span>
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200/80 bg-white/50 p-5 text-center sm:text-left">
              <p className="font-editorial text-[1.85rem] italic leading-none text-gini-accent">
                10–13%
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-neutral-500 sm:text-[15px]">
                of reproductive-age women affected by PCOS, with up to 70% still
                undiagnosed
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200/80 bg-white/50 p-5 text-center sm:text-left">
              <p className="font-editorial text-[1.85rem] italic leading-none text-gini-accent">
                3+ doctors
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-neutral-500 sm:text-[15px]">
                Nearly half of women see at least three professionals before
                getting an answer
              </p>
            </div>
          </div>

          <blockquote className="mt-8 text-center">
            <p className="font-editorial mx-auto max-w-[34rem] text-[clamp(1.15rem,2.4vw,1.5rem)] leading-snug italic text-neutral-800 text-pretty">
              The cycle is a vital sign. Hormones do not stay in one lane. Pain
              does not stay in one lane. Metabolism does not stay in one lane.
              Fertility does not stay in one lane.{" "}
              <span className="text-gini-accent">
                So care should not stay in one lane either.
              </span>
            </p>
          </blockquote>
        </div>
      </section>

      {/* Mission / Insights */}
      <section id="insights" className={SECTION}>
        <div className={SECTION_INNER}>
          <p className={SECTION_LABEL}>What we are building</p>
          <h2 className={SECTION_TITLE}>
            <span className="font-editorial text-[1.05em] italic text-gini-accent">
              The case conference
            </span>{" "}
            <span className="font-semibold">for women&apos;s health.</span>
          </h2>
          <p className={SECTION_BODY}>
            Gini is the comprehensive layer for women&apos;s health. Where blood
            work is only the beginning. Where your cycle matters. Your symptoms
            matter. Your sleep, your temperature, your heart rate, your history.
            What one doctor wrote last year should still matter this year.
          </p>
          <p className={SECTION_BODY}>
            In oncology, the hardest cases are reviewed by specialists together.
            Women&apos;s health deserves that same standard. Gini is built to
            be the connective tissue between symptoms, signals, and specialists,
            where{" "}
            <span className="font-editorial italic text-neutral-800">
              data becomes context, and context becomes action.
            </span>
          </p>
          <p className={`${SECTION_BODY} text-center`}>
            Not more noise. Not more self-diagnosis. Not more tabs open at 2
            a.m.{" "}
            <span className="font-semibold text-neutral-900">
              A clearer path. A smarter starting point. A better handoff.
            </span>{" "}
            <span className="font-editorial italic text-gini-accent">
              A faster route to the right care.
            </span>
          </p>
        </div>
      </section>

      <FaqAccordion />

      {/* Contact */}
      <section id="contact" className={SECTION}>
        <div className={`${SECTION_INNER} text-center`}>
          <h2 className="text-[clamp(1.65rem,3.5vw,2rem)] font-semibold tracking-[-0.03em] text-pretty">
            Clarity, continuity, and care that sees the whole body.
          </h2>
          <p className={`${SECTION_BODY} mx-auto max-w-[32rem]`}>
            We are building Gini to shorten the road to answers, reduce the
            number of times women have to start over, and make women&apos;s
            health feel less like a maze and more like medicine.
          </p>
          <p className="mt-3 text-[16px] text-neutral-500 sm:text-[17px]">
            Questions, partnerships, or press?{" "}
            <a
              href="mailto:hello@gini.health"
              className="font-medium text-neutral-950 underline-offset-4 hover:underline"
            >
              hello@gini.health
            </a>
          </p>
        </div>
      </section>

      {/* Join */}
      <section
        id="join"
        className={`${SECTION} pb-20 sm:pb-24`}
      >
        <div className={`${SECTION_INNER} text-center`}>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.45rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-pretty">
            Women&apos;s health should not take years to understand.
          </h2>
          <p className={`${SECTION_BODY} mx-auto max-w-[32rem]`}>
            We are here to change that. Get early access to Gini and be first to
            experience a smarter, connected path through your health.
          </p>
          <div className="mt-8 flex justify-center bg-gini-surface">
            <button
              type="button"
              onClick={openJoinModal}
              className="inline-block max-w-[min(100%,260px)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] sm:max-w-[300px]"
              aria-label="Join Now"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gini-join-button.png?v=5"
                alt="Join Now"
                className="h-auto w-full select-none"
                draggable={false}
              />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function GiniLandingPage() {
  return (
    <JoinModalProvider>
      <GiniLandingContent />
    </JoinModalProvider>
  );
}
