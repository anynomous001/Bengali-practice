// Devotional role plays, volume 4: longer, more natural conversations (phone calls, the kitchen, fasting days,
// japa, asking about initiation, planning a pilgrimage). Written from the teacher's notes: the Bengali needs the teacher's review.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.
import type { Scenario } from "./roleplay";

const ro = (s: string) =>
  s.replace(/ô/g, "o").replace(/æ/g, "e").replace(/ṭ/g, "t").replace(/ḍ/g, "d").replace(/ṛ/g, "r").replace(/ṇ/g, "n").replace(/ś/g, "sh").replace(/ṅ/g, "ng");
type L = [string, string, string];
const l = (bn: string, r: string, en: string): L => [bn, ro(r), en];
const you = (bn: string, r: string, en: string) => ({ who: "you" as const, line: l(bn, r, en) });
const them = (bn: string, r: string, en: string) => ({ who: "them" as const, line: l(bn, r, en) });
const words = (a: [string, string, string][]) => a.map(([x, y, z]) => l(x, y, z));

export const DEV_SCENARIOS_4: Scenario[] = [
  {
    id: "dev-japa",
    title: "Talking about japa",
    bn: "জপের কথা",
    blurb: "Chat about your rounds, your mālā and a hard morning, the way devotees really do.",
    situation: "You sit next to a friendly devotee on the veranda early in the morning. You both have your beads.",
    goal: "Say how many rounds you chant, admit it is hard sometimes, and take encouragement.",
    words: words([["মালা", "mala", "japa beads"], ["জপ", "jôp", "chanting on beads"], ["মন", "môn", "mind"], ["ভোর", "bhor", "dawn"], ["ঘুম", "ghum", "sleep"], ["চেষ্টা", "cheṣṭa", "effort, try"]]),
    say: [
      { title: "Your japa", items: [
        l("আজ কত মালা হলো?", "aj kôto mala holo?", "How many rounds have you done today?"),
        l("আমি রোজ চার মালা করি।", "ami roj char mala kôri.", "I do four rounds every day."),
        l("আজ মনটা একদম বসছে না।", "aj mônṭa ækdôm bôshchhe na.", "My mind just won't settle today."),
        l("ঘুম পাচ্ছে, কী করি?", "ghum pachchhe, ki kôri?", "I am sleepy, what do I do?"),
        l("চেষ্টা করছি।", "cheṣṭa kôrchhi.", "I am trying."),
      ] },
      { title: "Reacting", items: [
        l("তাই?", "tai?", "Really?"),
        l("ঠিক বলেছেন।", "ṭhik bôlechhen.", "You are right."),
        l("আচ্ছা, আমিও তাই করব।", "achchha, amio tai kôrbo.", "OK, I will do that too."),
      ] },
    ],
    hear: [{ title: "What they say", items: [
      l("কত মালা করেন রোজ?", "kôto mala kôren roj?", "How many rounds do you do daily?"),
      l("ও তো সবারই হয়।", "o to shôbarôi hoy.", "That happens to everyone."),
      l("উঠে দাঁড়িয়ে জপ করুন।", "uṭhe danriye jôp kôrun.", "Stand up and chant."),
      l("নাম ছাড়বেন না।", "nam chharben na.", "Don't give up the Name."),
    ] }],
    demos: [
      { id: "smooth", title: "A hard morning", kind: "smooth", setup: "You are honest, and the devotee answers kindly.",
        turns: [
          them("জয় নিতাই। আজ কত মালা হলো?", "jôy Nitai. aj kôto mala holo?", "Jay Nitāi. How many rounds so far today?"),
          you("জয় নিতাই, প্রভু। দুই মালা। আজ মনটা একদম বসছে না।", "jôy Nitai, prôbhu. dui mala. aj mônṭa ækdôm bôshchhe na.", "Jay Nitāi, Prabhu. Two. My mind just won't settle today."),
          them("ও তো সবারই হয়। ঘুম পাচ্ছে?", "o to shôbarôi hoy. ghum pachchhe?", "That happens to everyone. Are you sleepy?"),
          you("হ্যাঁ, একটু। কী করি?", "hyan, ækṭu. ki kôri?", "Yes, a little. What should I do?"),
          them("উঠে দাঁড়িয়ে জপ করুন। আর নাম ছাড়বেন না।", "uṭhe danriye jôp kôrun. ar nam chharben na.", "Stand up and chant. And never give up the Name."),
          you("আচ্ছা, আমিও তাই করব। ধন্যবাদ, প্রভু।", "achchha, amio tai kôrbo. dhônnobad, prôbhu.", "OK, I will do that too. Thank you, Prabhu."),
        ], takeaway: "Say honestly that it is hard. Devotees answer with a shared experience (“ও তো সবারই হয়”), not a lecture." },
      { id: "wrong", title: "Showing off", kind: "wrong", setup: "You answer like a score card.",
        turns: [
          them("আজ কত মালা হলো?", "aj kôto mala holo?", "How many rounds so far today?"),
          you("আমি আজ ষোলো মালা করেছি। আপনি?", "ami aj shoḷo mala kôrechhi. apni?", "I did sixteen rounds today. And you?"),
          them("আচ্ছা... নিতাইয়ের কৃপা।", "achchha... Nitaiyer kripa.", "I see... by Nitāi's grace."),
        ], takeaway: "Devotees do not compare numbers. Say what you do, say it is by grace, and ask for help rather than praise." },
    ],
  },
  {
    id: "dev-kitchen",
    title: "Service in the kitchen",
    bn: "রান্নাঘরে সেবা",
    blurb: "Offer to help in the ashram kitchen and understand what you are asked to do.",
    situation: "It is nearly time for the offering. You walk into the kitchen and a senior devotee is cooking.",
    goal: "Offer help, ask what to do, and respond naturally to quick instructions.",
    words: words([["রান্নাঘর", "rannaghôr", "kitchen"], ["ভোগ", "bhog", "food offering"], ["সবজি", "shôbji", "vegetables"], ["কুটব", "kuṭbo", "will chop"], ["হাত ধোয়া", "hat dhoya", "washing hands"], ["সেবা", "sheba", "service"]]),
    say: [
      { title: "Offering help", items: [
        l("প্রভু, আমি কি কিছু সাহায্য করতে পারি?", "prôbhu, ami ki kichhu shahajjo kôrte pari?", "Prabhu, may I help with something?"),
        l("কী করব বলুন।", "ki kôrbo bôlun.", "Tell me what to do."),
        l("সবজি কুটে দেব?", "shôbji kuṭe debo?", "Shall I chop the vegetables?"),
        l("আগে হাত ধুয়ে আসি।", "age hat dhuye ashi.", "Let me wash my hands first."),
      ] },
      { title: "Keeping up", items: [
        l("এটা কোথায় রাখব?", "eṭa kothay rakhbo?", "Where should I put this?"),
        l("ঠিক আছে তো?", "ṭhik achhe to?", "Is this all right?"),
        l("আর কিছু লাগবে?", "ar kichhu lagbe?", "Do you need anything else?"),
      ] },
    ],
    hear: [{ title: "What they say", items: [
      l("ভালোই হলো, এসে গেছেন।", "bhaloi holo, eshe gechhen.", "Good, you have come just in time."),
      l("হাত ধুয়ে নিন আগে।", "hat dhuye nin age.", "Wash your hands first."),
      l("এগুলো ছোট ছোট করে কাটুন।", "egulo chhoṭo chhoṭo kôre kaṭun.", "Cut these into small pieces."),
      l("ভোগের আগে কেউ কিছু চাখবেন না।", "bhoger age keu kichhu chakhben na.", "Nobody tastes anything before the offering."),
    ] }],
    demos: [
      { id: "smooth", title: "Lending a hand", kind: "smooth", setup: "You ask, get a job, and check as you go.",
        turns: [
          you("জয় নিতাই, প্রভু। আমি কি কিছু সাহায্য করতে পারি?", "jôy Nitai, prôbhu. ami ki kichhu shahajjo kôrte pari?", "Jay Nitāi, Prabhu. May I help with something?"),
          them("ভালোই হলো, এসে গেছেন। হাত ধুয়ে নিন আগে।", "bhaloi holo, eshe gechhen. hat dhuye nin age.", "Good, you have come just in time. Wash your hands first."),
          you("জি, ধুয়ে এলাম। সবজি কুটে দেব?", "ji, dhuye elam. shôbji kuṭe debo?", "Yes, done. Shall I chop the vegetables?"),
          them("হ্যাঁ, এই বেগুনগুলো ছোট ছোট করে কাটুন।", "hyan, ei begunôgulo chhoṭo chhoṭo kôre kaṭun.", "Yes, cut these eggplants into small pieces."),
          you("এরকম ঠিক আছে তো?", "ei rôkôm ṭhik achhe to?", "Is it fine like this?"),
          them("বাহ্, ঠিক আছে। ভোগের আগে কিন্তু কেউ কিছু চাখবেন না।", "bah, ṭhik achhe. bhoger age kintu keu kichhu chakhben na.", "Great, that is fine. But nobody tastes anything before the offering."),
        ], takeaway: "Offer first, wash your hands, then ask “ঠিক আছে তো?” while you work. Never taste before the offering." },
      { id: "wrong", title: "Tasting the food", kind: "wrong", setup: "You walk in and reach for a spoon.",
        turns: [
          you("কী রান্না হচ্ছে? একটু চেখে দেখি।", "ki ranna hôchchhe? ækṭu chekhe dekhi.", "What are you cooking? Let me taste a little."),
          them("প্রভু, ভোগের আগে চাখা যায় না।", "prôbhu, bhoger age chakha jay na.", "Prabhu, we cannot taste before the offering."),
          you("ও, ক্ষমা করবেন।", "o, kkhoma kôrben.", "Oh, please forgive me."),
        ], takeaway: "Food is for Krishna first. If you slip, a quick “ক্ষমা করবেন” is all that is needed." },
    ],
  },
  {
    id: "dev-ekadashi",
    title: "Ekādaśī and fasting",
    bn: "একাদশীর কথা",
    blurb: "Ask what is permitted on Ekādaśī and say what you plan to eat.",
    situation: "It is the day before Ekādaśī. A devotee friend asks if you are ready.",
    goal: "Ask and answer simple questions about fasting and prasād.",
    words: words([["একাদশী", "ekadôshi", "the eleventh lunar day"], ["উপবাস", "upôbas", "fast"], ["ফল", "phôl", "fruit"], ["ভাত", "bhat", "rice"], ["কাল", "kal", "tomorrow, yesterday"], ["পারণ", "paron", "breaking the fast"]]),
    say: [
      { title: "Asking", items: [
        l("কাল কি একাদশী?", "kal ki ekadôshi?", "Is tomorrow Ekādaśī?"),
        l("একাদশীতে ভাত খাওয়া যায় না, তাই না?", "ekadôshite bhat khaoya jay na, tai na?", "We can't eat rice on Ekādaśī, right?"),
        l("পারণ কখন?", "paron kôkhon?", "When do we break the fast?"),
      ] },
      { title: "Your plan", items: [
        l("আমি আজ রাতে শুধু ফল খাব।", "ami aj rate shudhu phôl khabo.", "Tonight I will have only fruit."),
        l("আমি কাল উপবাস করব।", "ami kal upôbas kôrbo.", "I will fast tomorrow."),
        l("একটু কষ্ট হয়, কিন্তু ভালো লাগে।", "ækṭu kôṣṭo hoy, kintu bhalo lage.", "It is a bit hard, but it feels good."),
      ] },
    ],
    hear: [{ title: "What they say", items: [
      l("কাল একাদশী, মনে আছে তো?", "kal ekadôshi, mône achhe to?", "Tomorrow is Ekādaśī, you remember?"),
      l("ভাত, ডাল আর শস্য নয়।", "bhat, dal ar shôshsho nôy.", "No rice, dal or grains."),
      l("পরশু সকালে পারণ।", "pôroshu shokale paron.", "The fast is broken the day after tomorrow, in the morning."),
      l("শরীর খারাপ হলে জোর করবেন না।", "shôrir kharap hole jor kôrben na.", "If you are unwell, do not force yourself."),
    ] }],
    demos: [
      { id: "smooth", title: "The day before", kind: "smooth", setup: "You check and make a plan together.",
        turns: [
          them("কাল একাদশী, মনে আছে তো?", "kal ekadôshi, mône achhe to?", "Tomorrow is Ekādaśī, you remember?"),
          you("হ্যাঁ, প্রভু। একাদশীতে ভাত খাওয়া যায় না, তাই না?", "hyan, prôbhu. ekadôshite bhat khaoya jay na, tai na?", "Yes, Prabhu. We can't eat rice on Ekādaśī, right?"),
          them("ঠিক। ভাত, ডাল, কিছুই না। ফল আর দুধ চলবে।", "ṭhik. bhat, dal, kichhui na. phôl ar dudh chôlbe.", "Right. No rice, no dal, nothing. Fruit and milk are fine."),
          you("আচ্ছা। আমি আজ রাতে শুধু ফল খাব।", "achchha. ami aj rate shudhu phôl khabo.", "OK. Tonight I will have only fruit."),
          them("বেশ। পারণ পরশু সকালে। শরীর খারাপ হলে জোর করবেন না।", "besh. paron pôroshu shokale. shôrir kharap hole jor kôrben na.", "Good. The fast is broken the day after tomorrow in the morning. If you feel unwell, do not force yourself."),
        ], takeaway: "“তাই না?” turns a statement into a friendly check. Notice খাওয়া যায় না, “cannot be eaten”, the usual way to say what is not allowed." },
      { id: "wrong", title: "Forgetting", kind: "wrong", setup: "You are not sure what the day is.",
        turns: [
          them("কাল একাদশী, মনে আছে তো?", "kal ekadôshi, mône achhe to?", "Tomorrow is Ekādaśī, you remember?"),
          you("একাদশী কী? আমি কাল ভাত খাব।", "ekadôshi ki? ami kal bhat khabo.", "What is Ekādaśī? I will eat rice tomorrow."),
          them("প্রভু, একাদশীতে ভাত খাওয়া যায় না। আমি বুঝিয়ে দিচ্ছি।", "prôbhu, ekadôshite bhat khaoya jay na. ami bujhiye dichchhi.", "Prabhu, rice is not eaten on Ekādaśī. Let me explain."),
        ], takeaway: "If you do not know, ask “আমাকে বুঝিয়ে দিন” rather than announcing your plan." },
    ],
  },
  {
    id: "dev-dikkha",
    title: "Asking about initiation",
    bn: "দীক্ষার কথা",
    blurb: "Raise the subject of dīkṣā with respect and understand the answer.",
    situation: "After kīrtan you sit with a senior devotee you trust, and you want to ask about taking initiation.",
    goal: "Ask a sensitive question gently and listen to the answer.",
    words: words([["দীক্ষা", "dikkha", "initiation"], ["গুরুদেব", "gurudev", "spiritual master"], ["কৃপা", "kripa", "grace"], ["প্রস্তুত", "prôstuto", "ready"], ["সময়", "shômôy", "time"], ["আশ্রয়", "ashrôy", "shelter"]]),
    say: [
      { title: "Asking gently", items: [
        l("প্রভু, একটা কথা জিজ্ঞেস করব?", "prôbhu, ækṭa kôtha jiggesh kôrbo?", "Prabhu, may I ask you something?"),
        l("আমার দীক্ষা নেওয়ার ইচ্ছে আছে।", "amar dikkha neoyar ichchhe achhe.", "I have a wish to take initiation."),
        l("আমি কি প্রস্তুত?", "ami ki prôstuto?", "Am I ready?"),
        l("আমাকে কী করতে হবে?", "amake ki kôrte hôbe?", "What do I need to do?"),
      ] },
      { title: "Receiving the answer", items: [
        l("আমি বুঝতে পারছি।", "ami bujhte parchhi.", "I understand."),
        l("আমি অপেক্ষা করব।", "ami opekkha kôrbo.", "I will wait."),
        l("আপনার আশীর্বাদ চাই।", "apnar ashirbad chai.", "I ask for your blessing."),
      ] },
    ],
    hear: [{ title: "What they say", items: [
      l("বলুন না, কী কথা?", "bôlun na, ki kôtha?", "Go on, what is it?"),
      l("এটা খুব ভালো কথা।", "eṭa khub bhalo kôtha.", "That is a very good thing."),
      l("সময় হলে নিজেই বুঝবেন।", "shômôy hole nijei bujhben.", "When the time comes, you will know yourself."),
      l("আগে নিয়মিত জপ আর সঙ্গ করুন।", "age niyômito jôp ar shônggo kôrun.", "First keep up your japa and association regularly."),
    ] }],
    demos: [
      { id: "smooth", title: "A quiet talk", kind: "smooth", setup: "You ask gently and accept the answer.",
        turns: [
          you("প্রভু, একটা কথা জিজ্ঞেস করব?", "prôbhu, ækṭa kôtha jiggesh kôrbo?", "Prabhu, may I ask you something?"),
          them("বলুন না, কী কথা?", "bôlun na, ki kôtha?", "Go on, what is it?"),
          you("আমার দীক্ষা নেওয়ার ইচ্ছে আছে। আমি কি প্রস্তুত?", "amar dikkha neoyar ichchhe achhe. ami ki prôstuto?", "I have a wish to take initiation. Am I ready?"),
          them("এটা খুব ভালো কথা। সময় হলে নিজেই বুঝবেন। আগে নিয়মিত জপ আর সঙ্গ করুন।", "eṭa khub bhalo kôtha. shômôy hole nijei bujhben. age niyômito jôp ar shônggo kôrun.", "That is a very good thing. When the time comes you will know yourself. First keep up your japa and association regularly."),
          you("আমি বুঝতে পারছি। আমি অপেক্ষা করব। আপনার আশীর্বাদ চাই।", "ami bujhte parchhi. ami opekkha kôrbo. apnar ashirbad chai.", "I understand. I will wait. I ask for your blessing."),
        ], takeaway: "“একটা কথা জিজ্ঞেস করব?” asks permission before a serious question. The answer is not a yes or no, so accept it with “আমি অপেক্ষা করব”." },
      { id: "wrong", title: "Too direct", kind: "wrong", setup: "You ask as if booking a ticket.",
        turns: [
          you("আমার দীক্ষা কবে হবে? তাড়াতাড়ি বলুন।", "amar dikkha kôbe hôbe? taratari bôlun.", "When will I be initiated? Tell me quickly."),
          them("প্রভু, দীক্ষা তো তাড়াহুড়োর জিনিস নয়।", "prôbhu, dikkha to tarahuṛor jinish nôy.", "Prabhu, initiation is not a thing to rush."),
        ], takeaway: "Ask whether you are ready, not when. It is not a date to book." },
    ],
  },
  {
    id: "dev-phone",
    title: "A phone call to a devotee",
    bn: "ফোনে কথা",
    blurb: "Call a devotee friend, ask if it is a good time, and arrange to meet.",
    situation: "You call a devotee friend to ask about the evening kīrtan. Phone talk is quick and a little casual.",
    goal: "Open and close a call politely and make a simple plan.",
    words: words([["ফোন", "phon", "phone"], ["সন্ধ্যা", "shôndhya", "evening"], ["সময়", "shômôy", "time"], ["দেখা", "dekha", "meeting, seeing"], ["আসব", "ashbo", "I will come"], ["রাখি", "rakhi", "I will hang up (lit. keep)"]]),
    say: [
      { title: "Opening", items: [
        l("জয় নিতাই! আমি বলছি, আপনার কি এখন সময় হবে?", "jôy Nitai! ami bôlchhi, apnar ki ekhôn shômôy hôbe?", "Jay Nitāi! It's me. Do you have time now?"),
        l("ডিস্টার্ব করলাম না তো?", "disṭarb kôrlam na to?", "I hope I'm not disturbing you?"),
      ] },
      { title: "Planning", items: [
        l("আজ সন্ধ্যায় কীর্তন কখন শুরু?", "aj shôndhyay kirtôn kôkhon shuru?", "What time does kīrtan start this evening?"),
        l("আমি ছ'টার মধ্যে পৌঁছে যাব।", "ami chhôṭar môddhe pounchhe jabo.", "I will get there by six."),
        l("তাহলে ওখানেই দেখা হবে।", "tahôle okhanei dekha hôbe.", "Then we will meet there."),
      ] },
      { title: "Closing", items: [
        l("আচ্ছা, তাহলে রাখি। জয় নিতাই!", "achchha, tahôle rakhi. jôy Nitai!", "OK then, I'll hang up. Jay Nitāi!"),
        l("সাবধানে আসবেন।", "shabdhane ashben.", "Come safely."),
      ] },
    ],
    hear: [{ title: "What they say", items: [
      l("হ্যাঁ, বলুন, বলুন।", "hyan, bôlun, bôlun.", "Yes, go ahead."),
      l("না না, কিছু না। বলুন।", "na na, kichhu na. bôlun.", "No no, not at all. Go on."),
      l("সাড়ে ছ'টায় শুরু।", "shaṛe chhôṭay shuru.", "It starts at half past six."),
      l("ঠিক আছে, দেখা হচ্ছে।", "ṭhik achhe, dekha hôchchhe.", "All right, see you."),
    ] }],
    demos: [
      { id: "smooth", title: "A short call", kind: "smooth", setup: "You are brief, polite and clear.",
        turns: [
          you("জয় নিতাই, প্রভু! আমি বলছি। ডিস্টার্ব করলাম না তো?", "jôy Nitai, prôbhu! ami bôlchhi. disṭarb kôrlam na to?", "Jay Nitāi, Prabhu! It's me. I hope I'm not disturbing you?"),
          them("না না, কিছু না। বলুন।", "na na, kichhu na. bôlun.", "No no, not at all. Go on."),
          you("আজ সন্ধ্যায় কীর্তন কখন শুরু?", "aj shôndhyay kirtôn kôkhon shuru?", "What time does kīrtan start this evening?"),
          them("সাড়ে ছ'টায়। আসছেন তো?", "shaṛe chhôṭay. ashchhen to?", "Half past six. You are coming, aren't you?"),
          you("হ্যাঁ, আমি ছ'টার মধ্যে পৌঁছে যাব। তাহলে ওখানেই দেখা হবে।", "hyan, ami chhôṭar môddhe pounchhe jabo. tahôle okhanei dekha hôbe.", "Yes, I will get there by six. Then we will meet there."),
          them("ঠিক আছে, দেখা হচ্ছে। জয় নিতাই!", "ṭhik achhe, dekha hôchchhe. jôy Nitai!", "All right, see you. Jay Nitāi!"),
          you("জয় নিতাই! তাহলে রাখি।", "jôy Nitai! tahôle rakhi.", "Jay Nitāi! I'll hang up, then."),
        ], takeaway: "Say who you are, check the time (“ডিস্টার্ব করলাম না তো?”), then ask one thing at a time. Close with “তাহলে রাখি”." },
      { id: "wrong", title: "No greeting, no ending", kind: "wrong", setup: "You start and stop abruptly.",
        turns: [
          you("কীর্তন কখন?", "kirtôn kôkhon?", "When is kīrtan?"),
          them("হ্যালো? কে বলছেন?", "hyalo? ke bôlchhen?", "Hello? Who is speaking?"),
          you("আমি। সাড়ে ছ'টা? ঠিক আছে।", "ami. shaṛe chhôṭa? ṭhik achhe.", "Me. Half past six? OK."),
        ], takeaway: "Greet first and say your name. On the phone “কে বলছেন?” (who is speaking?) is what you will hear if you do not." },
    ],
  },
  {
    id: "dev-dham",
    title: "Planning a Navadvīp visit",
    bn: "নবদ্বীপ যাত্রা",
    blurb: "Plan a pilgrimage: when to go, how to get there, where to stay and what to see.",
    situation: "You and a devotee friend are planning a trip to Navadvīp over a cup of tea.",
    goal: "Suggest, agree and ask practical questions in natural, quick sentences.",
    words: words([["নবদ্বীপ", "Nôbodwip", "Navadvīp"], ["ট্রেন", "ṭren", "train"], ["টিকিট", "ṭikiṭ", "ticket"], ["থাকা", "thaka", "to stay"], ["পরিক্রমা", "pôrikroma", "circumambulation of the dhām"], ["গঙ্গা", "gôngga", "the Ganges"]]),
    say: [
      { title: "Suggesting", items: [
        l("চলুন, এবার নবদ্বীপ যাই।", "chôlun, ebar Nôbodwip jai.", "Let's go to Navadvīp this time."),
        l("কবে যাবেন?", "kôbe jaben?", "When will you go?"),
        l("আমি শনিবার যেতে পারি।", "ami shônibar jete pari.", "I can go on Saturday."),
      ] },
      { title: "Practical questions", items: [
        l("ট্রেনে যাব, না বাসে?", "ṭrene jabo, na base?", "Shall we go by train or bus?"),
        l("কোথায় থাকব?", "kothay thakbo?", "Where shall we stay?"),
        l("টিকিট কে কাটবে?", "ṭikiṭ ke kaṭbe?", "Who will buy the tickets?"),
        l("পরিক্রমা কি একদিনে হয়?", "pôrikroma ki ækdine hoy?", "Can the parikramā be done in a day?"),
      ] },
      { title: "Agreeing", items: [
        l("খুব ভালো হবে।", "khub bhalo hôbe.", "That will be very nice."),
        l("আমি সব দেখব ঠিক করে।", "ami shôb dekhbo ṭhik kôre.", "I will sort everything out."),
      ] },
    ],
    hear: [{ title: "What they say", items: [
      l("কবে যাবেন ভাবছেন?", "kôbe jaben bhabchhen?", "When are you thinking of going?"),
      l("ট্রেনই ভালো, সকাল সকাল ছাড়ে।", "ṭrenoi bhalo, shokal shokal chhaṛe.", "The train is better, it leaves early."),
      l("আশ্রমে থাকার ব্যবস্থা আছে।", "ashrome thakar byabôstha achhe.", "There is a place to stay at the ashram."),
      l("একদিনে হবে না, দুদিন লাগবে।", "ækdine hôbe na, dudin lagbe.", "It won't work in one day, it will take two."),
    ] }],
    demos: [
      { id: "smooth", title: "Over tea", kind: "smooth", setup: "You plan together, quickly and warmly.",
        turns: [
          you("প্রভু, চলুন, এবার নবদ্বীপ যাই।", "prôbhu, chôlun, ebar Nôbodwip jai.", "Prabhu, let's go to Navadvīp this time."),
          them("খুব ভালো কথা। কবে যাবেন ভাবছেন?", "khub bhalo kôtha. kôbe jaben bhabchhen?", "A very good idea. When are you thinking of going?"),
          you("আমি শনিবার যেতে পারি। ট্রেনে যাব, না বাসে?", "ami shônibar jete pari. ṭrene jabo, na base?", "I can go on Saturday. Shall we go by train or bus?"),
          them("ট্রেনই ভালো, সকাল সকাল ছাড়ে।", "ṭrenoi bhalo, shokal shokal chhaṛe.", "The train is better, it leaves early."),
          you("আর কোথায় থাকব?", "ar kothay thakbo?", "And where shall we stay?"),
          them("আশ্রমে থাকার ব্যবস্থা আছে। পরিক্রমা একদিনে হবে না, দুদিন লাগবে।", "ashrome thakar byabôstha achhe. pôrikroma ækdine hôbe na, dudin lagbe.", "There is a place to stay at the ashram. The parikramā won't fit in one day, it takes two."),
          you("আচ্ছা, আমি টিকিট দেখব। খুব ভালো হবে!", "achchha, ami ṭikiṭ dekhbo. khub bhalo hôbe!", "OK, I will see to the tickets. It will be wonderful!"),
        ], takeaway: "“…না…?” offers a choice (“train, or bus?”). “…ভাবছেন?” and “…ভাবছি” are the natural way to talk about plans." },
      { id: "wrong", title: "Ordering around", kind: "wrong", setup: "You announce the plan instead of suggesting it.",
        turns: [
          you("আমরা শনিবার নবদ্বীপ যাব। টিকিট কাটো।", "amra shônibar Nôbodwip jabo. ṭikiṭ kaṭo.", "We are going to Navadvīp on Saturday. Buy the tickets."),
          them("আচ্ছা... আমি একটু দেখি।", "achchha... ami ækṭu dekhi.", "Well... let me see."),
        ], takeaway: "Suggest with “চলুন... যাই”, ask “কবে যাবেন?”, and never give orders with তুমি to a senior." },
    ],
  },
];
