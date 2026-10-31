// Kids mode content: six topics of picture words. Pictures are Twemoji SVGs in public/kids/pic/ (named by code point).
// Every Bengali word here also appears in the grown-up vocabulary; run `npx tsx scripts/check-kids.ts` to check.
export type KidWord = { id: string; bn: string; ro: string; en: string; pic: string };
export type KidTopic = { id: string; bn: string; ro: string; en: string; pic: string; tone: string; words: KidWord[] };

const w = (id: string, bn: string, ro: string, en: string, pic: string): KidWord => ({ id, bn, ro, en, pic });

export const KID_TOPICS: KidTopic[] = [
  { id: "hello", bn: "নমস্কার", ro: "namaskar", en: "Hello", pic: "1f44b", tone: "coral", words: [
    w("namaskar", "নমস্কার", "namaskar", "hello", "1f44b"),
    w("dhonnobad", "ধন্যবাদ", "dhonnobad", "thank you", "1f64f"),
    w("hyan", "হ্যাঁ", "hyan", "yes", "2705"),
    w("na", "না", "na", "no", "274c"),
    w("doya-kore", "দয়া করে", "doya kore", "please", "1f97a"),
    w("bhalo", "ভালো", "bhalo", "good", "1f44c"),
  ] },
  { id: "colours", bn: "রং", ro: "rong", en: "Colors", pic: "1f3a8", tone: "violet", words: [
    w("lal", "লাল", "lal", "red", "1f534"),
    w("nil", "নীল", "nil", "blue", "1f535"),
    w("holud", "হলুদ", "holud", "yellow", "1f7e1"),
    w("sobuj", "সবুজ", "sobuj", "green", "1f7e2"),
    w("kalo", "কালো", "kalo", "black", "26ab"),
    w("sada", "সাদা", "sada", "white", "26aa"),
  ] },
  { id: "animals", bn: "পশুপাখি", ro: "poshupakhi", en: "Animals", pic: "1f436", tone: "amber", words: [
    w("kukur", "কুকুর", "kukur", "dog", "1f436"),
    w("biral", "বিড়াল", "biral", "cat", "1f431"),
    w("goru", "গরু", "goru", "cow", "1f42e"),
    w("hati", "হাতি", "hati", "elephant", "1f418"),
    w("mach", "মাছ", "mach", "fish", "1f41f"),
    w("pakhi", "পাখি", "pakhi", "bird", "1f426"),
  ] },
  { id: "body", bn: "আমার শরীর", ro: "amar shorir", en: "My body", pic: "1f9d2", tone: "teal", words: [
    w("matha", "মাথা", "matha", "head", "1f642"),
    w("chokh", "চোখ", "chokh", "eye", "1f441"),
    w("nak", "নাক", "nak", "nose", "1f443"),
    w("mukh", "মুখ", "mukh", "mouth", "1f444"),
    w("kan", "কান", "kan", "ear", "1f442"),
    w("hat", "হাত", "hat", "hand", "1f590"),
  ] },
  { id: "numbers", bn: "সংখ্যা", ro: "shonkhya", en: "Numbers", pic: "1f522", tone: "blue", words: [
    w("ek", "এক", "ek", "one", "31-20e3"),
    w("dui", "দুই", "dui", "two", "32-20e3"),
    w("tin", "তিন", "tin", "three", "33-20e3"),
    w("char", "চার", "char", "four", "34-20e3"),
    w("panch", "পাঁচ", "panch", "five", "35-20e3"),
    w("chhoy", "ছয়", "chhoy", "six", "36-20e3"),
  ] },
  { id: "family", bn: "পরিবার", ro: "poribar", en: "Family", pic: "1f468-200d-1f469-200d-1f467", tone: "rose", words: [
    w("ma", "মা", "ma", "mother", "1f469"),
    w("baba", "বাবা", "baba", "father", "1f468"),
    w("bhai", "ভাই", "bhai", "brother", "1f466"),
    w("didi", "দিদি", "didi", "older sister", "1f467"),
    w("thakuma", "ঠাকুমা", "thakuma", "grandmother", "1f475"),
    w("dadu", "দাদু", "dadu", "grandfather", "1f474"),
  ] },
];

export const getKidTopic = (id: string) => KID_TOPICS.find((t) => t.id === id);
