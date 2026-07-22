"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { GlassEffect } from "@/components/ui/liquid-glass";
import {
  getReferralParam,
  isValidEmail,
  submitWaitlistSignup,
} from "@/lib/waitlist";

type JoinModalContextValue = {
  openJoinModal: () => void;
};

const JoinModalContext = createContext<JoinModalContextValue | null>(null);

export function useJoinModal() {
  const context = useContext(JoinModalContext);
  if (!context) {
    throw new Error("useJoinModal must be used within JoinModalProvider");
  }
  return context;
}

function JoinWaitlistDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setStatus("idle");
      setErrorMessage("");
    }
  }, [open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMessage("Please enter your email.");
      setStatus("error");
      return;
    }

    if (!isValidEmail(trimmed)) {
      setErrorMessage("That email doesn't look quite right.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await submitWaitlistSignup({
        email: trimmed,
        ref: getReferralParam(),
      });
      setStatus("success");
      window.setTimeout(onClose, 2200);
    } catch {
      setStatus("error");
      setErrorMessage("Network unavailable. Check your connection and try again.");
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/25 backdrop-blur-[3px]"
        aria-label="Close join form"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-modal-title"
      >
        <GlassEffect
          className="rounded-[28px] p-6 sm:p-8"
          contentClassName="flex w-full flex-col"
          style={{ cursor: "default", width: "100%" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900"
            aria-label="Close"
          >
            <span className="text-xl leading-none" aria-hidden>
              ×
            </span>
          </button>

          {status === "success" ? (
            <div className="px-8 py-4 text-center">
              <h2
                id="join-modal-title"
                className="text-[1.35rem] font-semibold tracking-[-0.03em] text-neutral-950"
              >
                You&apos;re on the list
              </h2>
              <p className="font-editorial mt-3 text-[clamp(1.05rem,3vw,1.25rem)] leading-snug italic text-neutral-700">
                We&apos;ll email you the moment your invite opens.
              </p>
            </div>
          ) : (
            <>
              <div className="px-8 text-center">
                <h2
                  id="join-modal-title"
                  className="text-[1.35rem] font-semibold tracking-[-0.03em] text-neutral-950"
                >
                  Join Now
                </h2>

                <p className="font-editorial mt-3 text-[clamp(1.15rem,3.5vw,1.45rem)] leading-snug italic text-neutral-700">
                  Get priority access the moment we open. No spam, ever.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label htmlFor="join-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="join-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === "error") {
                      setStatus("idle");
                      setErrorMessage("");
                    }
                  }}
                  placeholder="Email address"
                  disabled={status === "loading"}
                  aria-invalid={status === "error"}
                  className="w-full rounded-full border border-white/70 bg-white/35 px-4 py-3 text-[15px] text-neutral-950 outline-none backdrop-blur-sm transition-colors placeholder:text-neutral-500 focus:border-gini-accent/60 focus:bg-white/45 disabled:opacity-60"
                />

                {errorMessage ? (
                  <p className="text-center text-[13px] text-red-600" role="alert">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full border-0 bg-transparent p-0 disabled:opacity-70"
                >
                  <GlassEffect
                    className="w-full overflow-hidden rounded-full px-6 py-3"
                    contentClassName="w-full text-center text-[14px] font-semibold text-neutral-950"
                    style={{ cursor: "pointer", width: "100%" }}
                  >
                    {status === "loading" ? "Joining…" : "Join Now"}
                  </GlassEffect>
                </button>
              </form>
            </>
          )}
        </GlassEffect>
      </div>
    </div>,
    document.body
  );
}

export function JoinModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openJoinModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeJoinModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <JoinModalContext.Provider value={{ openJoinModal }}>
      {children}
      <JoinWaitlistDialog open={open} onClose={closeJoinModal} />
    </JoinModalContext.Provider>
  );
}
