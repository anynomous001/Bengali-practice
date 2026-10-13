// "Story relay": a two-person speaking game. Written for this app; the Bengali needs the teacher's review.
// Only import this from server code.
import type { L } from "./roleplay";
export type { L };

export type Theme = { id: string; title: string };
export type RelayOpening = { id: string; theme: string; lines: L[] };
export type Helper = { word: L; use: string; example: L };
export type Hook = { kind: string; use: string; example: L };
export type RelayCard = { id: string; word: L; tense: string; how: string; forms: string[]; examples: L[]; turn: L[] };

export const GLOSSARY: { term: string; meaning: string }[] = [
  { term: "Story relay", meaning: "Two people build one story together, like passing a baton. Nobody plans the story. You only answer what the other person just said." },
  { term: "Turn", meaning: "Your go. You say 2 or 3 sentences, then the other person says 2 or 3 sentences. Do 4 or 5 turns each." },
  { term: "Hook", meaning: "The last sentence of your turn. It leaves something open (a surprise, a problem, a question) so your partner has something to answer. Without a hook the story stops." },
  { term: "Helper words", meaning: "Small linking words (then, but, so, because...) that join your sentences. Keep them in front of you while you speak." },
  { term: "Tense card (Option B)", meaning: "A word on the board that tells you which tense your first sentence must use. Sentences 2 and 3 are free." },
  { term: "Wrap-up", meaning: "At the end, you retell the whole story in 4 or 5 sentences, then your partner retells it back, shorter." },
];

export const RULES: { n: string; title: string; text: string; tip: string }[] = [
  { n: "Sentence 1", title: "Continue", text: "Pick up exactly where the other person stopped.", tip: "Use what they said: a name, an object, a feeling." },
  { n: "Sentence 2", title: "Add a detail", text: "Give a name, a place, a feeling or a thing.", tip: "Make the story more real: who, where, how it felt." },
  { n: "Sentence 3 (optional)", title: "End on a hook", text: "Finish with a surprise or a problem.", tip: "Leave something open so your partner has something to answer." },
];

export const THEMES: Theme[] = [
  { id: "family", title: "Family and home" },
  { id: "market", title: "Market and food" },
  { id: "travel", title: "Travel and journeys" },
  { id: "work", title: "School and work" },
  { id: "mystery", title: "Surprise and mystery" },
  { id: "feelings", title: "Feelings and people" },
];

export const HELPERS: Helper[] = [
  { word: ["তারপর", "tarpor", "then"], use: "Move to the next thing that happened.", example: ["তারপর সে ঘরে ফিরল।", "tarpor se ghore phirlo.", "Then he returned home."] },
  { word: ["এরপর", "erpor", "after that"], use: "Like tarpor, a little more formal.", example: ["এরপর আমরা একসঙ্গে খেলাম।", "erpor amra eksonge khelam.", "After that we ate together."] },
  { word: ["অবশেষে", "obosheshe", "finally"], use: "The thing you waited for finally happens.", example: ["অবশেষে ট্রেন এল।", "obosheshe tren elo.", "Finally the train came."] },
  { word: ["কিন্তু", "kintu", "but"], use: "Add a problem or a contrast. Great for hooks.", example: ["সে গেল, কিন্তু কেউ ছিল না।", "se gelo, kintu keu chhilo na.", "She went, but nobody was there."] },
  { word: ["তাই", "tai", "so"], use: "Say what happened as a result.", example: ["বৃষ্টি হচ্ছিল, তাই সে ঘরে রইল।", "brishti hochchhilo, tai se ghore roilo.", "It was raining, so he stayed in."] },
  { word: ["কারণ", "karon", "because"], use: "Give the reason.", example: ["সে খুশি, কারণ সে চাকরি পেয়েছে।", "se khushi, karon se chakri peyeche.", "She is happy because she got a job."] },
  { word: ["হঠাৎ", "hothat", "suddenly"], use: "A surprise. Use it to start a hook.", example: ["হঠাৎ ফোনটা বেজে উঠল।", "hothat phonta beje uthlo.", "Suddenly the phone rang."] },
  { word: ["তখন", "tokhon", "at that time, then"], use: "Say what was going on at that moment.", example: ["তখন বাইরে বৃষ্টি পড়ছিল।", "tokhon bairey brishti porchhilo.", "At that time it was raining outside."] },
  { word: ["যখন", "jokhon", "when"], use: "Start a 'when ... then' pair with tokhon.", example: ["যখন সে এল, আমি রান্না করছিলাম।", "jokhon se elo, ami ranna korchhilam.", "When she came, I was cooking."] },
  { word: ["আগে", "age", "before"], use: "Say what came first.", example: ["যাওয়ার আগে সে চা খেল।", "jawar age se cha khelo.", "Before leaving, he had tea."] },
  { word: ["পরে", "pore", "later, after"], use: "Say what comes next.", example: ["পরে আমি তোমাকে ফোন করব।", "pore ami tomake phone korbo.", "Later I will call you."] },
  { word: ["নইলে", "noile", "otherwise"], use: "Say what happens if not.", example: ["তাড়াতাড়ি চলো, নইলে দেরি হবে।", "taratari cholo, noile deri hobe.", "Hurry up, otherwise we will be late."] },
];

