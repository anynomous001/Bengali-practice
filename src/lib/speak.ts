/** Read Bengali text aloud with the browser's built-in voice (needs a bn voice installed). */
export function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "bn-BD";
  u.rate = 0.8;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
