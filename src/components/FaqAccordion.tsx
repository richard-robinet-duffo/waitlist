"use client";

const FAQ_ITEMS = [
  {
    q: "What is Gini?",
    a: "Gini is the comprehensive layer for women's health. A place where blood work is only the beginning, and your cycle, symptoms, sleep, history, and specialist notes finally live in one connected picture.",
  },
  {
    q: "Who is Gini for?",
    a: "The woman who is tired of stitching the system together herself. The woman who has been told to wait, told it is normal, and knows it is not.",
  },
  {
    q: "How is this different from tracking apps?",
    a: "Women do not need one more app that tracks one more thing. Gini turns scattered signals into one living health picture and helps good clinicians move earlier with more context.",
  },
  {
    q: "Is my data private?",
    a: "The privacy bar has to be high, because women's health data is deeply personal. Your story is not lost, and your data is respected.",
  },
] as const;

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="h-4 w-4 shrink-0 text-neutral-400"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FaqAccordion() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-neutral-200/80 py-12 sm:scroll-mt-28 sm:py-16"
    >
      <div className="mx-auto max-w-[38rem] px-5 sm:px-6">
        <h2 className="text-center text-[clamp(1.5rem,3vw,1.85rem)] font-semibold tracking-[-0.03em]">
          FAQ
        </h2>
        <div className="mt-6 divide-y divide-neutral-200/80 border-y border-neutral-200/80">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[16px] font-semibold text-neutral-950 transition-colors hover:text-black sm:text-[17px] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="transition-transform duration-200 group-open:rotate-180">
                  <ChevronIcon />
                </span>
              </summary>
              <p className="pb-4 text-[15px] leading-[1.7] text-neutral-500 sm:text-[16px]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
