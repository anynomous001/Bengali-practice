// Listening stories: short stories to hear slowly, read with romanization if wanted, answer questions about, then read in English.
// Written for this app: the Bengali needs the teacher's review. Only import this from server code so the text is never in the public JS bundle.

export type StoryLine = { bn: string; ro: string; en: string };
export type StoryQuestion = {
  q: string;
  /** The right answer first; the screen shuffles them. */
  options: [right: string, ...wrong: string[]];
  /** Which line of the story answers it (1 is the first line). */
  line: number;
};
export type ListeningStory = {
  id: string;
  title: [bn: string, roman: string, en: string];
  /** A label for who the story is for, such as "Clinical". */
  tag: string;
  blurb: string;
  lines: StoryLine[];
  questions: StoryQuestion[];
};

export const LISTENING_STORIES: ListeningStory[] = [
  {
    id: "dipak-sen",
    title: ["দীপক সেনের গলা", "dipok sener gola", "Dipak Sen's voice"],
    tag: "Clinical",
    blurb: "A teacher with a hoarse voice visits a speech therapist, who checks his voice and his memory.",
    lines: [
      { bn: "আজ ক্লিনিকে একজন রোগী এসেছেন।", ro: "aj klinike ekjon rogi eshechhen.", en: "A patient has come to the clinic today." },
      { bn: "তাঁর নাম দীপক সেন।", ro: "tanr nam dipok shen.", en: "His name is Dipak Sen." },
      { bn: "তাঁর বয়স পঞ্চান্ন।", ro: "tanr boyosh ponchanno.", en: "He is fifty-five years old." },
      { bn: "তিনি স্ত্রীর সঙ্গে এসেছেন।", ro: "tini strir shonge eshechhen.", en: "He has come with his wife." },
      { bn: "দীপকবাবু একজন শিক্ষক।", ro: "dipokbabu ekjon shikkhok.", en: "Dipakbabu is a teacher." },
      { bn: "তিনি সারাদিন ক্লাসে কথা বলেন।", ro: "tini sharadin klase kotha bolen.", en: "He talks in class all day." },
      { bn: "দীপকবাবু বললেন, \"আমার গলা বসে গেছে। প্রায় এক মাস ধরে। কথা বললে গলায় ব্যথা করে।\"", ro: "dipokbabu bollen, \"amar gola bose gechhe. prai ek mash dhore. kotha bolle golay byatha kore.\"", en: "Dipakbabu said, \"My voice has become hoarse. For almost a month. My throat hurts when I talk.\"" },
      { bn: "থেরাপিস্ট জিজ্ঞেস করলেন, \"আপনি কি চা বেশি খান?\"", ro: "therapist jiggesh korlen, \"apni ki cha beshi khan?\"", en: "The therapist asked, \"Do you drink a lot of tea?\"" },
      { bn: "তিনি বললেন, \"হ্যাঁ, দিনে পাঁচ কাপ।\"", ro: "tini bollen, \"hyan, dine panch kap.\"", en: "He said, \"Yes, five cups a day.\"" },
      { bn: "থেরাপিস্ট বললেন, \"আ বলুন।\" দীপকবাবু \"আ\" বললেন।", ro: "therapist bollen, \"a bolun.\" dipokbabu \"a\" bollen.", en: "The therapist said, \"Say ah.\" Dipakbabu said, \"Ah.\"" },
      { bn: "তারপর থেরাপিস্ট বললেন, \"এবার আমি তিনটে শব্দ বলব। মন দিয়ে শুনুন। বই, ফুল, পাখি।\"", ro: "tarpor therapist bollen, \"ebar ami tinte shobdo bolbo. mon diye shunun. boi, phul, pakhi.\"", en: "Then the therapist said, \"Now I will say three words. Listen carefully. Book, flower, bird.\"" },
      { bn: "দীপকবাবু বললেন, \"বই, ফুল, পাখি।\"", ro: "dipokbabu bollen, \"boi, phul, pakhi.\"", en: "Dipakbabu said, \"Book, flower, bird.\"" },
      { bn: "থেরাপিস্ট বললেন, \"ঠিক! শব্দ তিনটে মনে রাখবেন। এখন এক থেকে পাঁচ পর্যন্ত গুনুন।\"", ro: "therapist bollen, \"thik! shobdo tinte mone rakhben. ekhon ek theke panch porjonto gunun.\"", en: "The therapist said, \"Right! Remember the three words. Now count from one to five.\"" },
      { bn: "দীপকবাবু ঠিক গুনলেন: এক, দুই, তিন, চার, পাঁচ।", ro: "dipokbabu thik gunlen: ek, dui, tin, char, panch.", en: "Dipakbabu counted correctly: one, two, three, four, five." },
      { bn: "থেরাপিস্ট জিজ্ঞেস করলেন, \"এবার বলুন, তিনটে শব্দ কী ছিল?\"", ro: "therapist jiggesh korlen, \"ebar bolun, tinte shobdo ki chhilo?\"", en: "The therapist asked, \"Now tell me, what were the three words?\"" },
      { bn: "দীপকবাবু বললেন, \"বই... পাখি... আর একটা কী যেন ছিল?\"", ro: "dipokbabu bollen, \"boi... pakhi... ar ekta ki jeno chhilo?\"", en: "Dipakbabu said, \"Book... bird... what was the other one?\"" },
      { bn: "থেরাপিস্ট বললেন, \"একটা শব্দ গাছে হয়।\"", ro: "therapist bollen, \"ekta shobdo gachhe hoy.\"", en: "The therapist said, \"One word grows on a tree.\"" },
      { bn: "দীপকবাবু হেসে বললেন, \"ফুল!\"", ro: "dipokbabu hese bollen, \"phul!\"", en: "Dipakbabu smiled and said, \"Flower!\"" },
      { bn: "থেরাপিস্ট বললেন, \"খুব ভালো! চিন্তা করবেন না। আস্তে কথা বলবেন। রোজ গরম জল খাবেন।\"", ro: "therapist bollen, \"khub bhalo! chinta korben na. aste kotha bolben. roj gorom jol khaben.\"", en: "The therapist said, \"Very good! Do not worry. Speak softly. Drink warm water every day.\"" },
      { bn: "দীপকবাবু হেসে বললেন, \"ধন্যবাদ।\"", ro: "dipokbabu hese bollen, \"dhonyobad.\"", en: "Dipakbabu smiled and said, \"Thank you.\"" },
    ],
    questions: [
      { q: "What is the patient's name?", options: ["Dipak Sen", "Dipak Basu", "Sudip Sen"], line: 2 },
      { q: "How old is he?", options: ["Fifty-five", "Forty-five", "Sixty-five"], line: 3 },
      { q: "Who came to the clinic with him?", options: ["His wife", "His son", "He came alone"], line: 4 },
      { q: "What is his job?", options: ["Teacher", "Doctor", "Driver"], line: 5 },
      { q: "What is wrong with his voice?", options: ["It has been hoarse for about a month", "He lost it yesterday", "It is too loud"], line: 7 },
      { q: "How many cups of tea does he drink a day?", options: ["Five", "Two", "Ten"], line: 9 },
      { q: "Which three words did the therapist say?", options: ["Book, flower, bird", "Book, fruit, bird", "Pen, flower, bird"], line: 11 },
      { q: "Which word did he forget?", options: ["Flower", "Book", "Bird"], line: 16 },
      { q: "What hint did the therapist give?", options: ["One word grows on a tree", "One word is an animal", "One word is a colour"], line: 17 },
      { q: "What advice did the therapist give him?", options: ["Speak softly and drink warm water every day", "Stop teaching", "Drink cold water"], line: 19 },
    ],
  },
];

export const getListeningStory = (id: string) => LISTENING_STORIES.find((s) => s.id === id);