export const HOOKS: Hook[] = [
  { kind: "A surprise", use: "Something sudden happens.", example: ["হঠাৎ দরজায় কেউ টোকা দিল।", "hothat dorjay keu toka dilo.", "Suddenly someone knocked on the door."] },
  { kind: "A problem", use: "Something goes wrong.", example: ["কিন্তু তার কাছে টাকা ছিল না।", "kintu tar kachhe taka chhilo na.", "But she had no money."] },
  { kind: "A question", use: "Leave something unknown.", example: ["সে কে ছিল, কেউ জানত না।", "se ke chhilo, keu janto na.", "Nobody knew who he was."] },
  { kind: "A secret", use: "Someone is hiding something.", example: ["মিনা একটা কথা লুকিয়ে রেখেছিল।", "mina ekta kotha lukiye rekhechhilo.", "Mina had hidden something."] },
  { kind: "A choice", use: "Someone must decide.", example: ["এখন তাকে ঠিক করতে হবে, সে যাবে কি যাবে না।", "ekhon take thik korte hobe, se jabe ki jabe na.", "Now she had to decide whether to go or not."] },
  { kind: "Running out of time", use: "Something is about to happen.", example: ["ট্রেন ছাড়তে আর পাঁচ মিনিট বাকি।", "tren chharte ar panch minit baki.", "Only five minutes were left before the train left."] },
  { kind: "A strange object", use: "Someone finds something odd.", example: ["মাটিতে একটা চাবি পড়ে ছিল।", "matite ekta chabi pore chhilo.", "A key was lying on the ground."] },
  { kind: "A feeling", use: "Show how someone feels.", example: ["তার খুব ভয় করছিল।", "tar khub bhoy korchhilo.", "She was very scared."] },
];

const o = (id: string, theme: string, a: L, b: L, c: L): RelayOpening => ({ id, theme, lines: [a, b, c] });

