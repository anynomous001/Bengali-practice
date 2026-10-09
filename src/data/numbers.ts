const DIGITS = "০১২৩৪৫৬৭৮৯";
export const toBengaliDigits = (n: number) => String(n).replace(/\d/g, (d) => DIGITS[Number(d)]);

export type Num = { value: number; numeral: string; word: string; wrom: string };

// Round values only: Bengali numbers 21-99 are irregular, so they are left for later.
const RAW: [number, string, string][] = [
  [1, "এক", "ek"], [2, "দুই", "dui"], [3, "তিন", "tin"], [4, "চার", "char"], [5, "পাঁচ", "panch"],
  [6, "ছয়", "chhoy"], [7, "সাত", "shat"], [8, "আট", "aat"], [9, "নয়", "noy"], [10, "দশ", "dosh"],
  [11, "এগারো", "egaro"], [12, "বারো", "baro"], [13, "তেরো", "tero"], [14, "চৌদ্দ", "choddo"], [15, "পনেরো", "ponero"],
  [16, "ষোলো", "sholo"], [17, "সতেরো", "shotero"], [18, "আঠারো", "atharo"], [19, "উনিশ", "unish"], [20, "বিশ", "bish"],
  [30, "ত্রিশ", "trish"], [40, "চল্লিশ", "challish"], [50, "পঞ্চাশ", "ponchash"], [60, "ষাট", "shaat"],
  [70, "সত্তর", "sottor"], [80, "আশি", "ashi"], [90, "নব্বই", "nobboi"],
  [100, "একশো", "eksho"], [200, "দুইশো", "duisho"], [500, "পাঁচশো", "panchsho"], [1000, "এক হাজার", "ek hajar"],
];

export const NUMBERS: Num[] = RAW.map(([value, word, wrom]) => ({ value, numeral: toBengaliDigits(value), word, wrom }));
