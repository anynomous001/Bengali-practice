// More business role plays, in the short, spoken style of a real phone call or a chat in the office. You are the owner or manager; the other person is a client, a supplier or a team member.
// Everyone is addressed as আপনি. Written for this app: the Bengali needs review by a native speaker from Bangladesh.
// Only import this from server code (pages/actions) so the text is never in the public JS bundle.
import type { Scenario, Turn, RWord } from "./roleplay";

const you = (bn: string, ro: string, en: string): Turn => ({ who: "you", line: [bn, ro, en] });
const them = (bn: string, ro: string, en: string): Turn => ({ who: "them", line: [bn, ro, en] });
const w = (bn: string, ro: string, en: string): RWord => [bn, ro, en];
/** Lines from a demo by position (the first line is 0), so the phrase lists repeat the dialogue exactly. */
const pick = (turns: Turn[], at: number[]): RWord[] => at.map((i) => turns[i].line);
const wrong = (setup: string, turns: Turn[], takeaway: string) => ({ id: "wrong", title: "What to avoid", kind: "wrong" as const, setup, turns, takeaway });

// ---- 1. The example from the teacher: pushing a deadline with a client (a short call)
const DEADLINE = [
  you("আসসালামু আলাইকুম (বা নমস্কার), আপনি কেমন আছেন?", "assalamu alaikum (ba nomoshkar), apni kemon achhen?", "Hello, how are you?"),
  them("ওয়ালাইকুম আসসালাম (বা নমস্কার), ভালো আছি, আপনি?", "walaikum assalam (ba nomoshkar), bhalo achhi, apni?", "Hello, I'm good, and you?"),
  you("আমিও ভালো আছি, ধন্যবাদ। আমি একটু ডেডলাইন নিয়ে কথা বলতে চাই।", "amio bhalo achhi, dhonnobad. ami ektu deadline niye kotha bolte chai.", "I'm good too, thank you. I'd like to talk a little about the deadline."),
  them("কী হয়েছে?", "ki hoyechhe?", "What happened?"),
  you("দুঃখিত, আমাদের একটু সমস্যা হয়েছে। ডেডলাইনে কাজ শেষ করতে পারব না।", "dukkhito, amader ektu shomoshsha hoyechhe. deadline-e kaj shesh korte parbo na.", "Sorry, we've had a small problem. We won't be able to finish the work by the deadline."),
  them("কেন? কী সমস্যা?", "keno? ki shomoshsha?", "Why? What's the problem?"),
  you("আমরা কোয়ালিটি ভালো রাখতে চাই, তাই আরও একটু সময় লাগবে।", "amra quality bhalo rakhte chai, tai aro ektu shomoy lagbe.", "We want to keep the quality good, so it'll need a bit more time."),
  them("আরও কত দিন লাগবে?", "aro koto din lagbe?", "How many more days will it take?"),
  you("আরও এক সপ্তাহ লাগবে, আমি ভাবছি।", "aro ek shoptah lagbe, ami bhabchhi.", "I think it'll take one more week."),
  them("ঠিক আছে, কিন্তু প্লিজ আমাকে আপডেট দিন।", "thik achhe, kintu please amake update din.", "Okay, but please keep me updated."),
  you("অবশ্যই, আমি আপনাকে প্রতিদিন আপডেট দেব। আপনার ধৈর্যের জন্য ধন্যবাদ।", "obossho, ami apnake protidin update debo. apnar dhoirjyer jonyo dhonnobad.", "Of course, I'll update you every day. Thank you for your patience."),
  them("ঠিক আছে। আশা করি কাজ ভালো হবে।", "thik achhe. asha kori kaj bhalo hobe.", "Okay. I hope the work turns out well."),
  you("অবশ্যই হবে। আমরা সেরা চেষ্টা করছি।", "obossho hobe. amra shera cheshta korchhi.", "It definitely will. We're giving our best effort."),
  them("ধন্যবাদ, ভালো থাকবেন।", "dhonnobad, bhalo thakben.", "Thank you, take care."),
  you("আপনিও ভালো থাকবেন। ধন্যবাদ।", "apnio bhalo thakben. dhonnobad.", "You too, take care. Thank you."),
];