export const OPENINGS: RelayOpening[] = [
  o("ranna", "family",
    ["ঠাকুমা এখন রান্না করছেন।", "thakuma ekhon ranna korchhen.", "Thakuma (grandmother) is cooking now."],
    ["ঘরে অনেক মানুষ আসছে।", "ghor-e onek manush asche.", "Many people are coming to the house."],
    ["কিন্তু ভাত এখনও তৈরি হয়নি।", "kintu bhat ekhono toiri hoy ni.", "But the rice is not ready yet."]),
  o("ma", "family",
    ["মা আজ সকালে খুব তাড়াতাড়ি উঠলেন।", "ma aj sokale khub taratari uthlen.", "Mother got up very early this morning."],
    ["তিনি সবার জন্য চা বানালেন।", "tini sobar jonno cha banalen.", "She made tea for everyone."],
    ["কিন্তু ঘরে কেউ ছিল না।", "kintu ghore keu chhilo na.", "But nobody was at home."]),
  o("bhai", "family",
    ["ছোট ভাই স্কুল থেকে ফিরল।", "chhoto bhai school theke phirlo.", "The little brother came back from school."],
    ["তার হাতে একটা ছোট বাক্স ছিল।", "tar hate ekta chhoto baksho chhilo.", "He had a small box in his hand."],
    ["বাক্সের ভেতর থেকে একটা আওয়াজ আসছিল।", "bakser bhetor theke ekta awaj aschhilo.", "A sound was coming from inside the box."]),
  o("didi", "family",
    ["দিদি আজ নতুন শাড়ি পরেছে।", "didi aj notun shari poreche.", "Didi (elder sister) is wearing a new sari today."],
    ["সে খুব খুশি।", "se khub khushi.", "She is very happy."],
    ["কিন্তু শাড়ির এক কোণে একটা দাগ লেগে গেছে।", "kintu sharir ek kone ekta dag lege geche.", "But a stain has got on one corner of the sari."]),
  o("bazar", "market",
    ["এক দিন পিসি বাজারে গেল।", "ek din pishi bajare gelo.", "One day Pishi (aunt) went to the market."],
    ["সে অনেক ফল আর সবজি কিনল।", "se onek phol ar shobji kinlo.", "She bought a lot of fruit and vegetables."],
    ["হঠাৎ, সে একজন পুরনো বন্ধুকে দেখতে পেল।", "hothat, se ekjon purono bondhuke dekhte pelo.", "Suddenly, she saw an old friend."]),
  o("mach", "market",
    ["বাবা মাছ কিনতে বাজারে গেলেন।", "baba mach kinte bajare gelen.", "Father went to the market to buy fish."],
    ["আজ বাজারে খুব ভিড়।", "aj bajare khub bhir.", "The market is very crowded today."],
    ["একজন দোকানদার তাঁকে নাম ধরে ডাকল।", "ekjon dokandar tanke nam dhore dakol.", "A shopkeeper called him by name."]),
  o("mishti", "market",
    ["রিনা একটা মিষ্টির দোকানে ঢুকল।", "rina ekta mishtir dokane dhukol.", "Rina went into a sweet shop."],
    ["সে দুটো রসগোল্লা কিনল।", "se duto roshogolla kinlo.", "She bought two rasgullas."],
    ["কিন্তু টাকা দেওয়ার সময় সে তার ব্যাগ খুঁজে পেল না।", "kintu taka dewar shomoy se tar bag khunje pelo na.", "But when it was time to pay, she could not find her bag."]),
  o("resto", "market",
    ["আমরা সবাই রেস্টুরেন্টে খেতে গেলাম।", "amra sobai restaurante khete gelam.", "We all went to a restaurant to eat."],
    ["আমি মাছের ঝোল আর ভাত চাইলাম।", "ami macher jhol ar bhat chailam.", "I asked for fish curry and rice."],
    ["কিন্তু ওয়েটার ভুল খাবার নিয়ে এল।", "kintu waiter bhul khabar niye elo.", "But the waiter brought the wrong food."]),
  o("train", "travel",
    ["আমরা সকালে ট্রেনে উঠলাম।", "amra sokale trene uthlam.", "We got on the train in the morning."],
    ["জানালার ধারে বসে আমি বাইরে তাকালাম।", "janalar dhare bose ami bairey takalam.", "Sitting by the window, I looked outside."],
    ["হঠাৎ ট্রেন মাঝ রাস্তায় থেমে গেল।", "hothat tren majh rastay themey gelo.", "Suddenly the train stopped in the middle of nowhere."]),
  o("riksha", "travel",
    ["অমিত রিকশায় করে স্টেশনে যাচ্ছিল।", "amit rikshay kore steshone jachchhilo.", "Amit was going to the station by rickshaw."],
    ["রাস্তায় খুব জ্যাম ছিল।", "rastay khub jyam chhilo.", "There was a lot of traffic on the road."],
    ["তার ট্রেন ছাড়তে আর দশ মিনিট বাকি।", "tar tren chharte ar dosh minit baki.", "Only ten minutes were left before his train left."]),
  o("shohor", "travel",
    ["আমি একা একটা নতুন শহরে পৌঁছলাম।", "ami eka ekta notun shohore pouchholam.", "I reached a new city alone."],
    ["হোটেলের ঘরটা ছোট কিন্তু সুন্দর।", "hotel-er ghorta chhoto kintu shundor.", "The hotel room is small but nice."],
    ["রাতে কেউ দরজায় টোকা দিল।", "rate keu dorjay toka dilo.", "At night someone knocked on the door."]),
  o("office", "work",
    ["রাহুল আজ প্রথম দিন অফিসে গেল।", "rahul aj prothom din office-e gelo.", "Rahul went to the office on his first day today."],
    ["সবাই তাকে সুন্দর করে স্বাগত জানাল।", "shobai take shundor kore shagoto janalo.", "Everyone welcomed him warmly."],
    ["কিন্তু তার ডেস্কে কোনো কম্পিউটার ছিল না।", "kintu tar desk-e kono computer chhilo na.", "But there was no computer on his desk."]),
  o("class", "work",
    ["শিক্ষিকা ক্লাসে একটা গল্প বলছিলেন।", "shikkhika class-e ekta golpo bolchhilen.", "The teacher was telling a story in class."],
    ["সবাই মন দিয়ে শুনছিল।", "shobai mon diye shunchhilo.", "Everyone was listening carefully."],
    ["হঠাৎ একজন ছাত্র হেসে ফেলল।", "hothat ekjon chhatro hese phelolo.", "Suddenly a student burst out laughing."]),
  o("chakri", "work",
    ["মিনা নতুন চাকরি পেয়েছে।", "mina notun chakri peyeche.", "Mina has got a new job."],
    ["সে আজ সবাইকে মিষ্টি খাওয়াচ্ছে।", "se aj shobaike mishti khawachchhe.", "Today she is giving everyone sweets."],
    ["কিন্তু একজন মিষ্টি খেতে চায় না।", "kintu ekjon mishti khete chay na.", "But one person does not want any sweets."]),
  o("raat", "mystery",
    ["দাদা কাল রাতে ঘুমোতে পারছিল না।", "dada kal rate ghumote parchhilo na.", "Dada (elder brother) couldn't sleep last night."],
    ["সে ঘর থেকে বাইরে এল।", "se ghor theke bairey elo.", "He came out of the room."],
    ["বাইরে একটা আজব শব্দ হচ্ছিল।", "bairey ekta ajob shobdo hochchhilo.", "A strange sound was coming from outside."]),
  o("alo", "mystery",
    ["রাত তখন বারোটা।", "raat tokhon barota.", "It was twelve at night."],
    ["হঠাৎ ঘরের আলো নিভে গেল।", "hothat ghorer alo nibhe gelo.", "Suddenly the light in the room went out."],
    ["জানালার বাইরে কেউ হাঁটছিল।", "janalar bairey keu hatchhilo.", "Someone was walking outside the window."]),
  o("biral", "mystery",
    ["বাগানে একটা ছোট বিড়াল বসে ছিল।", "baganey ekta chhoto biral bose chhilo.", "A small cat was sitting in the garden."],
    ["সে আমাদের দিকে তাকিয়ে ছিল।", "se amader dike takiye chhilo.", "It was looking at us."],
    ["তার গলায় একটা চিঠি বাঁধা ছিল।", "tar golay ekta chithi badha chhilo.", "A letter was tied around its neck."]),
  o("boi", "mystery",
    ["রাস্তায় আমি একটা পুরনো বই পেলাম।", "rastay ami ekta purono boi pelam.", "I found an old book on the road."],
    ["বইয়ের ভেতরে একটা ছবি ছিল।", "boiyer bhetore ekta chhobi chhilo.", "There was a photo inside the book."],
    ["ছবির পেছনে একটা ঠিকানা লেখা।", "chhobir pechhone ekta thikana lekha.", "An address was written on the back of the photo."]),
  o("mon", "feelings",
    ["আজ আমার মন ভালো নেই।", "aj amar mon bhalo nei.", "I am not feeling well in my mind today."],
    ["কেন, তা আমি নিজেও জানি না।", "keno, ta ami nijeo jani na.", "I do not know why myself."],
    ["এমন সময় বন্ধুর ফোন এল।", "emon shomoy bondhur phone elo.", "Just then a friend's call came."]),
  o("dadu", "feelings",
    ["দাদু রোজ বিকেলে পার্কে যান।", "dadu roj bikele parke jan.", "Dadu (grandfather) goes to the park every afternoon."],
    ["আজ তিনি একটু দেরিতে গেলেন।", "aj tini ektu derite gelen.", "Today he went a little late."],
    ["পার্কে তাঁর বেঞ্চে অন্য একজন বসে আছে।", "parke tanr benche onyo ekjon bose achhe.", "Someone else is sitting on his bench in the park."]),
  o("bondhu", "feelings",
    ["আমার ছোটবেলার বন্ধু আজ আমার বাড়িতে এসেছে।", "amar chhotobelar bondhu aj amar barite eseche.", "My childhood friend has come to my house today."],
    ["অনেক দিন পরে আমাদের দেখা।", "onek din pore amader dekha.", "We are meeting after a long time."],
    ["কিন্তু সে আমাকে প্রথমে চিনতে পারেনি।", "kintu se amake prothome chinte pare ni.", "But at first he could not recognise me."]),
];

