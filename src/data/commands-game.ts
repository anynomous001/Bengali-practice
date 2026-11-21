// "Drag & Match: Bengali Commands" (kids). One entry per command, so a new one can be added without touching the component.
// To add a command: see docs/commands-game.md (add a photo, an optional recording, and one line below).
// Server-only: the page reads this and passes it to the game as props.

export type CommandCard = {
  /** The file name stem: the photo is /assets/commands/<id>.webp and the recording /assets/audio/<id>.mp3 unless overridden. */
  id: string;
  bn: string;
  ro: string;
  en: string;
  /** What the photo shows, for screen readers. */
  alt: string;
  image?: string;
  audio?: string;
};

export const COMMANDS: CommandCard[] = [
  { id: "boso", bn: "বসো", ro: "boso", en: "Sit", alt: "A boy sitting on a chair" },
  { id: "darao", bn: "দাঁড়াও", ro: "darao", en: "Stand", alt: "A boy standing straight" },
  { id: "dekho", bn: "দেখো", ro: "dekho", en: "Look", alt: "A boy shading his eyes and looking into the distance" },
  { id: "shono", bn: "শোনো", ro: "shono", en: "Listen", alt: "A boy cupping his hand behind his ear to listen" },
  { id: "dao", bn: "দাও", ro: "dao", en: "Give", alt: "A boy holding out a red ball to give it" },
  { id: "nao", bn: "নাও", ro: "nao", en: "Take", alt: "A boy reaching to take a red ball from a hand" },
  { id: "lafao", bn: "লাফাও", ro: "lafao", en: "Jump", alt: "A boy jumping with his arms up" },
  { id: "thamo", bn: "থামো", ro: "thamo", en: "Stop", alt: "A boy holding up his hand to say stop" },
  { id: "hnato", bn: "হাঁটো", ro: "hnato", en: "Walk", alt: "A boy walking" },
  { id: "bolo", bn: "বলো", ro: "bolo", en: "Say, speak", alt: "A boy speaking with his hands open" },
];

export const ROUND_SIZES = [3, 5, 10] as const;