// ---- 2. Following up on a payment
const PAYMENT = [
  you("আসসালামু আলাইকুম। আপনি কেমন আছেন?", "assalamu alaikum. apni kemon achhen?", "Peace be upon you. How are you?"),
  them("ওয়ালাইকুম আসসালাম। ভালো আছি। বলুন।", "walaikum assalam. bhalo achhi. bolun.", "And peace be upon you. I'm well. Please go ahead."),
  you("আমি আপনার পেমেন্টের ব্যাপারে ফোন করেছি।", "ami apnar paymenter byapare phon korechhi.", "I have phoned about your payment."),
  them("ও, কোন পেমেন্ট?", "o, kon payment?", "Oh, which payment?"),
  you("গত মাসের ইনভয়েসটা। এখনো আমরা পাইনি।", "gotomaser invoiceta. ekhono amra paini.", "Last month's invoice. We have not received it yet."),
  them("ও, দুঃখিত। আমি ভুলে গিয়েছিলাম।", "o, dukkhito. ami bhule giyechhilam.", "Oh, sorry. I had forgotten."),
  you("কোনো সমস্যা নেই। আপনি কবে দিতে পারবেন?", "kono shomoshsha nei. apni kobe dite parben?", "No problem. When will you be able to pay?"),
  them("আমি কালকের মধ্যে পাঠিয়ে দেব।", "ami kalker moddhe pathiye debo.", "I will send it by tomorrow."),
  you("ধন্যবাদ। পাঠানোর পর আমাকে একটু জানাবেন।", "dhonnobad. pathanor por amake ektu janaben.", "Thank you. Please let me know after you send it."),
  them("অবশ্যই জানাব।", "obossho janabo.", "Of course I will let you know."),
  you("আপনার সহযোগিতার জন্য ধন্যবাদ। ভালো থাকবেন।", "apnar shohoyogitar jonyo dhonnobad. bhalo thakben.", "Thank you for your cooperation. Take care."),
  them("আপনিও ভালো থাকবেন।", "apnio bhalo thakben.", "You too, take care."),
];

// ---- 3. Negotiating a price
const PRICE = [
  them("আপনাদের দামটা একটু বেশি মনে হচ্ছে।", "apnader damta ektu beshi mone hochchhe.", "Your price seems a little high."),
  you("আপনার কথা আমি বুঝতে পারছি।", "apnar kotha ami bujhte parchhi.", "I understand what you are saying."),
  you("আমরা ভালো মান রাখি, তাই দামটা এরকম।", "amra bhalo man rakhi, tai damta erokom.", "We keep a good quality, so the price is like this."),
  them("কিছু ছাড় দেওয়া যাবে?", "kichhu chhar deoya jabe?", "Can you give some discount?"),
  you("আপনি যদি বড় অর্ডার দেন, তাহলে আমরা কিছু ছাড় দিতে পারব।", "apni jodi boro order den, tahole amra kichhu chhar dite parbo.", "If you give a big order, then we can give some discount."),
  them("কত ছাড় দেবেন?", "koto chhar deben?", "How much discount will you give?"),
  you("দশ শতাংশ।", "dosh shotangsho.", "Ten percent."),
  them("আরেকটু কম হলে ভালো হয়।", "arektu kom hole bhalo hoy.", "It would be better if the price were a little lower."),
  you("আমি আমার টিমের সঙ্গে কথা বলে আপনাকে কাল জানাব।", "ami amar timer shonge kotha bole apnake kal janabo.", "I will talk with my team and let you know tomorrow."),
  them("ঠিক আছে, ধন্যবাদ।", "thik achhe, dhonnobad.", "All right, thank you."),
  you("আপনাকেও ধন্যবাদ। ভালো থাকবেন।", "apnakeo dhonnobad. bhalo thakben.", "Thank you too. Take care."),
];

// ---- 4. Rescheduling a meeting
const RESCHEDULE = [
  you("আসসালামু আলাইকুম। আজ বিকেলের মিটিংটা নিয়ে একটা কথা ছিল।", "assalamu alaikum. aj bikeler meetingta niye ekta kotha chhilo.", "Peace be upon you. I had something to say about this afternoon's meeting."),
  them("জি, বলুন।", "ji, bolun.", "Yes, please say."),
  you("দুঃখিত, আমি আজ বিকেলে মিটিংয়ে থাকতে পারব না।", "dukkhito, ami aj bikele meetinge thakte parbo na.", "Sorry, I cannot be at the meeting this afternoon."),
  them("ও, কী হয়েছে?", "o, ki hoyechhe?", "Oh, what has happened?"),
  you("আমার একটা জরুরি কাজ পড়ে গেছে।", "amar ekta joruri kaj pore gechhe.", "An urgent job has come up for me."),
  them("ঠিক আছে। কখন সুবিধা হবে?", "thik achhe. kokhon shubidha hobe?", "All right. When would suit you?"),
  you("কাল সকালে দশটায় হলে কেমন হয়?", "kal shokale doshtay hole kemon hoy?", "How would tomorrow morning at ten be?"),
  them("কাল সকালে আমার একটু কাজ আছে। এগারোটায় হলে হবে?", "kal shokale amar ektu kaj achhe. egarotay hole hobe?", "Tomorrow morning I have some work. Would eleven do?"),
  you("এগারোটায় ঠিক আছে। আমি কনফার্ম করব।", "egarotay thik achhe. ami confirm korbo.", "Eleven is fine. I will confirm."),
  them("ধন্যবাদ।", "dhonnobad.", "Thank you."),
  you("অসুবিধার জন্য ক্ষমা করবেন।", "oshubidhar jonyo khoma korben.", "Please forgive the inconvenience."),
];