/** A complete sample of Option A: five turns, 15 sentences. */
export const SAMPLE_A: { who: "you" | "partner"; lines: L[]; note: string }[] = [
  { who: "you", note: "Opening. Ends with a surprise (hothat).", lines: OPENINGS.find((x) => x.id === "bazar")!.lines },
  { who: "partner", note: "Continues with the friend, adds a name, ends with a hook (a piece of news).", lines: [
    ["বন্ধুর নাম মিনা।", "bondhur nam mina.", "The friend's name is Mina."],
    ["তারা দুজন এক সঙ্গে চা খেল।", "tara dujon ek sathe cha khelo.", "The two of them had tea together."],
    ["তারপর মিনা বলল, “আমার একটা খবর আছে।”", "tarpor mina bollo, \"amar ekta khobor achhe.\"", "Then Mina said, \"I have some news.\""],
  ] },
  { who: "you", note: "Answers the hook, adds the news, ends with a worry (kintu).", lines: [
    ["পিসি জানতে চাইল, “কী খবর?”", "pishi jante chailo, \"ki khobor?\"", "Pishi asked, \"What news?\""],
    ["মিনা বলল, “আমি নতুন চাকরি পেয়েছি।”", "mina bollo, \"ami notun chakri peyechhi.\"", "Mina said, \"I have got a new job.\""],
    ["কিন্তু তার মুখে একটা চিন্তা ছিল।", "kintu tar mukhe ekta chinta chhilo.", "But there was a worry on her face."],
  ] },
  { who: "partner", note: "Explains the worry, adds a detail, ends with something odd.", lines: [
    ["মিনা বলল, “নতুন অফিস অনেক দূরে।”", "mina bollo, \"notun office onek dure.\"", "Mina said, \"The new office is very far.\""],
    ["পিসি তাকে সাহস দিল।", "pishi take shahosh dilo.", "Pishi encouraged her."],
    ["তারপর মিনা ফোনটা বের করে একটা মেসেজ দেখাল।", "tarpor mina phonta ber kore ekta meshej dekhalo.", "Then Mina took out her phone and showed a message."],
  ] },
  { who: "you", note: "Reacts to the message, adds a feeling, ends with a question.", lines: [
    ["মেসেজটা পিসির ছেলের কাছ থেকে এসেছে।", "meshejta pishir chheler kachh theke eseche.", "The message had come from Pishi's son."],
    ["পিসি অবাক হয়ে গেল।", "pishi obak hoye gelo.", "Pishi was astonished."],
    ["কারণ তার ছেলে তো অন্য শহরে থাকে।", "karon tar chhele to onyo shohore thake.", "Because her son lives in another city."],
  ] },
];

