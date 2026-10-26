// Listening practice for the clinical path: things a patient may say. Written for this app: the Bengali needs the teacher's review.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.

/** What a patient says (Bengali, romanized) and what it means. */
export type PatientLine = [bn: string, ro: string, en: string];

export const PATIENT_LINES: PatientLine[] = [
  ["গিলতে একটু কষ্ট হয়।", "gilte ektu koshto hoy.", "It is a little hard to swallow."],
  ["জল খেলে কাশি পায়।", "jol khele kashi pay.", "I cough when I drink water."],
  ["গলায় কিছু আটকে যাচ্ছে।", "golay kichhu atke jachchhe.", "Something is stuck in my throat."],
  ["আমার গলা ব্যথা করছে।", "amar gola byatha korchhe.", "My throat hurts."],
  ["আমি জল খেতে ভয় পাচ্ছি।", "ami jol khete bhoy pachchhi.", "I am afraid to drink water."],
  ["আমার মুখে খাবার জমে থাকে।", "amar mukhe khabar jome thake.", "Food stays in my mouth."],
  ["আজ কত তারিখ, আমার মনে নেই।", "aj koto tarikh, amar mone nei.", "I do not remember today's date."],
  ["আমি তিনটে শব্দই ভুলে গেছি।", "ami tinte shobdoi bhule gechhi.", "I have forgotten all three words."],
  ["আমার মাথা গুলিয়ে যাচ্ছে।", "amar matha guliye jachchhe.", "My head is getting muddled."],
  ["আজকাল আমি সবকিছু ভুলে যাই।", "ajkal ami shobkichhu bhule jai.", "These days I forget everything."],
  ["কথা বলতে আমার কষ্ট হয়।", "kotha bolte amar koshto hoy.", "It is hard for me to speak."],
  ["আমি ঠিকমতো শুনতে পাই না।", "ami thikmoto shunte pai na.", "I cannot hear properly."],
  ["আমি বুঝতে পারিনি, আবার বলবেন?", "ami bujhte parini, abar bolben?", "I did not understand. Could you say it again?"],
  ["একটু আস্তে বলবেন?", "ektu aste bolben?", "Could you speak a little slower?"],
  ["আমার ক্লান্ত লাগছে।", "amar klanto lagchhe.", "I feel tired."],
  ["আমার বুকে ব্যথা করছে।", "amar buke byatha korchhe.", "My chest hurts."],
  ["আজ একটু ভালো লাগছে।", "aj ektu bhalo lagchhe.", "I am feeling a little better today."],
  ["আমার মেয়ে রোজ ফোন করে।", "amar meye roj phon kore.", "My daughter phones every day."],
  ["আমি একাই থাকি।", "ami ekai thaki.", "I live alone."],
  ["রাতে আমার ভালো ঘুম হয়নি।", "rate amar bhalo ghum hoyni.", "I did not sleep well last night."],
];