// ---- 5. Confirming what a client wants
const REQUIREMENTS = [
  you("আসসালামু আলাইকুম। আপনি কী চান, একটু বুঝিয়ে বলবেন?", "assalamu alaikum. apni ki chan, ektu bujhiye bolben?", "Peace be upon you. Could you explain a little what you want?"),
  them("আমার একশোটা প্যাকেট দরকার।", "amar ekshota packet dorkar.", "I need one hundred packets."),
  you("একশো? ঠিক শুনেছি?", "eksho? thik shunechhi?", "One hundred? Did I hear right?"),
  them("হ্যাঁ, একশো। আর রংটা নীল হবে।", "hyan, eksho. ar rongta nil hobe.", "Yes, one hundred. And the colour will be blue."),
  you("নীল। আমি লিখে নিচ্ছি। কবে লাগবে?", "nil. ami likhe nichchhi. kobe lagbe?", "Blue. I am writing it down. When will you need it?"),
  them("আগামী সপ্তাহের মধ্যে।", "agami shoptaher moddhe.", "Within next week."),
  you("ঠিক আছে। আমি আরেকবার বলি। একশো প্যাকেট, নীল রং, আগামী সপ্তাহের মধ্যে। ঠিক আছে?", "thik achhe. ami arekbar boli. eksho packet, nil rong, agami shoptaher moddhe. thik achhe?", "All right. Let me say it once more. One hundred packets, blue, within next week. Is that right?"),
  them("হ্যাঁ, ঠিক আছে।", "hyan, thik achhe.", "Yes, that's right."),
  you("আমি আপনাকে আজ ইমেইলে সব কনফার্ম করব।", "ami apnake aj emaile shob confirm korbo.", "I will confirm everything to you by email today."),
  them("ধন্যবাদ।", "dhonnobad.", "Thank you."),
  you("আপনাকেও ধন্যবাদ। ভালো থাকবেন।", "apnakeo dhonnobad. bhalo thakben.", "Thank you too. Take care."),
];

// ---- 6. Asking a client for feedback at the end of a job
const CLIENT_FEEDBACK = [
  you("আসসালামু আলাইকুম। কাজটা কেমন হয়েছে?", "assalamu alaikum. kajta kemon hoyechhe?", "Peace be upon you. How did the work turn out?"),
  them("ভালো হয়েছে। আমি খুশি।", "bhalo hoyechhe. ami khushi.", "It turned out well. I am happy."),
  you("শুনে ভালো লাগল। কোনো সমস্যা হয়েছে কি?", "shune bhalo laglo. kono shomoshsha hoyechhe ki?", "I am glad to hear it. Was there any problem?"),
  them("না, শুধু ডেলিভারিতে একটু দেরি হয়েছিল।", "na, shudhu deliverite ektu deri hoyechhilo.", "No, only a little delay in the delivery."),
  you("এর জন্য আমরা দুঃখিত। পরেরবার আমরা আরও সাবধান থাকব।", "er jonyo amra dukkhito. porerbar amra aro shabdhan thakbo.", "We are sorry for that. Next time we will be more careful."),
  them("ঠিক আছে। আপনাদের কাজের মান খুব ভালো।", "thik achhe. apnader kajer man khub bhalo.", "All right. The quality of your work is very good."),
  you("আপনার কথা শুনে আমরা খুব উৎসাহ পেলাম।", "apnar kotha shune amra khub utshaho pelam.", "Hearing this, we feel very encouraged."),
  you("আপনি কি আবার আমাদের সঙ্গে কাজ করবেন?", "apni ki abar amader shonge kaj korben?", "Will you work with us again?"),
  them("অবশ্যই।", "obossho.", "Of course."),
  you("ধন্যবাদ। আমরা সবসময় আপনার পাশে আছি।", "dhonnobad. amra shobshomoy apnar pashe achhi.", "Thank you. We are always by your side."),
  them("ভালো থাকবেন।", "bhalo thakben.", "Take care."),
];

// ---- 7. A supplier is late
const SUPPLIER = [
  you("আসসালামু আলাইকুম। আজ তো মালের ডেলিভারি দেওয়ার কথা ছিল।", "assalamu alaikum. aj to maler delivery deoyar kotha chhilo.", "Peace be upon you. The delivery of the goods was due today."),
  them("জি, দুঃখিত। রাস্তায় একটু সমস্যা হয়েছে।", "ji, dukkhito. rastay ektu shomoshsha hoyechhe.", "Yes, sorry. There has been a small problem on the road."),
  you("ও, বুঝতে পারছি। কখন পৌঁছাবে?", "o, bujhte parchhi. kokhon pouchhabe?", "Oh, I understand. When will it arrive?"),
  them("বিকেল চারটের মধ্যে।", "bikel charter moddhe.", "By four in the afternoon."),
  you("আমাদের সকালেই দরকার ছিল। এখন কাজ আটকে আছে।", "amader shokalei dorkar chhilo. ekhon kaj atke achhe.", "We needed it in the morning. Now our work is stuck."),
  them("আমি আবার দুঃখিত। আমি এখনই গাড়ির লোকের সঙ্গে কথা বলছি।", "ami abar dukkhito. ami ekhoni garir loker shonge kotha bolchhi.", "I am sorry again. I am talking with the driver right now."),
  you("ঠিক আছে। আপনি ঠিক সময়টা কনফার্ম করে আমাকে জানান।", "thik achhe. apni thik shomoyta confirm kore amake janan.", "All right. Please confirm the exact time and let me know."),
  them("জি, আমি পনেরো মিনিটের মধ্যে জানাব।", "ji, ami ponero minister moddhe janabo.", "Yes, I will tell you within fifteen minutes."),
  you("ধন্যবাদ। পরেরবার দয়া করে সময়মতো দেবেন।", "dhonnobad. porerbar doya kore shomoymoto deben.", "Thank you. Next time, please deliver on time."),
  them("অবশ্যই।", "obossho.", "Of course."),
];

