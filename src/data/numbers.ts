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

// Every number from 0 to 100. Bengali numbers up to 100 are all separate words, so they are learned one by one.
const CHART_RAW = `শূন্য shunyo|এক ek|দুই dui|তিন tin|চার char|পাঁচ panch|ছয় chhoy|সাত shat|আট aat|নয় noy|দশ dosh|
এগারো egaro|বারো baro|তেরো tero|চৌদ্দ choddo|পনেরো ponero|ষোলো sholo|সতেরো shotero|আঠারো atharo|উনিশ unish|বিশ bish|
একুশ ekush|বাইশ baish|তেইশ teish|চব্বিশ chobbish|পঁচিশ pochish|ছাব্বিশ chhabbish|সাতাশ shatash|আটাশ atash|ঊনত্রিশ unotrish|ত্রিশ trish|
একত্রিশ ekotrish|বত্রিশ bottrish|তেত্রিশ tettrish|চৌত্রিশ chouttrish|পঁয়ত্রিশ poytrish|ছত্রিশ chhottrish|সাঁইত্রিশ shaintrish|আটত্রিশ atotrish|ঊনচল্লিশ unochollish|চল্লিশ chollish|
একচল্লিশ ekchollish|বিয়াল্লিশ biyallish|তেতাল্লিশ tetallish|চুয়াল্লিশ chuyallish|পঁয়তাল্লিশ poytallish|ছেচল্লিশ chhechollish|সাতচল্লিশ shatchollish|আটচল্লিশ atchollish|ঊনপঞ্চাশ unoponchash|পঞ্চাশ ponchash|
একান্ন ekanno|বাহান্ন bahanno|তিপ্পান্ন tippanno|চুয়ান্ন chuanno|পঞ্চান্ন ponchanno|ছাপ্পান্ন chhappanno|সাতান্ন shatanno|আটান্ন atanno|ঊনষাট unoshat|ষাট shaat|
একষট্টি ekoshotti|বাষট্টি bashotti|তেষট্টি teshotti|চৌষট্টি choushotti|পঁয়ষট্টি poyshotti|ছেষট্টি chheshotti|সাতষট্টি shatshotti|আটষট্টি atshotti|ঊনসত্তর unoshottor|সত্তর shottor|
একাত্তর ekattor|বাহাত্তর bahattor|তিয়াত্তর tiyattor|চুয়াত্তর chuyattor|পঁচাত্তর pachattor|ছিয়াত্তর chhiyattor|সাতাত্তর shatattor|আটাত্তর atattor|ঊনআশি unoashi|আশি ashi|
একাশি ekashi|বিরাশি birashi|তিরাশি tirashi|চুরাশি churashi|পঁচাশি pachashi|ছিয়াশি chhiyashi|সাতাশি shatashi|অষ্টাশি oshtashi|ঊননব্বই unonobboi|নব্বই nobboi|
একানব্বই ekanobboi|বিরানব্বই biranobboi|তিরানব্বই tiranobboi|চুরানব্বই churanobboi|পঁচানব্বই pachanobboi|ছিয়ানব্বই chhiyanobboi|সাতানব্বই shatanobboi|আটানব্বই atanobboi|নিরানব্বই niranobboi|একশো eksho`;

export const NUMBER_CHART: { value: number; numeral: string; word: string; wrom: string }[] = CHART_RAW.split("|").map((x, value) => {
  const [word, wrom] = x.trim().split(" ");
  return { value, numeral: toBengaliDigits(value), word, wrom };
});

/** Bigger numbers, written the Indian way: thousand, lakh (100,000), crore (10,000,000). */
export const BIG_NUMBERS: [string, string, string, string][] = [
  ["১০০", "একশো", "eksho", "one hundred"],
  ["২০০", "দুইশো", "duisho", "two hundred"],
  ["৫০০", "পাঁচশো", "panchsho", "five hundred"],
  ["১,০০০", "এক হাজার", "ek hajar", "one thousand"],
  ["১০,০০০", "দশ হাজার", "dosh hajar", "ten thousand"],
  ["১,০০,০০০", "এক লাখ", "ek lakh", "one lakh (100,000)"],
  ["১০,০০,০০০", "দশ লাখ", "dosh lakh", "ten lakh (1 million)"],
  ["১,০০,০০,০০০", "এক কোটি", "ek koti", "one crore (10 million)"],
];

/** Things said when buying and paying. */
export const PRICE_PHRASES: [string, string, string][] = [
  ["এটার দাম কত?", "etar dam koto?", "How much is this?"],
  ["দশ টাকা।", "dosh taka.", "Ten taka."],
  ["একশো পঞ্চাশ টাকা কিলো।", "eksho ponchash taka kilo.", "150 taka a kilo."],
  ["একটু কম করুন।", "ektu kom korun.", "Please lower it a little."],
  ["ছাড় দেবেন?", "chhar deben?", "Will you give a discount?"],
  ["খুচরো আছে?", "khuchro achhe?", "Do you have change?"],
  ["আমার কাছে খুচরো নেই।", "amar kachhe khuchro nei.", "I do not have change."],
  ["রসিদ দেবেন?", "roshid deben?", "Could I have a receipt?"],
];