/** Option B: the board cards, in order. */
export const CARDS: RelayCard[] = [
  { id: "gotokal", word: ["গতকাল", "gotokal", "yesterday"], tense: "Past", how: "Say what happened yesterday or before. The verb takes a past ending.",
    forms: ["ami gelam", "tumi gele", "se gelo", "tini / apni gelen"],
    examples: [["গতকাল আমি বাজারে গেলাম।", "gotokal ami bajare gelam.", "Yesterday I went to the market."], ["গতকাল সে একটা বই পড়ল।", "gotokal se ekta boi porlo.", "Yesterday she read a book."]],
    turn: [["গতকাল পিসি মিনার বাড়িতে গেল।", "gotokal pishi minar barite gelo.", "Yesterday Pishi went to Mina's house. (card: gotokal)"], ["সেখানে দুজনে অনেক গল্প করল।", "shekhane dujone onek golpo korlo.", "There the two of them talked a lot. (free)"], ["কিন্তু মিনা একটা কথা বলতে ভুলে গেল।", "kintu mina ekta kotha bolte bhule gelo.", "But Mina forgot to say one thing. (free hook)"]] },
  { id: "jokhon", word: ["যখন … তখন", "jokhon ... tokhon", "when ... then"], tense: "Two actions at once", how: "Put one action after jokhon and the other after tokhon. The second is often something that was already going on.",
    forms: ["jokhon se elo, tokhon ami ranna korchhilam", "jokhon ami phirlam, tokhon brishti porchhilo"],
    examples: [["যখন সে এল, তখন আমি রান্না করছিলাম।", "jokhon se elo, tokhon ami ranna korchhilam.", "When she came, I was cooking."], ["যখন বৃষ্টি শুরু হল, তখন আমরা বাইরে ছিলাম।", "jokhon brishti shuru holo, tokhon amra bairey chhilam.", "When the rain started, we were outside."]],
    turn: [["যখন পিসি বাড়ি ফিরল, তখন বৃষ্টি পড়ছিল।", "jokhon pishi bari phirlo, tokhon brishti porchhilo.", "When Pishi came home, it was raining. (card: jokhon ... tokhon)"], ["সে ভিজে একেবারে ঠান্ডা হয়ে গিয়েছিল।", "se bhije ekebare thanda hoye giyechhilo.", "She had got soaked and was completely cold. (free)"], ["দরজার সামনে একটা অচেনা লোক দাঁড়িয়ে ছিল।", "dorjar samne ekta ochena lok darie chhilo.", "An unknown man was standing at the door. (free hook)"]] },
  { id: "ekhon", word: ["এখন", "ekhon", "now"], tense: "Present continuous", how: "Say what is happening right now. The verb ends in -chhi, -chho, -chhe or -chhen.",
    forms: ["ami jachchhi", "tumi jachchho", "se jachchhe", "tini / apni jachchhen"],
    examples: [["এখন সে ঘুমোচ্ছে।", "ekhon se ghumochchhe.", "Now she is sleeping."], ["এখন আমি চা খাচ্ছি।", "ekhon ami cha khachchhi.", "Now I am drinking tea."]],
    turn: [["এখন পিসি আর মিনা এক সঙ্গে বসে আছে।", "ekhon pishi ar mina ek sathe bose achhe.", "Now Pishi and Mina are sitting together. (card: ekhon)"], ["দুজনের মুখে হাসি।", "dujoner mukh-e hashi.", "Both are smiling. (free)"], ["কিন্তু মিনা এখনও পিসিকে সব কথা বলেনি।", "kintu mina ekhono pishi-ke shob kotha bole ni.", "But Mina has not told Pishi everything yet. (hook)"]] },
  { id: "ekhono", word: ["এখনও … নি", "ekhono ... ni", "not yet"], tense: "Present perfect, negative", how: "Say what has not happened yet. Use ekhono, the verb, and -ni at the end.",
    forms: ["ami ekhono khai ni", "tumi ekhono khao ni", "se ekhono khay ni", "tini ekhono khan ni"],
    examples: [["আমি এখনও খাইনি।", "ami ekhono khai ni.", "I have not eaten yet."], ["সে এখনও আসেনি।", "se ekhono ashe ni.", "He has not come yet."]],
    turn: [["পিসি এখনও চা খায়নি।", "pishi ekhono cha khay ni.", "Pishi has not drunk her tea yet. (card: ekhono ... ni)"], ["চা ঠান্ডা হয়ে যাচ্ছে।", "cha thanda hoye jachchhe.", "The tea is getting cold. (free)"], ["কিন্তু মিনার কথা শেষ হচ্ছে না।", "kintu minar kotha shesh hochchhe na.", "But Mina's story is not ending. (free hook)"]] },
  { id: "agamikal", word: ["আগামীকাল", "agamikal", "tomorrow"], tense: "Future", how: "Say what will happen tomorrow. The verb ends in -bo, -be or -ben.",
    forms: ["ami jabo", "tumi jabe", "se jabe", "tini / apni jaben"],
    examples: [["আগামীকাল আমি অফিসে যাব।", "agamikal ami office-e jabo.", "Tomorrow I will go to the office."], ["আগামীকাল সে আমাদের বাড়িতে আসবে।", "agamikal se amader barite ashbe.", "Tomorrow she will come to our house."]],
    turn: [["আগামীকাল মিনা নতুন অফিসে যাবে।", "agamikal mina notun office-e jabe.", "Tomorrow Mina will go to the new office. (card: agamikal)"], ["পিসি তাকে স্টেশন পর্যন্ত পৌঁছে দেবে।", "pishi take steshon porjonto pouchhe debe.", "Pishi will see her off up to the station. (free)"], ["কিন্তু মিনা এখনও জানে না, সেখানে কে তার জন্য অপেক্ষা করছে।", "kintu mina ekhono jane na, shekhane ke tar jonno opekkha korchhe.", "But Mina does not know yet who is waiting for her there. (free hook)"]] },
  { id: "free", word: ["মুক্ত", "mukto", "free"], tense: "Any tense", how: "No rule. Use any tense. This is the last turn, so try to finish the story.",
    forms: [],
    examples: [],
    turn: [["শেষে মিনা সব কথা পিসিকে বলল।", "sheshe mina shob kotha pishike bollo.", "In the end Mina told Pishi everything."], ["পিসি হেসে বলল, “আমি আগেই বুঝেছিলাম।”", "pishi hese bollo, \"ami agei bujhechhilam.\"", "Pishi smiled and said, \"I had understood already.\""], ["তারপর দুজনে মিলে মিষ্টি কিনতে গেল।", "tarpor dujone mile mishti kinte gelo.", "Then the two of them went together to buy sweets."]] },
];

export const WRAP = {
  retell: [
    ["এক দিন পিসি বাজারে গেল।", "ek din pishi bajare gelo.", "One day Pishi went to the market."],
    ["সেখানে তার পুরনো বন্ধু মিনার সঙ্গে দেখা হল।", "shekhane tar purono bondhu minar songe dekha holo.", "There she met her old friend Mina."],
    ["দুজনে চা খেল।", "dujone cha khelo.", "The two of them had tea."],
    ["মিনা জানাল, সে নতুন চাকরি পেয়েছে।", "mina janalo, se notun chakri peyeche.", "Mina said she had got a new job."],
    ["কিন্তু তার মনে চিন্তা ছিল।", "kintu tar mone chinta chhilo.", "But she was worried."],
  ] as L[],
  short: [
    ["পিসি বাজারে মিনাকে দেখল।", "pishi bajare minake dekhlo.", "Pishi saw Mina at the market."],
    ["মিনা নতুন চাকরি পেয়েছে, কিন্তু সে চিন্তায় আছে।", "mina notun chakri peyeche, kintu se chintay achhe.", "Mina has got a new job, but she is worried."],
  ] as L[],
};