// ---- 8. Welcoming a new team member
const WELCOME = [
  you("আসসালামু আলাইকুম। আপনি রহিম সাহেব, তাই না?", "assalamu alaikum. apni rahim saheb, tai na?", "Peace be upon you. You are Rahim Saheb, aren't you?"),
  them("ওয়ালাইকুম আসসালাম, স্যার। হ্যাঁ, আমি আজ প্রথম এলাম।", "walaikum assalam, sir. hyan, ami aj prothom elam.", "And peace be upon you, sir. Yes, I have come for the first time today."),
  you("আমাদের দলে আপনাকে স্বাগতম।", "amader dole apnake shagotom.", "Welcome to our team."),
  them("ধন্যবাদ, স্যার।", "dhonnobad, sir.", "Thank you, sir."),
  you("চলুন, আমি সবার সঙ্গে আপনার পরিচয় করিয়ে দিই।", "cholun, ami shobar shonge apnar porichoy koriye di.", "Come, let me introduce you to everyone."),
  you("ইনি করিম সাহেব, আমাদের ম্যানেজার।", "ini korim saheb, amader manager.", "This is Karim Saheb, our manager."),
  them("আসসালামু আলাইকুম, করিম সাহেব।", "assalamu alaikum, korim saheb.", "Peace be upon you, Karim Saheb."),
  you("কিছু বুঝতে না পারলে আমাকে বা করিম সাহেবকে বলবেন।", "kichhu bujhte na parle amake ba korim sahebke bolben.", "If you do not understand something, tell me or Karim Saheb."),
  them("জি, স্যার। আমি আমার সেরা চেষ্টা করব।", "ji, sir. ami amar shera cheshta korbo.", "Yes, sir. I will do my best."),
  you("খুব ভালো। আপনার ডেস্কটা ওই দিকে।", "khub bhalo. apnar deskta oi dike.", "Very good. Your desk is over there."),
];

// ---- 9. Talking to a team member who is often late
const LATE = [
  you("রহিম সাহেব, একটু সময় হবে?", "rahim saheb, ektu shomoy hobe?", "Rahim Saheb, do you have a moment?"),
  them("জি, স্যার।", "ji, sir.", "Yes, sir."),
  you("আপনার কাজ আমি পছন্দ করি। কিন্তু একটা বিষয় আছে।", "apnar kaj ami pochhondo kori. kintu ekta bishoy achhe.", "I like your work. But there is one matter."),
  you("এই সপ্তাহে আপনি তিনবার দেরিতে এসেছেন।", "ei shoptahe apni tinbar derite eshechhen.", "This week you have come late three times."),
  them("জি, স্যার। আমি দুঃখিত।", "ji, sir. ami dukkhito.", "Yes, sir. I am sorry."),
  you("কোনো সমস্যা আছে?", "kono shomoshsha achhe?", "Is there any problem?"),
  them("বাসা থেকে অফিসে আসতে অনেক সময় লাগছে, স্যার।", "basha theke office-e ashte onek shomoy lagchhe, sir.", "It takes a long time to come from home to the office, sir."),
  you("বুঝতে পারছি। আপনি কি আরেকটু আগে বের হতে পারবেন?", "bujhte parchhi. apni ki arektu age ber hote parben?", "I understand. Will you be able to leave a little earlier?"),
  them("জি, আমি চেষ্টা করব।", "ji, ami cheshta korbo.", "Yes, I will try."),
  you("দয়া করে সময়মতো আসবেন। আমি আপনার ওপর ভরসা করি।", "doya kore shomoymoto ashben. ami apnar opor bhorosha kori.", "Please come on time. I trust you."),
  them("ধন্যবাদ, স্যার।", "dhonnobad, sir.", "Thank you, sir."),
];

// ---- 10. Thanking the team after a good week
const THANKS = [
  you("আসসালামু আলাইকুম, সবাইকে। একটু শুনুন।", "assalamu alaikum, shobaike. ektu shunun.", "Peace be upon you, everyone. Please listen a moment."),
  them("জি, স্যার।", "ji, sir.", "Yes, sir."),
  you("এই সপ্তাহে আপনারা সবাই খুব ভালো কাজ করেছেন।", "ei shoptahe apnara shobai khub bhalo kaj korechhen.", "This week all of you have done very good work."),
  you("আমরা সব অর্ডার সময়মতো দিয়েছি।", "amra shob order shomoymoto diyechhi.", "We have delivered all the orders on time."),
  them("ধন্যবাদ, স্যার।", "dhonnobad, sir.", "Thank you, sir."),
  you("বিশেষ করে রহিম সাহেবকে ধন্যবাদ। তিনি অনেক পরিশ্রম করেছেন।", "bishesh kore rahim sahebke dhonnobad. tini onek porishrom korechhen.", "Special thanks to Rahim Saheb. He has worked very hard."),
  them("ধন্যবাদ, স্যার। আমি খুব খুশি।", "dhonnobad, sir. ami khub khushi.", "Thank you, sir. I am very happy."),
  you("আমি আপনাদের ওপর ভরসা করি। আপনারা আমাদের দলের শক্তি।", "ami apnader opor bhorosha kori. apnara amader doler shokti.", "I trust you. You are the strength of our team."),
  you("আজ আমরা সবাই একসঙ্গে চা খাব।", "aj amra shobai ekshonge cha khabo.", "Today we will all have tea together."),
  them("ধন্যবাদ, স্যার। আমরা আরও ভালো করব।", "dhonnobad, sir. amra aro bhalo korbo.", "Thank you, sir. We will do even better."),
];

