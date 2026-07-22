const WAITLIST_ENDPOINT =
  process.env.NEXT_PUBLIC_WAITLIST_FORM_ENDPOINT ??
  "https://script.google.com/macros/s/AKfycbzo4SWAhaOkHEyzr7Tb9JllMb4nReaNcdAMnszSZGxTIPRKkqaW8lKzk5hpZVRYjMMIjA/exec";

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function getReferralParam() {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("ref")?.trim() ?? "";
}

/** Posts to the Gini Google Apps Script endpoint (same sheet as gini.health waitlist). */
export async function submitWaitlistSignup({
  email,
  ref,
}: {
  email: string;
  ref?: string;
}) {
  if (!WAITLIST_ENDPOINT) {
    throw new Error("Waitlist endpoint is not configured.");
  }

  const payload = new URLSearchParams({
    email: email.trim().toLowerCase(),
    ref: ref ?? "",
    ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
  });

  await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    body: payload,
  });
}
