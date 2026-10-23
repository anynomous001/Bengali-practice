// Role plays for speech therapists and other professionals who work with Bengali-speaking (Kolkata) families.
// Written for this app: every Bengali line needs the teacher's review before students rely on it.
// Parents are spoken to as আপনি. Young children are spoken to as তুমি. The child says আমি and uses short, simple sentences.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.
import type { Scenario, Turn } from "./roleplay";

const you = (bn: string, ro: string, en: string): Turn => ({ who: "you", line: [bn, ro, en] });
const them = (bn: string, ro: string, en: string): Turn => ({ who: "them", line: [bn, ro, en] });

export const CLINICAL_SCENARIOS: Scenario[] = [
  {
    id: "clinical-intake",
    title: "Meeting a family: the first interview",
    bn: "পরিবারের সঙ্গে প্রথম কথা",
    blurb: "Greet a parent, ask about the child and how he speaks, and listen to their worries.",
    situation: "You are a speech therapist. A mother has brought her four-year-old son to a first appointment. She is from Kolkata and is more comfortable in Bengali than in English.",
    goal: "Greet her politely with আপনি, ask the child's name and age, when he first spoke, whether he understands and hears well, and which languages are spoken at home.",
    words: [
      ["থেরাপিস্ট", "therapist", "therapist"], ["ছেলে", "chhele", "son; boy"], ["বয়স", "boyosh", "age"], ["প্রথম", "prothom", "first"],
      ["কথা বলা", "kotha bola", "to speak"], ["বোঝা", "bojha", "to understand"], ["শোনা", "shona", "to hear"], ["স্পষ্ট", "sposhto", "clear"],
      ["ভাষা", "bhasha", "language"], ["চিন্তা", "chinta", "worry"], ["আবার", "abar", "again"], ["আস্তে", "aste", "slowly"],
      ["বছর", "bochhor", "year"], ["বাড়ি", "bari", "home"],
    ],
    say: [
      { title: "Greeting and starting", note: "Use আপনি with a parent you have just met. It is never rude.", items: [
        ["নমস্কার, আমি থেরাপিস্ট।", "nomoshkar, ami therapist.", "Hello, I am the therapist."],
        ["আপনি বসুন।", "apni boshun.", "Please sit down."],
        ["আপনার ছেলের নাম কী?", "apnar chheler nam ki?", "What is your son's name?"],
        ["ওর বয়স কত?", "or boyosh koto?", "How old is he?"],
      ] },
      { title: "Asking about speech and hearing", items: [
        ["ও কবে প্রথম কথা বলেছিল?", "o kobe prothom kotha bolechhilo?", "When did he first speak?"],
        ["ও কি আপনার কথা বোঝে?", "o ki apnar kotha bojhe?", "Does he understand what you say?"],
        ["ওর কথা কি স্পষ্ট?", "or kotha ki sposhto?", "Is his speech clear?"],
        ["ও কি কানে ভালো শোনে?", "o ki kane bhalo shone?", "Does he hear well?"],
        ["বাড়িতে আপনারা কোন ভাষায় কথা বলেন?", "barite apnara kon bhashay kotha bolen?", "Which language do you speak at home?"],
      ] },
      { title: "Listening and closing", items: [
        ["আপনার কী চিন্তা হচ্ছে?", "apnar ki chinta hochchhe?", "What worries you?"],
        ["আমি ঠিক বুঝলাম না। আবার বলবেন?", "ami thik bujhlam na. abar bolben?", "I did not quite understand. Could you say it again?"],
        ["একটু আস্তে বলবেন?", "ektu aste bolben?", "Could you speak a little slower?"],
        ["ধন্যবাদ, আজ এই পর্যন্ত।", "dhonyobad, aj ei porjonto.", "Thank you, that is enough for today."],
      ] },
    ],
    hear: [
      { title: "What the mother may say", items: [
        ["ওর নাম অর্ণব। ওর বয়স চার বছর।", "or nam arnob. or boyosh char bochhor.", "His name is Arnab. He is four years old."],
        ["ও দেড় বছর বয়সে প্রথম কথা বলেছিল।", "o der bochhor boyoshe prothom kotha bolechhilo.", "He first spoke at one and a half."],
        ["ও আমার কথা সব বোঝে, কিন্তু কম বলে।", "o amar kotha shob bojhe, kintu kom bole.", "He understands everything I say, but speaks little."],
        ["অন্যরা ওর কথা বুঝতে পারে না।", "onyora or kotha bujhte pare na.", "Other people cannot understand him."],
        ["বাড়িতে আমরা বাংলা আর ইংরেজি দুটোই বলি।", "barite amra bangla ar ingreji duto-i boli.", "At home we speak both Bengali and English."],
        ["ওর কান নিয়ে আমার চিন্তা হয়।", "or kan niye amar chinta hoy.", "I am worried about his ears."],
        ["ও স্কুলে কারো সঙ্গে কথা বলে না।", "o skule karo shonge kotha bole na.", "He does not talk to anyone at school."],
      ] },
    ],
    demos: [
      { id: "first-interview", title: "Everything goes well: the first interview", kind: "smooth", setup: "The mother sits down with her son. You start the interview.", turns: [
        you("নমস্কার, আমি থেরাপিস্ট। আপনি বসুন।", "nomoshkar, ami therapist. apni boshun.", "Hello, I am the therapist. Please sit down."),
        them("নমস্কার। ধন্যবাদ।", "nomoshkar. dhonyobad.", "Hello. Thank you."),
        you("আপনার ছেলের নাম কী? ওর বয়স কত?", "apnar chheler nam ki? or boyosh koto?", "What is your son's name? How old is he?"),
        them("ওর নাম অর্ণব। ওর বয়স চার বছর।", "or nam arnob. or boyosh char bochhor.", "His name is Arnab. He is four years old."),
        you("ও কবে প্রথম কথা বলেছিল?", "o kobe prothom kotha bolechhilo?", "When did he first speak?"),
        them("দেড় বছর বয়সে। কিন্তু এখন কম বলে।", "der bochhor boyoshe. kintu ekhon kom bole.", "At one and a half. But he speaks little now."),
        you("ও কি আপনার কথা বোঝে?", "o ki apnar kotha bojhe?", "Does he understand what you say?"),
        them("হ্যাঁ, সব বোঝে। কিন্তু অন্যরা ওর কথা বুঝতে পারে না।", "hyan, shob bojhe. kintu onyora or kotha bujhte pare na.", "Yes, everything. But other people cannot understand him."),
        you("আপনার কী চিন্তা হচ্ছে?", "apnar ki chinta hochchhe?", "What worries you?"),
        them("স্কুলে ও কারো সঙ্গে কথা বলে না।", "skule o karo shonge kotha bole na.", "At school he does not talk to anyone."),
        you("ধন্যবাদ। আমি আজ ওর সঙ্গে একটু খেলব।", "dhonyobad. ami aj or shonge ektu khelbo.", "Thank you. I will play with him a little today."),
      ], takeaway: "Start with the child's name and age, then ask about speech in short questions. Say আপনি to the parent and ওর when you speak about the child." },
      { id: "not-understood", title: "Things go wrong: you do not understand the answer", kind: "wrong", setup: "The mother answers quickly and you lose the thread.", turns: [
        you("বাড়িতে আপনারা কোন ভাষায় কথা বলেন?", "barite apnara kon bhashay kotha bolen?", "Which language do you speak at home?"),
        them("আমরা বাংলা বলি, কিন্তু ওর বাবা ইংরেজিতে বেশি কথা বলে, আর ঠাকুমা শুধু বাংলা বলে।", "amra bangla boli, kintu or baba ingrejite beshi kotha bole, ar thakuma shudhu bangla bole.", "We speak Bengali, but his father speaks more English, and his grandmother speaks only Bengali."),
        you("আমি ঠিক বুঝলাম না। একটু আস্তে বলবেন?", "ami thik bujhlam na. ektu aste bolben?", "I did not quite understand. Could you speak a little slower?"),
        them("ঠিক আছে। আমি আর ওর ঠাকুমা বাংলা বলি। ওর বাবা ইংরেজি বলে।", "thik achhe. ami ar or thakuma bangla boli. or baba ingreji bole.", "All right. His grandmother and I speak Bengali. His father speaks English."),
        you("ও, বুঝেছি। ধন্যবাদ।", "o, bujhechhi. dhonyobad.", "Oh, I see. Thank you."),
      ], takeaway: "Never nod along if you did not understand. Say \"একটু আস্তে বলবেন?\" Parents are glad that you are trying." },
    ],
  },
  {
    id: "clinical-session",
    title: "Working with a child",
    bn: "শিশুর সঙ্গে সেশন",
    blurb: "Get a child's attention, give mouth and sound exercises, and praise the effort.",
    situation: "You are in the therapy room with Arnab, who is five. He is shy. You speak to him as তুমি, in short, friendly sentences.",
    goal: "Get his attention, give two mouth exercises and a sound game, keep him trying when he says he cannot, and finish the session on a happy note.",
    words: [
      ["তাকানো", "takano", "to look"], ["জিভ", "jibh", "tongue"], ["ঠোঁট", "thont", "lip"], ["ফুঁ দেওয়া", "phun deoya", "to blow"],
      ["শ্বাস", "shash", "breath"], ["আবার", "abar", "again"], ["আস্তে", "aste", "slowly"], ["একা", "eka", "alone; on your own"],
      ["খেলা", "khela", "play; a game"], ["ছবি", "chhobi", "picture"], ["সাবাশ", "shabash", "well done"], ["চেষ্টা", "cheshta", "effort; a try"],
      ["ক্লান্ত", "klanto", "tired"], ["শেষ", "shesh", "end; finished"],
    ],
    say: [
      { title: "Getting started", note: "To a child, say তুমি and short commands. A friendly tone matters more than the exact words.", items: [
        ["নমস্কার! তোমার নাম কী?", "nomoshkar! tomar nam ki?", "Hello! What is your name?"],
        ["আমার পাশে বসো।", "amar pashe boso.", "Sit next to me."],
        ["আমার দিকে তাকাও।", "amar dike takao.", "Look at me."],
        ["আজ আমরা খেলব।", "aj amra khelbo.", "Today we will play."],
      ] },
      { title: "Mouth exercises", items: [
        ["মুখ খোলো।", "mukh kholo.", "Open your mouth."],
        ["জিভ বের করো।", "jibh ber koro.", "Stick out your tongue."],
        ["জিভটা ওপরে তোলো।", "jibhta opore tolo.", "Lift your tongue up."],
        ["ঠোঁট বন্ধ করো, তারপর খোলো।", "thont bondho koro, tarpor kholo.", "Close your lips, then open them."],
        ["জোরে ফুঁ দাও।", "jore phun dao.", "Blow hard."],
        ["গভীর শ্বাস নাও।", "gobhir shash nao.", "Take a deep breath."],
      ] },
      { title: "Sounds and words", items: [
        ["আমার সঙ্গে বলো: মা।", "amar shonge bolo: ma.", "Say it with me: ma."],
        ["আবার বলো।", "abar bolo.", "Say it again."],
        ["আস্তে আস্তে বলো।", "aste aste bolo.", "Say it slowly."],
        ["এবার তুমি একা বলো।", "ebar tumi eka bolo.", "Now you say it on your own."],
        ["এটা কী? ছবিটা দেখে বলো।", "eta ki? chhobita dekhe bolo.", "What is this? Look at the picture and say."],
      ] },
      { title: "Praise and ending", items: [
        ["সাবাশ! খুব ভালো হয়েছে।", "shabash! khub bhalo hoyechhe.", "Well done! That was very good."],
        ["আরেকবার চেষ্টা করো।", "arekbar cheshta koro.", "Try one more time."],
        ["তুমি দারুণ করেছ!", "tumi darun korechho!", "You did great!"],
        ["আজ আমাদের খেলা শেষ।", "aj amader khela shesh.", "Our game is finished for today."],
        ["পরের সপ্তাহে আবার খেলব।", "porer shoptahe abar khelbo.", "We will play again next week."],
      ] },
    ],
    hear: [
      { title: "What the child may say", note: "Children use short sentences and say আমি for I.", items: [
        ["আমার নাম অর্ণব।", "amar nam arnob.", "My name is Arnab."],
        ["আমি খেলব।", "ami khelbo.", "I will play."],
        ["এটা মা।", "eta ma.", "This is Mum."],
        ["আমি পারি না।", "ami pari na.", "I can't."],
        ["আমার ক্লান্ত লাগছে।", "amar klanto lagchhe.", "I feel tired."],
        ["আমি আবার করব?", "ami abar korbo?", "Shall I do it again?"],
        ["আমি আর পারব না।", "ami ar parbo na.", "I can't do any more."],
      ] },
    ],
    demos: [
      { id: "session-flow", title: "Everything goes well: a short session", kind: "smooth", setup: "Arnab sits down. You start with a warm-up.", turns: [
        you("নমস্কার! তোমার নাম কী?", "nomoshkar! tomar nam ki?", "Hello! What is your name?"),
        them("আমার নাম অর্ণব।", "amar nam arnob.", "My name is Arnab."),
        you("আজ আমরা খেলব। আমার দিকে তাকাও।", "aj amra khelbo. amar dike takao.", "Today we will play. Look at me."),
        them("আমি খেলব।", "ami khelbo.", "I will play."),
        you("মুখ খোলো। জিভ বের করো।", "mukh kholo. jibh ber koro.", "Open your mouth. Stick out your tongue."),
        you("সাবাশ! এবার জিভটা ওপরে তোলো।", "shabash! ebar jibhta opore tolo.", "Well done! Now lift your tongue up."),
        you("আমার সঙ্গে বলো: মা।", "amar shonge bolo: ma.", "Say it with me: ma."),
        them("মা।", "ma.", "Ma."),
        you("সাবাশ! এবার তুমি একা বলো।", "shabash! ebar tumi eka bolo.", "Well done! Now say it on your own."),
        them("মা!", "ma!", "Ma!"),
        you("তুমি দারুণ করেছ! আজ আমাদের খেলা শেষ।", "tumi darun korechho! aj amader khela shesh.", "You did great! Our game is finished for today."),
      ], takeaway: "Keep each instruction short. Model first (\"আমার সঙ্গে বলো\"), then ask for the child alone (\"এবার তুমি একা বলো\"). Praise every try." },
      { id: "i-cant", title: "Things go wrong: the child says he cannot", kind: "wrong", setup: "Arnab gets tired and says he cannot do it.", turns: [
        you("আস্তে আস্তে বলো।", "aste aste bolo.", "Say it slowly."),
        them("আমি পারি না।", "ami pari na.", "I can't."),
        you("ঠিক আছে। আমি আগে বলি, তারপর তুমি বলো।", "thik achhe. ami age boli, tarpor tumi bolo.", "That is all right. I will say it first, then you say it."),
        them("আমার ক্লান্ত লাগছে।", "amar klanto lagchhe.", "I feel tired."),
        you("আমরা একটু খেলি। তারপর আরেকবার চেষ্টা করো।", "amra ektu kheli. tarpor arekbar cheshta koro.", "Let us play a little. Then try one more time."),
        them("আমি আবার করব?", "ami abar korbo?", "Shall I do it again?"),
        you("হ্যাঁ। সাবাশ, তুমি চেষ্টা করছ!", "hyan. shabash, tumi cheshta korchho!", "Yes. Well done, you are trying!"),
      ], takeaway: "Do not say it is wrong. Say it first yourself, offer a short game, and praise the effort (\"তুমি চেষ্টা করছ\")." },
    ],
  },
  {
    id: "clinical-home",
    title: "Explaining home practice to a parent",
    bn: "বাড়িতে অনুশীলন",
    blurb: "Say how the session went, give simple exercises for home and agree the next visit.",
    situation: "The session is over. Arnab's mother waits to hear how it went and what to do at home.",
    goal: "Say how the session went, give two simple home exercises and how often, calm a worry, and agree the next appointment.",
    words: [
      ["উন্নতি", "unnoti", "progress"], ["অনুশীলন", "onushilon", "practice"], ["রোজ", "roj", "every day"], ["মিনিট", "minit", "minute"],
      ["ছবির বই", "chhobir boi", "picture book"], ["প্রশংসা", "proshongsha", "praise"], ["বকা", "boka", "to scold"], ["সমস্যা", "shomoshya", "problem"],
      ["ধৈর্য", "dhoirjo", "patience"], ["সময়", "shomoy", "time"], ["প্রশ্ন", "proshno", "question"], ["পরের সপ্তাহ", "porer shoptaho", "next week"],
      ["খেলা", "khela", "game"], ["ফোন", "phon", "phone"],
    ],
    say: [
      { title: "How it went", note: "Say আপনি to the parent. Start with something good before you talk about what is hard.", items: [
        ["আজ ও খুব ভালো করেছে।", "aj o khub bhalo korechhe.", "He did very well today."],
        ["ও নতুন একটা শব্দ শিখেছে।", "o notun ekta shobdo shikhechhe.", "He learned a new word."],
        ["ধীরে ধীরে উন্নতি হচ্ছে।", "dhire dhire unnoti hochchhe.", "He is improving slowly."],
        ["চিন্তা করবেন না।", "chinta korben na.", "Please do not worry."],
      ] },
      { title: "Home practice", items: [
        ["বাড়িতে রোজ দশ মিনিট অনুশীলন করবেন।", "barite roj dosh minit onushilon korben.", "Please practise ten minutes a day at home."],
        ["ছবির বই দেখে একসঙ্গে কথা বলবেন।", "chhobir boi dekhe ekshonge kotha bolben.", "Look at a picture book and talk together."],
        ["ও ভুল বললে বকবেন না।", "o bhul bolle bokben na.", "If he says it wrong, please do not scold him."],
        ["শুধু ঠিকটা আস্তে আবার বলে দেবেন।", "shudhu thikta aste abar bole deben.", "Just say the right word slowly again."],
        ["ভালো করলে প্রশংসা করবেন।", "bhalo korle proshongsha korben.", "Praise him when he does well."],
      ] },
      { title: "Next steps", items: [
        ["পরের সপ্তাহে একই সময়ে আসবেন।", "porer shoptahe ekoi shomoye ashben.", "Please come next week at the same time."],
        ["আপনার কোনো প্রশ্ন আছে?", "apnar kono proshno achhe?", "Do you have any questions?"],
        ["কিছু সমস্যা হলে আমাকে ফোন করবেন।", "kichhu shomoshya hole amake phon korben.", "If there is any problem, please call me."],
        ["ধৈর্য ধরুন, সময় লাগবে।", "dhoirjo dhorun, shomoy lagbe.", "Please be patient, it will take time."],
      ] },
    ],
    hear: [
      { title: "What the mother may say", items: [
        ["আজ ও কেমন করল?", "aj o kemon korlo?", "How did he do today?"],
        ["বাড়িতে আমি কী করব?", "barite ami ki korbo?", "What should I do at home?"],
        ["কতক্ষণ করাতে হবে?", "kotokkhon korate hobe?", "How long should I do it with him?"],
        ["ও বাড়িতে করতে চায় না।", "o barite korte chay na.", "He does not want to do it at home."],
        ["ও কি ঠিক হয়ে যাবে?", "o ki thik hoye jabe?", "Will he be all right?"],
        ["পরের বার কবে আসব?", "porer bar kobe ashbo?", "When shall I come next time?"],
      ] },
    ],
    demos: [
      { id: "home-plan", title: "Everything goes well: the home plan", kind: "smooth", setup: "You sit with the mother at the end of the session.", turns: [
        them("আজ ও কেমন করল?", "aj o kemon korlo?", "How did he do today?"),
        you("আজ ও খুব ভালো করেছে। ও নতুন একটা শব্দ শিখেছে।", "aj o khub bhalo korechhe. o notun ekta shobdo shikhechhe.", "He did very well today. He learned a new word."),
        them("বাড়িতে আমি কী করব?", "barite ami ki korbo?", "What should I do at home?"),
        you("বাড়িতে রোজ দশ মিনিট অনুশীলন করবেন। ছবির বই দেখে একসঙ্গে কথা বলবেন।", "barite roj dosh minit onushilon korben. chhobir boi dekhe ekshonge kotha bolben.", "Please practise ten minutes a day at home. Look at a picture book and talk together."),
        them("ও ভুল বললে কী করব?", "o bhul bolle ki korbo?", "What should I do if he says it wrong?"),
        you("বকবেন না। শুধু ঠিকটা আস্তে আবার বলে দেবেন। ভালো করলে প্রশংসা করবেন।", "bokben na. shudhu thikta aste abar bole deben. bhalo korle proshongsha korben.", "Please do not scold him. Just say the right word slowly again. Praise him when he does well."),
        them("পরের বার কবে আসব?", "porer bar kobe ashbo?", "When shall I come next time?"),
        you("পরের সপ্তাহে একই সময়ে আসবেন। আপনার কোনো প্রশ্ন আছে?", "porer shoptahe ekoi shomoye ashben. apnar kono proshno achhe?", "Please come next week at the same time. Do you have any questions?"),
        them("না, ধন্যবাদ।", "na, dhonyobad.", "No, thank you."),
      ], takeaway: "Give one or two exercises, say how long, and say what to do when he makes a mistake. Parents want something small they can actually do." },
      { id: "no-practice", title: "Things go wrong: the child will not practise at home", kind: "wrong", setup: "The mother says her son refuses to do the exercises.", turns: [
        them("ও বাড়িতে করতে চায় না।", "o barite korte chay na.", "He does not want to do it at home."),
        you("চিন্তা করবেন না। ওকে খেলার মতো করে করাবেন।", "chinta korben na. oke khelar moto kore korabben.", "Please do not worry. Do it with him like a game."),
        them("ও কি ঠিক হয়ে যাবে?", "o ki thik hoye jabe?", "Will he be all right?"),
        you("ধীরে ধীরে উন্নতি হচ্ছে। ধৈর্য ধরুন, সময় লাগবে।", "dhire dhire unnoti hochchhe. dhoirjo dhorun, shomoy lagbe.", "He is improving slowly. Please be patient, it will take time."),
        you("কিছু সমস্যা হলে আমাকে ফোন করবেন।", "kichhu shomoshya hole amake phon korben.", "If there is any problem, please call me."),
      ], takeaway: "Do not promise results. Say that progress is coming and that it takes time (\"সময় লাগবে\"), and offer an easy next step." },
    ],
  },
];
