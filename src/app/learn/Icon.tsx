const PATHS: Record<string, string> = {
  home: "M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  reading: "M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z",
  speaking: "M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z M19 11a7 7 0 0 1-14 0 M12 18v4 M8 22h8",
  writing: "M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  grammar: "m12 2 9 5-9 5-9-5z M3 12l9 5 9-5 M3 17l9 5 9-5",
  vocabulary: "M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z M9 8h6 M9 12h6",
  arrow: "M5 12h14 M13 5l7 7-7 7",
  back: "M19 12H5 M11 5l-7 7 7 7",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  shield: "M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z M9 12l2 2 4-4",
  close: "M6 6l12 12 M18 6L6 18",
  check: "M4 12l5 5L20 6",
  cards: "M3 7h13v13H3z M8 3h13v13",
  sound: "M11 5 6 9H2v6h4l5 4z M15.5 8.5a5 5 0 0 1 0 7 M19 5a10 10 0 0 1 0 14",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  system: "M3 4h18v12H3z M8 20h8 M12 16v4",
  done: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M8 12.5l3 3 5-6",
  circle: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
  list: "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  chevron: "M6 9l6 6 6-6",
  play: "M7 4l13 8-13 8z",
  lock: "M6 11h12v10H6z M8 11V7a4 4 0 0 1 8 0v4",
};

export type IconName = keyof typeof PATHS;

export default function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <path d={PATHS[name]} />
    </svg>
  );
}
