// Shared rules for the landing page motion. Client only.

/** True when the visitor asked their system for less motion. */
export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let decided: boolean | undefined;
/**
 * True the first time in a visit (a browser tab session), false after that. The answer is worked out once per page
 * load, so every part of the page agrees. If storage is blocked we simply play the motion.
 */
export function firstPlay(): boolean {
  if (decided !== undefined) return decided;
  try {
    if (sessionStorage.getItem("bp_lp_motion")) decided = false;
    else { sessionStorage.setItem("bp_lp_motion", "1"); decided = true; }
  } catch {
    decided = true;
  }
  return decided;
}

/** Should the page's own entrance motion run? */
export const motionAllowed = () => !prefersReducedMotion() && firstPlay();