export const BUSINESS_MORE: Scenario[] = [
  {
    id: "biz-deadline-push", title: "Pushing a deadline with a client (a short call)", bn: "ডেডলাইন পিছানো",
    blurb: "Tell a client, calmly, that you need a little more time. Say sorry, give the reason, name the extra time and promise updates.",
    situation: "You are the owner. The deadline is close and the work cannot be finished in time without losing quality. You phone the client.",
    goal: "Greet, say you want to talk about the deadline, say sorry, give the reason, say how much more time you need and promise to give updates.",
    words: [w("ডেডলাইন", "deadline", "deadline"), w("দুঃখিত", "dukkhito", "sorry"), w("একটু দেরি", "ektu deri", "a little delay"), w("সমস্যা", "shomoshsha", "problem; issue"), w("কোয়ালিটি", "quality", "quality"), w("ভালো কাজ", "bhalo kaj", "good work; quality work"), w("আরও সময়", "aro shomoy", "more time"), w("সপ্তাহ", "shoptah", "week"), w("কনফার্ম করব", "confirm korbo", "I will confirm"), w("বুঝতে পারছি", "bujhte parchhi", "I understand"), w("ধৈর্য", "dhoirjyo", "patience"), w("কারণ", "karon", "reason"), w("আপডেট দেব", "update debo", "I will give an update"), w("ভালো থাকবেন", "bhalo thakben", "take care (a closing)")],
    say: [
      { title: "Opening and the news", note: "Say আসসালামু আলাইকুম to Muslim clients and নমস্কার to Hindu clients, or use the greeting you hear. Always আপনি.", items: pick(DEADLINE, [0, 2, 4, 6]) },
      { title: "The extra time, and the promise", items: pick(DEADLINE, [8, 10, 12, 14]) },
    ],
    hear: [{ title: "What the client says", items: pick(DEADLINE, [3, 5, 7, 9, 11, 13]) }],
    demos: [
      { id: "smooth", title: "A calm, honest call", kind: "smooth", setup: "You say sorry first, give the reason, and keep the client's trust with daily updates.", turns: DEADLINE,
        takeaway: "Greet, say you want to talk about the deadline, say sorry, give the reason (quality), name the extra time, and promise updates (আপডেট দেব). Close warmly: ভালো থাকবেন." },
      wrong("You give the news bluntly.", [
        them("আসসালামু আলাইকুম। আমার কাজ কতদূর?", "assalamu alaikum. amar kaj kotodur?", "Peace be upon you. How far is my work?"),
        you("দেরি হবে।", "deri hobe.", "It will be late."),
        them("কেন? কত দিন?", "keno? koto din?", "Why? How many days?"),
        you("জানি না।", "jani na.", "I do not know."),
      ], "Never give a delay without 'sorry' (দুঃখিত), a reason (কারণ) and a time. 'জানি না' leaves the client with nothing."),
    ],
  },
  {
    id: "biz-payment", title: "Following up on a payment", bn: "পেমেন্টের কথা",
    blurb: "Remind a client politely about an invoice that has not been paid, and agree when it will come.",
    situation: "A client's invoice from last month has not been paid. You phone to ask, without making the client feel accused.",
    goal: "Say why you are phoning, name the invoice, accept the client's apology kindly, ask when they can pay and thank them.",
    words: [w("পেমেন্ট", "payment", "payment"), w("ইনভয়েস", "invoice", "invoice"), w("টাকা", "taka", "money"), w("ভুলে যাওয়া", "bhule jaoya", "to forget"), w("পাঠিয়ে দেওয়া", "pathiye deoya", "to send over"), w("সহযোগিতা", "shohoyogita", "cooperation"), w("কবে", "kobe", "when"), w("জানানো", "janano", "to let someone know")],
    say: [
      { title: "Raising it gently", items: pick(PAYMENT, [2, 4, 6]) },
      { title: "Agreeing and closing", items: pick(PAYMENT, [8, 10]) },
    ],
    hear: [{ title: "What the client says", items: pick(PAYMENT, [3, 5, 7, 9]) }],
    demos: [
      { id: "smooth", title: "Polite and clear", kind: "smooth", setup: "You are kind, you give the client a way out, and you still get a date.", turns: PAYMENT,
        takeaway: "Say it is about the payment, name the invoice, say 'no problem' (কোনো সমস্যা নেই), then ask 'when can you?' (কবে দিতে পারবেন?)." },
      wrong("You demand the money.", [
        you("টাকা দিন। এখনই।", "taka din. ekhoni.", "Give the money. Right now."),
        them("আপনি এভাবে কথা বলছেন কেন?", "apni evabe kotha bolchhen keno?", "Why are you speaking like this?"),
      ], "Do not start with the demand. Ask politely, and give the client a way to say 'sorry, I forgot'."),
    ],
  },
  {
    id: "biz-price", title: "Negotiating a price with a client", bn: "দামাদামি",
    blurb: "Hear a client say the price is high, explain your quality, offer a discount for a bigger order and promise an answer.",
    situation: "A client says your price is a little high and asks for a discount.",
    goal: "Show you understand, explain the quality, offer a discount tied to a bigger order, and say when you will answer.",
    words: [w("দাম", "dam", "price"), w("ছাড়", "chhar", "discount"), w("অর্ডার", "order", "order"), w("শতাংশ", "shotangsho", "percent"), w("বেশি", "beshi", "more; high"), w("কম", "kom", "less; low"), w("মান", "man", "quality"), w("টিম", "tim", "team")],
    say: [
      { title: "Explaining the price", items: pick(PRICE, [1, 2, 4]) },
      { title: "Offering, and promising an answer", items: pick(PRICE, [6, 8, 10]) },
    ],
    hear: [{ title: "What the client says", items: pick(PRICE, [0, 3, 5, 7]) }],
    demos: [
      { id: "smooth", title: "Firm and friendly", kind: "smooth", setup: "You keep the price fair and still leave a door open.", turns: PRICE,
        takeaway: "Say you understand, explain why, tie the discount to something (a bigger order), and promise an answer by a day (কাল জানাব)." },
      wrong("You refuse flatly.", [
        them("আপনাদের দামটা একটু বেশি মনে হচ্ছে।", "apnader damta ektu beshi mone hochchhe.", "Your price seems a little high."),
        you("না, দাম কমানো যাবে না।", "na, dam komano jabe na.", "No, the price cannot be reduced."),
      ], "A flat 'no' ends the talk. Say you understand (বুঝতে পারছি) and offer a reason or a condition."),
    ],
  },
  {
    id: "biz-reschedule", title: "Rescheduling a meeting with a client", bn: "মিটিংয়ের সময় বদল",
    blurb: "Say you cannot make a meeting, give the reason, offer a new time, agree one and say you will confirm.",
    situation: "An urgent job means you cannot attend this afternoon's meeting with a client.",
    goal: "Say sorry, give a short reason, ask when would suit, offer a time, agree on one, confirm and apologize for the inconvenience.",
    words: [w("মিটিং", "meeting", "meeting"), w("সময়", "shomoy", "time"), w("সুবিধা", "shubidha", "convenience"), w("জরুরি", "joruri", "urgent"), w("কনফার্ম", "confirm", "confirm"), w("সকাল", "shokal", "morning"), w("বিকেল", "bikel", "afternoon"), w("ক্ষমা করবেন", "khoma korben", "please forgive")],
    say: [
      { title: "Saying you cannot come", items: pick(RESCHEDULE, [0, 2, 4]) },
      { title: "Offering a new time", items: pick(RESCHEDULE, [6, 8, 10]) },
    ],
    hear: [{ title: "What the client says", items: pick(RESCHEDULE, [1, 3, 5, 7]) }],
    demos: [
      { id: "smooth", title: "Courteous and quick", kind: "smooth", setup: "You warn them early, give a reason and offer a new time.", turns: RESCHEDULE,
        takeaway: "Say sorry first, give a short reason, offer a time with 'how would ... be?' (কেমন হয়?), then confirm (কনফার্ম করব)." },
      wrong("You cancel without a new time.", [
        you("আজ মিটিং হবে না।", "aj meeting hobe na.", "There will be no meeting today."),
        them("কেন? তাহলে কবে?", "keno? tahole kobe?", "Why? Then when?"),
        you("পরে দেখি।", "pore dekhi.", "I will see later."),
      ], "Never cancel without offering a new time. Say 'sorry' and give at least one new option."),
    ],
  },
  {
    id: "biz-requirements", title: "Confirming what a client wants", bn: "ক্লায়েন্টের চাহিদা",
    blurb: "Ask a client what they need, write it down, repeat it back and confirm it by email.",
    situation: "A client phones with an order. You want to be sure you have understood the number, the colour and the date.",
    goal: "Ask what they want, check the number, repeat everything back, and promise to confirm by email.",
    words: [w("প্যাকেট", "packet", "packet"), w("রং", "rong", "colour"), w("নীল", "nil", "blue"), w("লিখে নেওয়া", "likhe neoya", "to write down"), w("আরেকবার", "arekbar", "once more"), w("কনফার্ম", "confirm", "confirm"), w("দরকার", "dorkar", "need"), w("কবে", "kobe", "when")],
    say: [
      { title: "Asking and checking", items: pick(REQUIREMENTS, [0, 2, 4]) },
      { title: "Repeating back and confirming", items: pick(REQUIREMENTS, [6, 8, 10]) },
    ],
    hear: [{ title: "What the client says", items: pick(REQUIREMENTS, [1, 3, 5, 7]) }],
    demos: [
      { id: "smooth", title: "Careful and clear", kind: "smooth", setup: "You listen, check each detail and repeat it back.", turns: REQUIREMENTS,
        takeaway: "Ask, check the number ('ঠিক শুনেছি?'), write it down, say it once more, and confirm in writing. Fewer mistakes, happier client." },
      wrong("You guess instead of checking.", [
        them("আমার একশোটা প্যাকেট দরকার, নীল রং।", "amar ekshota packet dorkar, nil rong.", "I need one hundred packets, blue."),
        you("ঠিক আছে।", "thik achhe.", "All right."),
        them("কবে পাব?", "kobe pabo?", "When will I get them?"),
        you("দেখি।", "dekhi.", "We'll see."),
      ], "Say it back (আমি আরেকবার বলি) and agree a date. 'ঠিক আছে' alone is not a confirmation."),
    ],
  },
  {
    id: "biz-client-feedback", title: "Asking a client for feedback", bn: "ক্লায়েন্টের মতামত",
    blurb: "At the end of a job, ask how it went, accept a small criticism, thank the client and ask them to work with you again.",
    situation: "A job is finished. You phone the client to ask how it went.",
    goal: "Ask how the work turned out, ask if there was any problem, apologize for a small delay, thank the client and invite more work.",
    words: [w("মতামত", "motamot", "opinion; feedback"), w("খুশি", "khushi", "happy"), w("ডেলিভারি", "delivery", "delivery"), w("উৎসাহ", "utshaho", "encouragement"), w("আবার", "abar", "again"), w("সাবধান", "shabdhan", "careful"), w("পরেরবার", "porerbar", "next time"), w("কাজের মান", "kajer man", "quality of work")],
    say: [
      { title: "Asking how it went", items: pick(CLIENT_FEEDBACK, [0, 2, 4]) },
      { title: "Thanking, and inviting more work", items: pick(CLIENT_FEEDBACK, [6, 7, 9]) },
    ],
    hear: [{ title: "What the client says", items: pick(CLIENT_FEEDBACK, [1, 3, 5, 8]) }],
    demos: [
      { id: "smooth", title: "Listening well", kind: "smooth", setup: "You ask openly, accept the small criticism and end warmly.", turns: CLIENT_FEEDBACK,
        takeaway: "Ask 'how did it turn out?', then 'was there any problem?'. Say sorry for any problem, thank them and invite them back." },
      wrong("You defend yourself.", [
        you("কাজটা কেমন হয়েছে?", "kajta kemon hoyechhe?", "How did the work turn out?"),
        them("ভালো। শুধু ডেলিভারিতে একটু দেরি হয়েছিল।", "bhalo. shudhu deliverite ektu deri hoyechhilo.", "Good. Only the delivery was a little late."),
        you("ওটা আমাদের দোষ না।", "ota amader dosh na.", "That was not our fault."),
      ], "Do not argue with feedback. Say sorry and say what you will do next time."),
    ],
  },
  {
    id: "biz-supplier-late", title: "A supplier is late", bn: "মাল আসেনি",
    blurb: "Phone a supplier whose delivery is late: stay calm, ask when it will come, say what it costs you, and ask for the exact time.",
    situation: "A delivery of goods was due this morning and has not arrived. Your work is waiting for it.",
    goal: "Remind the supplier, hear the reason, ask when it will arrive, explain the problem it causes and ask for a confirmed time.",
    words: [w("মাল", "mal", "goods"), w("ডেলিভারি", "delivery", "delivery"), w("পৌঁছানো", "pouchhano", "to arrive"), w("গাড়ি", "gari", "vehicle"), w("আটকে থাকা", "atke thaka", "to be stuck"), w("সময়মতো", "shomoymoto", "on time"), w("কনফার্ম", "confirm", "confirm"), w("পনেরো", "ponero", "fifteen")],
    say: [
      { title: "Raising the delay", items: pick(SUPPLIER, [0, 2, 4]) },
      { title: "Asking for a time, and for next time", items: pick(SUPPLIER, [6, 8]) },
    ],
    hear: [{ title: "What the supplier says", items: pick(SUPPLIER, [1, 3, 5, 7, 9]) }],
    demos: [
      { id: "smooth", title: "Firm, not angry", kind: "smooth", setup: "You stay polite and still get a time.", turns: SUPPLIER,
        takeaway: "Say what was due, ask when it will arrive, say what it costs you, ask for a confirmed time, and ask for 'on time' next time." },
      wrong("You shout.", [
        you("আপনারা সবসময় দেরি করেন!", "apnara shobshomoy deri koren!", "You are always late!"),
        them("আমি দুঃখিত, কিন্তু...", "ami dukkhito, kintu...", "I am sorry, but..."),
        you("আর দরকার নেই!", "ar dorkar nei!", "We do not need it any more!"),
      ], "Anger loses a supplier. Stay calm, ask for a time and ask for 'on time next time' (পরেরবার সময়মতো)."),
    ],
  },
  {
    id: "biz-new-member", title: "Welcoming a new team member", bn: "নতুন সদস্যকে স্বাগতম",
    blurb: "Welcome someone on their first day, introduce them to the team and tell them where to turn for help.",
    situation: "A new person joins your team today. You greet them and show them around.",
    goal: "Welcome them, introduce the manager, say who to ask if they do not understand and show their desk.",
    words: [w("স্বাগতম", "shagotom", "welcome"), w("দল", "dol", "team"), w("পরিচয়", "porichoy", "introduction"), w("ম্যানেজার", "manager", "manager"), w("ডেস্ক", "desk", "desk"), w("প্রথম দিন", "prothom din", "first day"), w("বুঝতে পারা", "bujhte para", "to understand"), w("সেরা চেষ্টা", "shera cheshta", "best effort")],
    say: [
      { title: "Welcoming", items: pick(WELCOME, [0, 2, 4]) },
      { title: "Introducing and guiding", items: pick(WELCOME, [5, 7, 9]) },
    ],
    hear: [{ title: "What the new person says", items: pick(WELCOME, [1, 3, 6, 8]) }],
    demos: [
      { id: "smooth", title: "Warm and clear", kind: "smooth", setup: "You make the first day feel welcome.", turns: WELCOME,
        takeaway: "Greet, say 'welcome to our team' (আমাদের দলে স্বাগতম), introduce people, and say who to ask for help." },
      wrong("You say almost nothing.", [
        them("আসসালামু আলাইকুম, স্যার। আমি আজ প্রথম এলাম।", "assalamu alaikum, sir. ami aj prothom elam.", "Peace be upon you, sir. I have come for the first time today."),
        you("ঠিক আছে। ওই দিকে বসুন।", "thik achhe. oi dike boshun.", "All right. Sit over there."),
      ], "Say welcome (স্বাগতম), introduce the team, and say who can help. A first day needs warmth."),
    ],
  },
  {
    id: "biz-late-staff", title: "Talking to a team member who is often late", bn: "দেরিতে আসা",
    blurb: "Raise lateness kindly: praise the work, name the problem, ask the reason, find a solution and show trust.",
    situation: "A good team member has come late three times this week. You speak to him alone.",
    goal: "Say you like the work, name the lateness, ask what is wrong, hear the reason, ask him to leave earlier and show trust.",
    words: [w("দেরি", "deri", "late; delay"), w("সময়মতো", "shomoymoto", "on time"), w("বিষয়", "bishoy", "matter"), w("তিনবার", "tinbar", "three times"), w("বের হওয়া", "ber hooya", "to leave; to set out"), w("ভরসা", "bhorosha", "trust"), w("চেষ্টা", "cheshta", "effort; try"), w("বাসা", "basha", "home")],
    say: [
      { title: "Starting kindly", items: pick(LATE, [0, 2, 3, 5]) },
      { title: "Finding a solution", items: pick(LATE, [7, 9]) },
    ],
    hear: [{ title: "What he says", items: pick(LATE, [1, 4, 6, 8]) }],
    demos: [
      { id: "smooth", title: "Kind but clear", kind: "smooth", setup: "You protect the person and still fix the problem.", turns: LATE,
        takeaway: "Praise the work first, name the problem with the number (তিনবার), ask the reason, ask for a small change, and show trust." },
      wrong("You criticize the person.", [
        you("আপনি রোজ দেরি করেন। এটা ঠিক না।", "apni roj deri koren. eta thik na.", "You are late every day. This is not right."),
        them("স্যার, আমি...", "sir, ami...", "Sir, I..."),
        you("কোনো কথা না। সময়মতো আসুন।", "kono kotha na. shomoymoto ashun.", "No excuses. Come on time."),
      ], "Do not say 'every day' or 'no excuses'. Ask what is wrong first."),
    ],
  },
  {
    id: "biz-thanks-team", title: "Thanking the team after a good week", bn: "দলকে ধন্যবাদ",
    blurb: "Praise the whole team in front of everyone, thank one person by name, and show you trust them.",
    situation: "The team delivered every order on time this week. You gather them for a few words.",
    goal: "Ask for attention, praise the team, name one person, show trust and invite everyone for tea.",
    words: [w("পরিশ্রম", "porishrom", "hard work"), w("বিশেষ করে", "bishesh kore", "especially"), w("শক্তি", "shokti", "strength"), w("একসঙ্গে", "ekshonge", "together"), w("সবাই", "shobai", "everyone"), w("সময়মতো", "shomoymoto", "on time"), w("চা", "cha", "tea"), w("অর্ডার", "order", "order")],
    say: [
      { title: "Praising everyone", items: pick(THANKS, [0, 2, 3]) },
      { title: "Thanking one person, and closing", items: pick(THANKS, [5, 7, 8]) },
    ],
    hear: [{ title: "What the team says", items: pick(THANKS, [1, 4, 6, 9]) }],
    demos: [
      { id: "smooth", title: "Praise in public", kind: "smooth", setup: "You thank the group and one person by name.", turns: THANKS,
        takeaway: "Ask for attention, say what went well, thank one person by name (বিশেষ করে ...), say you trust the team, and share something small together." },
      wrong("You say only 'okay'.", [
        you("ঠিক আছে। সবাই কাজে যান।", "thik achhe. shobai kaje jan.", "Okay. Everyone go to work."),
        them("জি, স্যার...", "ji, sir...", "Yes, sir..."),
      ], "Do not skip the thanks. One minute of praise (ভালো কাজ করেছেন) keeps a team going."),
    ],
  },
];
