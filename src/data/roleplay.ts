// Role-play scenarios for Speaking. Written for this app: every Bengali line needs the teacher's review.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.

export type L = [bn: string, ro: string, en: string];
export type RWord = L;
export type Turn = { who: "you" | "them"; line: L };
export type PhraseGroup = { title: string; note?: string; items: L[] };
export type Demo = { id: string; title: string; kind: "smooth" | "wrong"; setup: string; turns: Turn[]; takeaway: string };
export type Scenario = {
  id: string;
  title: string;
  bn: string;
  blurb: string;
  situation: string;
  goal: string;
  words: RWord[];
  /** What you say. */
  say: PhraseGroup[];
  /** What the other person says: you only need to understand these. */
  hear: PhraseGroup[];
  demos: Demo[];
};

const you = (bn: string, ro: string, en: string): Turn => ({ who: "you", line: [bn, ro, en] });
const them = (bn: string, ro: string, en: string): Turn => ({ who: "them", line: [bn, ro, en] });

export const SCENARIOS: Scenario[] = [
  {
    id: "shop",
    title: "Bargaining with a shopkeeper",
    bn: "দোকানে দরদাম",
    blurb: "Ask the price, bargain politely, then buy it or walk away.",
    situation: "You are in a clothes shop in a Kolkata market. You like a kurta (পাঞ্জাবি) and want a fair price.",
    goal: "Find out the price, ask for a lower one, and either buy it or say no politely.",
    words: [
      ["দাম", "dam", "price"], ["কম", "kom", "less, low"], ["বেশি", "beshi", "more, too much"], ["ছাড়", "chhar", "discount"],
      ["পাঞ্জাবি", "panjabi", "kurta"], ["শাড়ি", "shari", "sari"], ["জামা", "jama", "shirt, clothes"], ["মাপ", "map", "size"],
      ["রং", "rong", "colour"], ["দোকান", "dokan", "shop"], ["দোকানদার", "dokandar", "shopkeeper"], ["টাকা", "taka", "rupees, money"],
      ["খুচরো", "khuchro", "small change"], ["শেষ দাম", "shesh dam", "last price"],
    ],
    say: [
      { title: "Asking about the thing", items: [
        ["আমি একটা পাঞ্জাবি দেখতে চাই।", "ami ekta panjabi dekhte chai.", "I want to see a kurta."],
        ["এটা কত?", "eta koto?", "How much is this?"],
        ["এই পাঞ্জাবিটা কত করে?", "ei panjabita koto kore?", "How much is this kurta?"],
        ["অন্য রং আছে?", "onyo rong achhe?", "Is there another colour?"],
        ["বড় মাপ আছে?", "boro map achhe?", "Do you have a bigger size?"],
      ] },
      { title: "Bargaining", note: "Be friendly. Bargaining is normal and expected, and a smile helps.", items: [
        ["দামটা একটু বেশি হয়ে যাচ্ছে।", "damta ektu beshi hoye jachchhe.", "The price is a bit too high."],
        ["একটু কম করুন।", "ektu kom korun.", "Please lower it a little."],
        ["সাড়ে তিনশো হবে?", "sharhe tinsho hobe?", "Will 350 do?"],
        ["শেষ দাম কত?", "shesh dam koto?", "What is the last price?"],
        ["দুটো নিলে কত পড়বে?", "duto nile koto porbe?", "If I take two, how much will it be?"],
      ] },
      { title: "Saying yes", items: [
        ["ঠিক আছে, এটাই নেব।", "thik achhe, etai nebo.", "All right, I'll take this one."],
        ["প্যাক করে দিন।", "pyak kore din.", "Please pack it."],
        ["এই নিন টাকা।", "ei nin taka.", "Here is the money."],
        ["খুচরো আছে?", "khuchro achhe?", "Do you have change?"],
      ] },
      { title: "Saying no politely", note: "\"থাক\" (thak) is a soft, friendly way to say \"never mind, leave it\".", items: [
        ["না, থাক।", "na, thak.", "No, leave it."],
        ["এত দাম দিতে পারব না।", "eto dam dite parbo na.", "I can't pay this much."],
        ["আজ নেব না, পরে আসব।", "aj nebo na, pore ashbo.", "I won't take it today, I'll come later."],
        ["আমি একটু অন্য দোকানে দেখি।", "ami ektu onyo dokane dekhi.", "Let me look in another shop."],
        ["ধন্যবাদ, আসি।", "dhonyobad, ashi.", "Thank you, I'll go now."],
      ] },
    ],
    hear: [
      { title: "What the shopkeeper says", items: [
        ["বলুন, কী লাগবে?", "bolun, ki lagbe?", "Tell me, what do you need?"],
        ["এই দেখুন, নতুন এসেছে।", "ei dekhun, notun eshechhe.", "Look, this has just come in."],
        ["চারশো টাকা।", "charsho taka.", "Four hundred rupees."],
        ["কত দেবেন বলুন?", "koto deben bolun?", "Tell me how much you will give."],
        ["এর চেয়ে কম হবে না।", "er cheye kom hobe na.", "It can't go lower than this."],
        ["পাঁচশোয় পোষাবে না।", "panchshoy poshabe na.", "Five hundred won't work for me."],
        ["আর কমবে না।", "ar kombe na.", "It won't come down any more."],
        ["প্যাক করে দেব?", "pyak kore debo?", "Shall I pack it?"],
        ["ধন্যবাদ, আবার আসবেন।", "dhonyobad, abar ashben.", "Thank you, come again."],
      ] },
    ],
    demos: [
      { id: "buy", title: "Everything goes well: you buy", kind: "smooth", setup: "You ask the price, bargain a little, agree and buy the kurta.", turns: [
        them("বলুন, কী লাগবে?", "bolun, ki lagbe?", "Tell me, what do you need?"),
        you("আমি একটা পাঞ্জাবি দেখতে চাই।", "ami ekta panjabi dekhte chai.", "I want to see a kurta."),
        them("এই দেখুন, নতুন এসেছে।", "ei dekhun, notun eshechhe.", "Look, this has just come in."),
        you("এটা কত?", "eta koto?", "How much is this?"),
        them("চারশো টাকা।", "charsho taka.", "Four hundred rupees."),
        you("দামটা একটু বেশি হয়ে যাচ্ছে। একটু কম করুন।", "damta ektu beshi hoye jachchhe. ektu kom korun.", "The price is a bit too high. Please lower it a little."),
        them("কত দেবেন বলুন?", "koto deben bolun?", "Tell me how much you will give."),
        you("সাড়ে তিনশো হবে?", "sharhe tinsho hobe?", "Will 350 do?"),
        them("তিনশো আশি দিন, আর কমবে না।", "tinsho ashi din, ar kombe na.", "Give 380, it won't come down any more."),
        you("ঠিক আছে, এটাই নেব।", "thik achhe, etai nebo.", "All right, I'll take this one."),
        them("প্যাক করে দেব?", "pyak kore debo?", "Shall I pack it?"),
        you("হ্যাঁ, দিন। এই নিন টাকা।", "hyan, din. ei nin taka.", "Yes, please. Here is the money."),
        them("ধন্যবাদ, আবার আসবেন।", "dhonyobad, abar ashben.", "Thank you, come again."),
        you("আসব, ধন্যবাদ।", "ashbo, dhonyobad.", "I will, thank you."),
      ], takeaway: "Start by asking the price, say it is a little high, then offer a number a bit lower than you hope to pay." },
      { id: "decline", title: "Things go wrong: you walk away", kind: "wrong", setup: "The price stays too high after bargaining, so you decline politely and leave.", turns: [
        them("বলুন, কী লাগবে?", "bolun, ki lagbe?", "Tell me, what do you need?"),
        you("ওই নীল শাড়িটা কত?", "oi nil sharita koto?", "How much is that blue sari?"),
        them("ওটা ছশো টাকা।", "ota chhoysho taka.", "That is 600 rupees."),
        you("ছশো! দামটা অনেক বেশি। একটু কম করুন।", "chhoysho! damta onek beshi. ektu kom korun.", "600! That is a lot. Please lower it a little."),
        them("এর চেয়ে কম হবে না। এটা খুব ভালো কাপড়।", "er cheye kom hobe na. eta khub bhalo kapor.", "It can't go lower. This is very good cloth."),
        you("পাঁচশো হবে?", "panchsho hobe?", "Will 500 do?"),
        them("না, না। পাঁচশোয় পোষাবে না।", "na, na. panchshoy poshabe na.", "No, no. 500 won't work for me."),
        you("তাহলে থাক। এত দাম দিতে পারব না।", "tahole thak. eto dam dite parbo na.", "Then leave it. I can't pay this much."),
        them("আচ্ছা, পাঁচশো পঞ্চাশ দিন।", "achchha, panchsho pochash din.", "All right, give 550."),
        you("না, ধন্যবাদ। আমি একটু অন্য দোকানে দেখি।", "na, dhonyobad. ami ektu onyo dokane dekhi.", "No, thank you. Let me look in another shop."),
        them("ঠিক আছে, আবার আসবেন।", "thik achhe, abar ashben.", "Fine, come again."),
      ], takeaway: "You never have to buy. \"থাক\" and \"ধন্যবাদ\" end the talk kindly, and the shopkeeper may even drop the price as you leave." },
    ],
  },
  {
    id: "rickshaw",
    title: "Taking a rickshaw or auto",
    bn: "রিকশা বা অটোয়",
    blurb: "Agree on the fare, give directions on the way and get off at the right place.",
    situation: "You need to get across town. You stop a rickshaw or an auto and agree where to go and what to pay.",
    goal: "Say where you are going, agree on a fare, steer the driver, and stop in the right place.",
    words: [
      ["রিকশা", "riksha", "rickshaw"], ["অটো", "auto", "auto-rickshaw"], ["ভাড়া", "bhara", "fare"], ["মিটার", "mitar", "meter"],
      ["স্টেশন", "steshon", "station"], ["মোড়", "mor", "street corner, junction"], ["সোজা", "shoja", "straight"],
      ["ডানদিকে", "dan dike", "to the right"], ["বাঁদিকে", "ban dike", "to the left"], ["আস্তে", "aste", "slowly, gently"],
      ["তাড়াতাড়ি", "taratari", "quickly"], ["জ্যাম", "jyam", "traffic jam"], ["থামা", "thama", "to stop"], ["নামা", "nama", "to get down"],
    ],
    say: [
      { title: "Asking and agreeing", items: [
        ["দাদা, হাওড়া স্টেশন যাবেন?", "dada, haora steshon jaben?", "Brother, will you go to Howrah station?"],
        ["ভাড়া কত?", "bhara koto?", "How much is the fare?"],
        ["মিটারে যাবেন?", "mitare jaben?", "Will you go by the meter?"],
        ["পঞ্চাশ হবে?", "pochash hobe?", "Will 50 do?"],
        ["এত ভাড়া হয় না।", "eto bhara hoy na.", "The fare isn't this much."],
      ] },
      { title: "On the way", items: [
        ["সোজা চলুন।", "shoja cholun.", "Go straight."],
        ["ডানদিকে ঘুরুন।", "dan dike ghurun.", "Turn right."],
        ["বাঁদিকে ঘুরুন।", "ban dike ghurun.", "Turn left."],
        ["একটু আস্তে চালান।", "ektu aste chalan.", "Please drive a little slower."],
        ["একটু তাড়াতাড়ি যাবেন?", "ektu taratari jaben?", "Could you go a bit faster?"],
      ] },
      { title: "Getting off", items: [
        ["এখানে থামুন।", "ekhane thamun.", "Stop here."],
        ["ওই মোড়ে নামব।", "oi more nambo.", "I'll get down at that corner."],
        ["এই নিন, ধন্যবাদ।", "ei nin, dhonyobad.", "Here you are, thank you."],
      ] },
      { title: "Saying no politely", items: [
        ["তাহলে থাক, ধন্যবাদ।", "tahole thak, dhonyobad.", "Then never mind, thank you."],
        ["আমি অন্য অটো দেখি।", "ami onyo auto dekhi.", "I'll look for another auto."],
      ] },
    ],
    hear: [
      { title: "What the driver says", items: [
        ["কোথায় যাবেন?", "kothay jaben?", "Where will you go?"],
        ["যাব। উঠুন।", "jabo. uthun.", "I'll go. Get in."],
        ["ষাট টাকা।", "shat taka.", "Sixty rupees."],
        ["মিটার চলে না।", "mitar chole na.", "The meter doesn't work."],
        ["খুব জ্যাম আছে।", "khub jyam achhe.", "There is a lot of traffic."],
        ["এসে গেছি।", "eshe gechhi.", "We have arrived."],
      ] },
    ],
    demos: [
      { id: "ride", title: "Everything goes well: you reach your stop", kind: "smooth", setup: "You agree on a fair fare and are dropped at the right place.", turns: [
        you("দাদা, হাওড়া স্টেশন যাবেন?", "dada, haora steshon jaben?", "Brother, will you go to Howrah station?"),
        them("যাব। উঠুন।", "jabo. uthun.", "I'll go. Get in."),
        you("ভাড়া কত?", "bhara koto?", "How much is the fare?"),
        them("ষাট টাকা।", "shat taka.", "Sixty rupees."),
        you("পঞ্চাশ হবে?", "pochash hobe?", "Will 50 do?"),
        them("আচ্ছা, চলুন।", "achchha, cholun.", "All right, let's go."),
        you("একটু আস্তে চালান।", "ektu aste chalan.", "Please drive a little slower."),
        them("ঠিক আছে।", "thik achhe.", "All right."),
        you("এখানে থামুন।", "ekhane thamun.", "Stop here."),
        them("এসে গেছি।", "eshe gechhi.", "We have arrived."),
        you("এই নিন, ধন্যবাদ।", "ei nin, dhonyobad.", "Here you are, thank you."),
      ], takeaway: "Settle the fare before you get in, not after." },
      { id: "refuse", title: "Things go wrong: the fare is too high", kind: "wrong", setup: "The driver asks for far too much and the meter is \"broken\", so you decline and find another.", turns: [
        you("দাদা, গড়িয়াহাট যাবেন?", "dada, gariyahat jaben?", "Brother, will you go to Gariahat?"),
        them("যাব, একশো পঞ্চাশ টাকা।", "jabo, eksho pochash taka.", "I'll go, 150 rupees."),
        you("একশো পঞ্চাশ! এত ভাড়া হয় না। মিটারে যাবেন?", "eksho pochash! eto bhara hoy na. mitare jaben?", "150! The fare isn't this much. Will you go by the meter?"),
        them("মিটার চলে না।", "mitar chole na.", "The meter doesn't work."),
        you("তাহলে থাক, ধন্যবাদ।", "tahole thak, dhonyobad.", "Then never mind, thank you."),
        them("আচ্ছা, একশো দিন।", "achchha, eksho din.", "All right, give 100."),
        you("না, আমি অন্য অটো দেখি।", "na, ami onyo auto dekhi.", "No, I'll look for another auto."),
      ], takeaway: "Ask for the meter first. If the price still feels wrong, you can always step back and look for another ride." },
    ],
  },
  {
    id: "restaurant",
    title: "At a restaurant",
    bn: "রেস্টুরেন্টে",
    blurb: "Get a table, order, ask for less spice, fix a wrong order and pay.",
    situation: "You sit down for lunch at a small Bengali restaurant and want fish curry and rice.",
    goal: "Order what you want, say how spicy, solve a small problem politely, and ask for the bill.",
    words: [
      ["টেবিল", "tebil", "table"], ["মেনু", "menu", "menu"], ["ভাত", "bhat", "rice"], ["ডাল", "dal", "dal"], ["মাছ", "mach", "fish"],
      ["ঝোল", "jhol", "light curry"], ["ঝাল", "jhal", "spicy, chilli heat"], ["জল", "jol", "water"], ["গরম", "gorom", "hot"],
      ["ঠান্ডা", "thanda", "cold"], ["বিল", "bil", "bill"], ["আরেকটু", "arektu", "a little more"],
    ],
    say: [
      { title: "Getting started", items: [
        ["একটা টেবিল পাওয়া যাবে?", "ekta tebil pawa jabe?", "Can we get a table?"],
        ["মেনুটা দেবেন?", "menuta deben?", "Could you give the menu?"],
        ["আজ কী ভালো আছে?", "aj ki bhalo achhe?", "What is good today?"],
        ["জল দেবেন?", "jol deben?", "Could you bring water?"],
      ] },
      { title: "Ordering", items: [
        ["একটা মাছের ঝোল আর ভাত দিন।", "ekta macher jhol ar bhat din.", "One fish curry and rice, please."],
        ["ঝাল কম দেবেন।", "jhal kom deben.", "Please make it less spicy."],
        ["আরেকটু ভাত দেবেন?", "arektu bhat deben?", "Could you give a little more rice?"],
      ] },
      { title: "When something is wrong", note: "Say it gently and ask for a fix. A calm \"দেবেন?\" works better than a complaint.", items: [
        ["এটা আমি বলিনি।", "eta ami bolini.", "I didn't order this."],
        ["এটা ঠান্ডা, গরম করে দেবেন?", "eta thanda, gorom kore deben?", "This is cold, could you heat it up?"],
        ["এটা একটু বেশি ঝাল।", "eta ektu beshi jhal.", "This is a bit too spicy."],
      ] },
      { title: "Paying", items: [
        ["বিলটা দিন।", "bilta din.", "Please give the bill."],
        ["খুব ভালো খেলাম, ধন্যবাদ।", "khub bhalo khelam, dhonyobad.", "I ate very well, thank you."],
      ] },
    ],
    hear: [
      { title: "What the waiter says", items: [
        ["কজন?", "kojon?", "How many people?"],
        ["কী খাবেন?", "ki khaben?", "What will you eat?"],
        ["ঝাল কেমন হবে?", "jhal kemon hobe?", "How spicy should it be?"],
        ["আর কিছু লাগবে?", "ar kichhu lagbe?", "Do you need anything else?"],
        ["এখনই আনছি।", "ekhonoi anchhi.", "I'm bringing it right now."],
        ["ভুল হয়ে গেছে, দুঃখিত।", "bhul hoye gechhe, dukkhito.", "That was a mistake, sorry."],
      ] },
    ],
    demos: [
      { id: "order", title: "Everything goes well: you order and pay", kind: "smooth", setup: "You order a simple meal, ask for it mild, and pay.", turns: [
        them("কজন?", "kojon?", "How many people?"),
        you("একজন। একটা টেবিল পাওয়া যাবে?", "ekjon. ekta tebil pawa jabe?", "One person. Can I get a table?"),
        them("হ্যাঁ, বসুন। কী খাবেন?", "hyan, boshun. ki khaben?", "Yes, sit down. What will you eat?"),
        you("একটা মাছের ঝোল আর ভাত দিন।", "ekta macher jhol ar bhat din.", "One fish curry and rice, please."),
        them("ঝাল কেমন হবে?", "jhal kemon hobe?", "How spicy should it be?"),
        you("ঝাল কম দেবেন।", "jhal kom deben.", "Please make it less spicy."),
        them("ঠিক আছে। আর কিছু লাগবে?", "thik achhe. ar kichhu lagbe?", "All right. Do you need anything else?"),
        you("আরেকটু ভাত দেবেন?", "arektu bhat deben?", "Could you give a little more rice?"),
        them("এখনই আনছি।", "ekhonoi anchhi.", "I'm bringing it right now."),
        you("বিলটা দিন। খুব ভালো খেলাম, ধন্যবাদ।", "bilta din. khub bhalo khelam, dhonyobad.", "The bill, please. I ate very well, thank you."),
      ], takeaway: "Say how many people, order in one sentence, and add \"ঝাল কম\" if you want it mild." },
      { id: "mixup", title: "Things go wrong: the wrong dish", kind: "wrong", setup: "The waiter brings the wrong dish and cold food. You ask for a fix without being rude.", turns: [
        them("এই নিন, আপনার মাছ।", "ei nin, apnar mach.", "Here you are, your fish."),
        you("এটা আমি বলিনি। আমি মাছের ঝোল বলেছিলাম।", "eta ami bolini. ami macher jhol bolechhilam.", "I didn't order this. I had asked for fish curry."),
        them("ও, ভুল হয়ে গেছে, দুঃখিত।", "o, bhul hoye gechhe, dukkhito.", "Oh, that was a mistake, sorry."),
        you("ঠিক আছে। এটা ঠান্ডা, গরম করে দেবেন?", "thik achhe. eta thanda, gorom kore deben?", "That's all right. This is cold, could you heat it up?"),
        them("এখনই আনছি।", "ekhonoi anchhi.", "I'm bringing it right now."),
        you("ধন্যবাদ।", "dhonyobad.", "Thank you."),
      ], takeaway: "Say what is wrong, then ask for the fix with \"দেবেন?\". Add \"ঠিক আছে\" so it stays friendly." },
    ],
  },
  {
    id: "directions",
    title: "Asking the way",
    bn: "রাস্তা জিজ্ঞেস করা",
    blurb: "Stop someone, ask where a place is, and make sure you understood.",
    situation: "You are walking in a new neighbourhood and need to find a pharmacy (ওষুধের দোকান).",
    goal: "Ask for a place, understand the directions, ask for them again if you got lost, and thank them.",
    words: [
      ["রাস্তা", "rasta", "road, way"], ["মোড়", "mor", "junction"], ["সোজা", "shoja", "straight"], ["ডানদিকে", "dan dike", "to the right"],
      ["বাঁদিকে", "ban dike", "to the left"], ["কাছে", "kachhe", "near"], ["দূরে", "dure", "far"], ["সামনে", "samne", "in front, ahead"],
      ["পাশে", "pashe", "beside"], ["উল্টোদিকে", "ulto dike", "on the opposite side"], ["মিনিট", "minit", "minute"],
      ["হেঁটে", "hete", "on foot"], ["ওষুধের দোকান", "oshudher dokan", "pharmacy"],
    ],
    say: [
      { title: "Asking", items: [
        ["শুনুন, ওষুধের দোকান কোথায়?", "shunun, oshudher dokan kothay?", "Excuse me, where is the pharmacy?"],
        ["এখান থেকে কত দূর?", "ekhan theke koto dur?", "How far is it from here?"],
        ["হেঁটে যাওয়া যায়?", "hete jawa jay?", "Can I go on foot?"],
        ["কাছে কোনো ওষুধের দোকান আছে?", "kachhe kono oshudher dokan achhe?", "Is there a pharmacy nearby?"],
      ] },
      { title: "When you didn't catch it", note: "Asking again is normal. Nobody minds.", items: [
        ["আর একবার বলবেন?", "ar ekbar bolben?", "Could you say it once more?"],
        ["একটু আস্তে বলবেন?", "ektu aste bolben?", "Could you say it a bit slower?"],
        ["আমি বাংলা একটু একটু বলি।", "ami bangla ektu ektu boli.", "I speak a little Bengali."],
      ] },
      { title: "Checking and thanking", items: [
        ["সোজা গিয়ে ডানদিকে?", "shoja giye dan dike?", "Straight, then right?"],
        ["বুঝেছি, ধন্যবাদ।", "bujhechhi, dhonyobad.", "I understand, thank you."],
        ["অনেক ধন্যবাদ।", "onek dhonyobad.", "Thank you very much."],
      ] },
    ],
    hear: [
      { title: "What people say", items: [
        ["সোজা যান।", "shoja jan.", "Go straight."],
        ["দ্বিতীয় মোড়ে ডানদিকে ঘুরবেন।", "ditiyo more dan dike ghurben.", "Turn right at the second junction."],
        ["ওই যে সামনে।", "oi je samne.", "There, straight ahead."],
        ["পাঁচ মিনিটের রাস্তা।", "panch miniter rasta.", "It's five minutes away."],
        ["ব্যাংকের পাশে।", "banker pashe.", "Beside the bank."],
        ["আমি ঠিক জানি না।", "ami thik jani na.", "I don't know exactly."],
      ] },
    ],
    demos: [
      { id: "found", title: "Everything goes well: you find it", kind: "smooth", setup: "The first person you ask knows the way and you repeat it back to be sure.", turns: [
        you("শুনুন, ওষুধের দোকান কোথায়?", "shunun, oshudher dokan kothay?", "Excuse me, where is the pharmacy?"),
        them("সোজা যান। দ্বিতীয় মোড়ে ডানদিকে ঘুরবেন।", "shoja jan. ditiyo more dan dike ghurben.", "Go straight. Turn right at the second junction."),
        you("হেঁটে যাওয়া যায়?", "hete jawa jay?", "Can I go on foot?"),
        them("হ্যাঁ, পাঁচ মিনিটের রাস্তা।", "hyan, panch miniter rasta.", "Yes, it's five minutes away."),
        you("সোজা গিয়ে ডানদিকে?", "shoja giye dan dike?", "Straight, then right?"),
        them("হ্যাঁ, ব্যাংকের পাশে।", "hyan, banker pashe.", "Yes, beside the bank."),
        you("বুঝেছি, অনেক ধন্যবাদ।", "bujhechhi, onek dhonyobad.", "I understand, thank you very much."),
      ], takeaway: "Repeat the directions back as a question. It checks you understood and gives the person a chance to correct you." },
      { id: "lost", title: "Things go wrong: you don't understand", kind: "wrong", setup: "The first person speaks too fast, the second does not know, and the third helps.", turns: [
        you("শুনুন, ওষুধের দোকান কোথায়?", "shunun, oshudher dokan kothay?", "Excuse me, where is the pharmacy?"),
        them("সামনের মোড়ে বাঁদিকে গিয়ে ওই যে ব্যাংকের উল্টোদিকে।", "samner more ban dike giye oi je banker ulto dike.", "Left at the next corner, then there, opposite the bank."),
        you("একটু আস্তে বলবেন?", "ektu aste bolben?", "Could you say it a bit slower?"),
        them("আমি ঠিক জানি না। ওঁকে জিজ্ঞেস করুন।", "ami thik jani na. onke jiggesh korun.", "I don't know exactly. Ask him."),
        you("ঠিক আছে, ধন্যবাদ।", "thik achhe, dhonyobad.", "All right, thank you."),
        them("সোজা যান। ওই যে সামনে।", "shoja jan. oi je samne.", "Go straight. There, straight ahead."),
        you("সোজা গিয়ে ডানদিকে?", "shoja giye dan dike?", "Straight, then right?"),
        them("না, সোজা। ডানদিকে নয়।", "na, shoja. dan dike noy.", "No, straight. Not right."),
        you("বুঝেছি, অনেক ধন্যবাদ।", "bujhechhi, onek dhonyobad.", "I understand, thank you very much."),
      ], takeaway: "If you don't understand, say \"একটু আস্তে বলবেন?\". If the person doesn't know, thank them and ask someone else." },
    ],
  },
  {
    id: "doctor",
    title: "At the doctor",
    bn: "ডাক্তারের কাছে",
    blurb: "Say what is wrong, answer the doctor's questions and understand how to take the medicine.",
    situation: "You have had a fever for two days and go to a small clinic in your neighbourhood.",
    goal: "Describe how you feel, say how long, ask how to take the medicine, and understand what to do next.",
    words: [
      ["ডাক্তার", "daktar", "doctor"], ["অসুখ", "osukh", "illness"], ["জ্বর", "jor", "fever"], ["মাথা ব্যথা", "matha byatha", "headache"],
      ["পেটে ব্যথা", "pete byatha", "stomach ache"], ["সর্দি", "shordi", "cold"], ["কাশি", "kashi", "cough"], ["ওষুধ", "oshudh", "medicine"],
      ["ব্যথা", "byatha", "pain"], ["শরীর", "shorir", "body"], ["বিশ্রাম", "bishram", "rest"], ["পরীক্ষা", "porikkha", "test, examination"],
    ],
    say: [
      { title: "Saying what is wrong", items: [
        ["আমার জ্বর হয়েছে।", "amar jor hoyechhe.", "I have a fever."],
        ["আমার মাথা ব্যথা করছে।", "amar matha byatha korchhe.", "I have a headache."],
        ["আমার পেটে ব্যথা।", "amar pete byatha.", "I have a stomach ache."],
        ["আমার সর্দি-কাশি হয়েছে।", "amar shordi-kashi hoyechhe.", "I have a cold and a cough."],
        ["আমার শরীর ভালো লাগছে না।", "amar shorir bhalo lagchhe na.", "I don't feel well."],
      ] },
      { title: "Saying how long and how bad", items: [
        ["দুদিন ধরে জ্বর।", "dudin dhore jor.", "I have had a fever for two days."],
        ["কাল রাত থেকে।", "kal rat theke.", "Since last night."],
        ["খুব ব্যথা করছে।", "khub byatha korchhe.", "It hurts a lot."],
      ] },
      { title: "Asking about the medicine", items: [
        ["কী ওষুধ খাব?", "ki oshudh khabo?", "Which medicine should I take?"],
        ["দিনে কতবার খাব?", "dine kotobar khabo?", "How many times a day should I take it?"],
        ["খাওয়ার আগে না পরে?", "khawar age na pore?", "Before or after eating?"],
        ["কতদিন বিশ্রাম নিতে হবে?", "kotodin bishram nite hobe?", "How many days do I need to rest?"],
      ] },
      { title: "When you didn't understand", items: [
        ["আমি ঠিক বুঝিনি, আর একবার বলবেন?", "ami thik bujhini, ar ekbar bolben?", "I didn't quite understand, could you say it once more?"],
        ["কবে আসব?", "kobe ashbo?", "When should I come?"],
        ["ধন্যবাদ, ডাক্তারবাবু।", "dhonyobad, daktarbabu.", "Thank you, doctor."],
      ] },
    ],
    hear: [
      { title: "What the doctor says", items: [
        ["কী হয়েছে?", "ki hoyechhe?", "What is the matter?"],
        ["কতদিন ধরে?", "kotodin dhore?", "For how long?"],
        ["মুখ খুলুন।", "mukh khulun.", "Open your mouth."],
        ["ভয়ের কিছু নেই।", "bhoyer kichhu nei.", "There is nothing to worry about."],
        ["দিনে তিনবার খাবেন।", "dine tinbar khaben.", "Take it three times a day."],
        ["খাওয়ার পরে খাবেন।", "khawar pore khaben.", "Take it after eating."],
        ["খুব জল খাবেন, বিশ্রাম নেবেন।", "khub jol khaben, bishram neben.", "Drink a lot of water and rest."],
        ["একটা পরীক্ষা করাতে হবে।", "ekta porikkha korate hobe.", "You will need to have a test."],
        ["তিনদিন পরে আবার আসবেন।", "tin din pore abar ashben.", "Come again after three days."],
      ] },
    ],
    demos: [
      { id: "visit", title: "Everything goes well: a simple visit", kind: "smooth", setup: "You describe the problem, understand the medicine and thank the doctor.", turns: [
        them("কী হয়েছে?", "ki hoyechhe?", "What is the matter?"),
        you("আমার জ্বর হয়েছে, আর মাথা ব্যথা করছে।", "amar jor hoyechhe, ar matha byatha korchhe.", "I have a fever, and a headache."),
        them("কতদিন ধরে?", "kotodin dhore?", "For how long?"),
        you("দুদিন ধরে।", "dudin dhore.", "For two days."),
        them("ভয়ের কিছু নেই। এই ওষুধ দিনে তিনবার খাবেন।", "bhoyer kichhu nei. ei oshudh dine tinbar khaben.", "There is nothing to worry about. Take this medicine three times a day."),
        you("খাওয়ার আগে না পরে?", "khawar age na pore?", "Before or after eating?"),
        them("খাওয়ার পরে। খুব জল খাবেন, বিশ্রাম নেবেন।", "khawar pore. khub jol khaben, bishram neben.", "After eating. Drink a lot of water and rest."),
        you("ধন্যবাদ, ডাক্তারবাবু।", "dhonyobad, daktarbabu.", "Thank you, doctor."),
      ], takeaway: "Say what hurts first, then how long. Both are things the doctor will ask anyway." },
      { id: "worse", title: "Things go wrong: you are not getting better", kind: "wrong", setup: "You come back because the medicine did not work, and you do not understand what the doctor wants.", turns: [
        you("আমি দুদিন ওষুধ খেয়েছি, কিন্তু জ্বর কমেনি।", "ami dudin oshudh kheyechhi, kintu jor komeni.", "I have taken the medicine for two days, but the fever has not gone down."),
        them("তাহলে একটা পরীক্ষা করাতে হবে।", "tahole ekta porikkha korate hobe.", "Then you will need to have a test."),
        you("আমি ঠিক বুঝিনি, আর একবার বলবেন?", "ami thik bujhini, ar ekbar bolben?", "I didn't quite understand, could you say it once more?"),
        them("একটা পরীক্ষা করাতে হবে। চিন্তা করবেন না।", "ekta porikkha korate hobe. chinta korben na.", "You will need to have a test. Don't worry."),
        you("কবে আসব?", "kobe ashbo?", "When should I come?"),
        them("কালই আসুন।", "kalai ashun.", "Come tomorrow."),
        you("ঠিক আছে, ধন্যবাদ।", "thik achhe, dhonyobad.", "All right, thank you."),
      ], takeaway: "If you don't follow, ask again. Doctors repeat things all day, and a clear question is better than a guess." },
    ],
  },
  {
    id: "phone",
    title: "On the phone",
    bn: "ফোনে কথা",
    blurb: "Start a call, ask for someone, handle a bad line, leave a message and end the call.",
    situation: "You call a friend, Rina, to arrange a meeting. You cannot see the other person, so every word has to be clear.",
    goal: "Say who you are, ask for the person, deal with a bad line, leave a message, and close the call politely.",
    words: [
      ["ফোন", "phone", "phone"], ["নম্বর", "nombor", "number"], ["লাইন", "line", "line, connection"], ["মেসেজ", "meshej", "message"],
      ["ভুল", "bhul", "wrong, mistake"], ["পরে", "pore", "later"], ["জোরে", "jore", "loudly"], ["আস্তে", "aste", "slowly"],
      ["ধরুন", "dhorun", "hold on"], ["বলছি", "bolchhi", "speaking"], ["রাখছি", "rakhchhi", "I'm hanging up"], ["কেটে গেল", "kete gelo", "got cut off"],
    ],
    say: [
      { title: "Starting the call", items: [
        ["হ্যালো, আমি অমিত বলছি।", "hyalo, ami amit bolchhi.", "Hello, this is Amit speaking."],
        ["রিনা আছেন?", "rina achhen?", "Is Rina there?"],
        ["রিনার সঙ্গে কথা বলতে পারি?", "rinar songe kotha bolte pari?", "May I speak to Rina?"],
        ["আপনি কে বলছেন?", "apni ke bolchhen?", "Who is speaking?"],
      ] },
      { title: "When the line is bad", items: [
        ["লাইনটা ভালো না, আর একবার বলবেন?", "linta bhalo na, ar ekbar bolben?", "The line is bad, could you say it once more?"],
        ["একটু জোরে বলবেন?", "ektu jore bolben?", "Could you speak a bit louder?"],
        ["একটু আস্তে বলবেন?", "ektu aste bolben?", "Could you speak a bit slower?"],
        ["আপনার কথা শুনতে পাচ্ছি না।", "apnar kotha shunte pachchhi na.", "I can't hear you."],
        ["লাইন কেটে গিয়েছিল।", "line kete giyechhilo.", "The call got cut off."],
      ] },
      { title: "Leaving a message", items: [
        ["ওঁকে বলবেন আমি ফোন করেছিলাম।", "onke bolben ami phone korechhilam.", "Please tell her I called."],
        ["আমি পরে ফোন করব।", "ami pore phone korbo.", "I will call later."],
        ["আমার নম্বরটা লিখে নিন।", "amar nomborta likhe nin.", "Please write down my number."],
      ] },
      { title: "Meeting and ending", items: [
        ["কাল সকালে আমরা কি দেখা করতে পারি?", "kal sokale amra ki dekha korte pari?", "Can we meet tomorrow morning?"],
        ["দুঃখিত, ভুল নম্বর।", "dukkhito, bhul nombor.", "Sorry, wrong number."],
        ["রাখছি, ধন্যবাদ।", "rakhchhi, dhonyobad.", "I'll hang up now, thank you."],
      ] },
    ],
    hear: [
      { title: "What you will hear", items: [
        ["হ্যালো, কে বলছেন?", "hyalo, ke bolchhen?", "Hello, who is speaking?"],
        ["একটু ধরুন, ডেকে দিচ্ছি।", "ektu dhorun, deke dichchhi.", "Hold on, I'll call her."],
        ["উনি এখন নেই।", "uni ekhon nei.", "She isn't here right now."],
        ["কিছু বলতে হবে?", "kichhu bolte hobe?", "Should I give her a message?"],
        ["এটা ভুল নম্বর।", "eta bhul nombor.", "This is the wrong number."],
        ["ঠিক আছে, বলে দেব।", "thik achhe, bole debo.", "All right, I'll tell her."],
        ["ভালো থাকবেন।", "bhalo thakben.", "Take care."],
      ] },
    ],
    demos: [
      { id: "call", title: "Everything goes well: you reach her", kind: "smooth", setup: "You reach Rina and arrange to meet.", turns: [
        them("হ্যালো?", "hyalo?", "Hello?"),
        you("হ্যালো, আমি অমিত বলছি। রিনা আছেন?", "hyalo, ami amit bolchhi. rina achhen?", "Hello, this is Amit speaking. Is Rina there?"),
        them("একটু ধরুন, ডেকে দিচ্ছি।", "ektu dhorun, deke dichchhi.", "Hold on, I'll call her."),
        them("হ্যাঁ, বলুন।", "hyan, bolun.", "Yes, tell me."),
        you("কাল সকালে আমরা কি দেখা করতে পারি?", "kal sokale amra ki dekha korte pari?", "Can we meet tomorrow morning?"),
        them("হ্যাঁ, দশটায় আসুন।", "hyan, doshtay ashun.", "Yes, come at ten."),
        you("ঠিক আছে। রাখছি, ধন্যবাদ।", "thik achhe. rakhchhi, dhonyobad.", "All right. I'll hang up now, thank you."),
        them("ভালো থাকবেন।", "bhalo thakben.", "Take care."),
      ], takeaway: "Say who you are first, then ask for the person you want." },
      { id: "away", title: "Things go wrong: she isn't there and the line is bad", kind: "wrong", setup: "Rina is out, the line is poor, so you leave a message.", turns: [
        you("হ্যালো, আমি অমিত বলছি। রিনা আছেন?", "hyalo, ami amit bolchhi. rina achhen?", "Hello, this is Amit speaking. Is Rina there?"),
        them("উনি এখন নেই। কিছু বলতে হবে?", "uni ekhon nei. kichhu bolte hobe?", "She isn't here right now. Should I give her a message?"),
        you("লাইনটা ভালো না, আর একবার বলবেন?", "linta bhalo na, ar ekbar bolben?", "The line is bad, could you say it once more?"),
        them("উনি এখন নেই। কিছু বলতে হবে?", "uni ekhon nei. kichhu bolte hobe?", "She isn't here right now. Should I give her a message?"),
        you("ওঁকে বলবেন আমি ফোন করেছিলাম। আমি পরে ফোন করব।", "onke bolben ami phone korechhilam. ami pore phone korbo.", "Please tell her I called. I will call later."),
        them("ঠিক আছে, বলে দেব।", "thik achhe, bole debo.", "All right, I'll tell her."),
        you("ধন্যবাদ, রাখছি।", "dhonyobad, rakhchhi.", "Thank you, I'll hang up now."),
      ], takeaway: "A bad line is not your fault. Ask for the sentence again, and if it fails, leave a short message and say you will call back." },
    ],
  },
];

export const getScenario = (id: string) => SCENARIOS.find((s) => s.id === id);
