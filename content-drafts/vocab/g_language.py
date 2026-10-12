# Topic vocabulary: School, culture, and the words that do the work.
TOPICS = [
dict(id="school", group="school", title=("পড়াশোনা", "porashona", "School and study"),
 blurb="Classroom things, subjects, and talking about learning.",
 sections=[
  ("In the classroom", [
   ("ক্লাস", "klas", "class"), ("বই", "boi", "book"), ("খাতা", "khata", "notebook"), ("কলম", "kolom", "pen"), ("পেনসিল", "pensil", "pencil"),
   ("রবার", "robar", "eraser"), ("স্কেল", "skel", "ruler"), ("ব্যাগ", "byag", "bag"), ("ব্ল্যাকবোর্ড", "blyakbord", "blackboard"),
   ("ছাত্র", "chhatro", "student (boy)"), ("ছাত্রী", "chhatri", "student (girl)"), ("শিক্ষক", "shikkhok", "teacher (man)"), ("শিক্ষিকা", "shikkhika", "teacher (woman)"),
  ]),
  ("Subjects", [
   ("বাংলা", "bangla", "Bengali"), ("ইংরেজি", "ingreji", "English"), ("অঙ্ক", "onko", "mathematics"), ("বিজ্ঞান", "biggyan", "science"),
   ("ইতিহাস", "itihash", "history"), ("ভূগোল", "bhugol", "geography"), ("গান", "gan", "music; song"), ("ছবি আঁকা", "chhobi aka", "drawing"),
  ]),
  ("Learning", [
   ("পড়া", "pora", "to read; to study"), ("লেখা", "lekha", "to write; writing"), ("শেখা", "shekha", "to learn"), ("শেখানো", "shekhano", "to teach"),
   ("পরীক্ষা", "porikkha", "exam"), ("প্রশ্ন", "proshno", "question"), ("উত্তর", "uttor", "answer"), ("ভুল", "bhul", "mistake; wrong"), ("ঠিক", "thik", "correct; fine"),
   ("শব্দ", "shobdo", "word; sound"), ("বাক্য", "bakyo", "sentence"), ("অক্ষর", "okkhor", "letter (of the alphabet)"), ("পাঠ", "path", "lesson"),
   ("নম্বর", "nombor", "marks; number"),
  ]),
 ],
 phrases=[
  ("আমি বাংলা শিখছি।", "ami bangla shikhchhi.", "I am learning Bengali."),
  ("আমি বুঝতে পারিনি।", "ami bujhte parini.", "I did not understand."),
  ("আরেকবার বলবেন?", "arekbar bolben?", "Will you say it once more?"),
 ]),

dict(id="media", group="school", title=("কাজ ও প্রযুক্তি", "kaj o projukti", "Work and technology"),
 blurb="Office life, phones, and the news.",
 sections=[
  ("Work", [
   ("কাজ", "kaj", "work; task"), ("চাকরি", "chakri", "job"), ("অফিস", "ofis", "office"), ("মিটিং", "miting", "meeting"), ("ছুটি", "chhuti", "leave; holiday"),
   ("সহকর্মী", "shohokormi", "colleague"), ("মালিক", "malik", "owner; boss"),
  ]),
  ("Phones and computers", [
   ("ফোন", "phon", "phone"), ("মোবাইল", "mobail", "mobile phone"), ("কম্পিউটার", "kompiutar", "computer"), ("ইন্টারনেট", "intarnet", "internet"),
   ("ইমেল", "imeyl", "email"), ("মেসেজ", "meshej", "message"), ("ছবি", "chhobi", "picture; photo"), ("ভিডিও", "bhidio", "video"), ("পাসওয়ার্ড", "pasoyard", "password"),
  ]),
  ("News and media", [
   ("খবর", "khobor", "news"), ("সংবাদপত্র", "shongbadpotro", "newspaper"), ("চিঠি", "chithi", "letter"), ("টিভি", "tibhi", "television"),
   ("রেডিও", "redio", "radio"), ("সিনেমা", "sinema", "film"), ("গল্প", "golpo", "story"), ("কবিতা", "kobita", "poem"),
  ]),
 ],
 phrases=[
  ("আমি অফিসে যাচ্ছি।", "ami ofise jachchhi.", "I am going to the office."),
  ("আপনার ফোন নম্বর কত?", "apnar phon nombor koto?", "What is your phone number?"),
  ("আমাকে একটা মেসেজ পাঠাও।", "amake ekta meshej pathao.", "Send me a message."),
 ]),

dict(id="festivals", group="school", title=("উৎসব ও সংস্কৃতি", "utshob o shongskriti", "Festivals and culture"),
 blurb="The festivals of Bengal and the words around them.",
 sections=[
  ("Festivals", [
   ("উৎসব", "utshob", "festival"), ("দুর্গাপূজা", "durgapuja", "Durga Puja"), ("কালীপূজা", "kalipuja", "Kali Puja"), ("সরস্বতী পূজা", "shoroshwoti puja", "Saraswati Puja"),
   ("লক্ষ্মীপূজা", "lokkhipuja", "Lakshmi Puja"), ("পয়লা বৈশাখ", "poila boishakh", "Bengali new year"), ("রথযাত্রা", "rothjatra", "Rath Yatra"),
   ("দোল", "dol", "Dol (Holi)"), ("দীপাবলি", "dipabali", "Diwali"), ("ঈদ", "id", "Eid"), ("বড়দিন", "borodin", "Christmas"),
  ]),
  ("Puja words", [
   ("পূজা", "puja", "worship; puja"), ("ঠাকুর", "thakur", "god; idol"), ("প্রতিমা", "protima", "idol; image"), ("মণ্ডপ", "mondop", "puja pavilion"),
   ("ঢাক", "dhak", "large drum"), ("শঙ্খ", "shankho", "conch shell"), ("ধুনুচি", "dhunuchi", "incense burner"), ("আরতি", "arati", "ritual of lamps"),
   ("প্রসাদ", "proshad", "blessed food"), ("অঞ্জলি", "onjoli", "offering of flowers"), ("প্রণাম", "pronam", "respectful greeting"),
  ]),
  ("Culture", [
   ("মেলা", "mela", "fair"), ("বইমেলা", "boimela", "book fair"), ("সংস্কৃতি", "shongskriti", "culture"), ("রবীন্দ্রনাথ", "robindronath", "Rabindranath (Tagore)"),
   ("রবীন্দ্রসংগীত", "robindroshongit", "Tagore songs"), ("নাটক", "natok", "play; drama"), ("যাত্রা", "jatra", "folk theatre"), ("আড্ডা", "adda", "a relaxed chat with friends"),
  ]),
 ],
 phrases=[
  ("শুভ নববর্ষ!", "shubho nobobarsho!", "Happy new year!"),
  ("দুর্গাপূজায় আমরা ঠাকুর দেখতে যাব।", "durgapujay amra thakur dekhte jabo.", "During Durga Puja we will go to see the idols."),
  ("শুভ বিজয়া!", "shubho bijoya!", "Happy Bijoya (greeting after Durga Puja)!"),
 ]),

dict(id="verbs", group="words", title=("ক্রিয়া", "kriya", "Common verbs"),
 blurb="The verbs you need every day, in their dictionary form (the form that ends in -া or -ো).",
 sections=[
  ("Moving", [
   ("যাওয়া", "jaoya", "to go"), ("আসা", "asha", "to come"), ("হাঁটা", "hata", "to walk"), ("দৌড়ানো", "dourano", "to run"), ("ফেরা", "phera", "to return"),
   ("পৌঁছানো", "pouchhano", "to arrive"), ("ওঠা", "otha", "to get up; to rise"), ("বসা", "bosha", "to sit"), ("দাঁড়ানো", "darano", "to stand"),
   ("থামা", "thama", "to stop"), ("ঘোরা", "ghora", "to wander; to turn"),
  ]),
  ("Daily life", [
   ("খাওয়া", "khaoya", "to eat"), ("পান করা", "pan kora", "to drink"), ("ঘুমানো", "ghumano", "to sleep"), ("জাগা", "jaga", "to wake"),
   ("স্নান করা", "snan kora", "to bathe"), ("ধোয়া", "dhoya", "to wash"), ("রান্না করা", "ranna kora", "to cook"), ("পরিষ্কার করা", "poriskar kora", "to clean"),
   ("পরা", "pora", "to wear (clothes)"), ("কাজ করা", "kaj kora", "to work"), ("খেলা", "khela", "to play"),
  ]),
  ("Giving and taking", [
   ("করা", "kora", "to do; to make"), ("দেওয়া", "deoya", "to give"), ("নেওয়া", "neoya", "to take"), ("আনা", "ana", "to bring"), ("রাখা", "rakha", "to put; to keep"),
   ("কেনা", "kena", "to buy"), ("পাওয়া", "paoya", "to get; to find"), ("খোঁজা", "khoja", "to look for"), ("খোলা", "khola", "to open"), ("বন্ধ করা", "bondho kora", "to close"),
  ]),
  ("Mind and speech", [
   ("বলা", "bola", "to say; to tell"), ("শোনা", "shona", "to hear; to listen"), ("দেখা", "dekha", "to see; to look"), ("পড়া", "pora", "to read"), ("লেখা", "lekha", "to write"),
   ("জানা", "jana", "to know"), ("বোঝা", "bojha", "to understand"), ("ভাবা", "bhaba", "to think"), ("চাওয়া", "chaoya", "to want"), ("ভালোবাসা", "bhalobasha", "to love"),
   ("হাসা", "hasha", "to laugh"), ("কাঁদা", "kada", "to cry"), ("গাওয়া", "gaoya", "to sing"), ("নাচা", "nacha", "to dance"), ("ডাকা", "daka", "to call"),
   ("জিজ্ঞেস করা", "jiggesh kora", "to ask"), ("মনে রাখা", "mone rakha", "to remember"), ("ভুলে যাওয়া", "bhule jaoya", "to forget"), ("হওয়া", "hoya", "to be; to become"),
   ("থাকা", "thaka", "to stay; to be (somewhere)"),
  ]),
 ],
 phrases=[
  ("আমি রোজ সকালে হাঁটি।", "ami roj shokale hati.", "I walk every morning."),
  ("তুমি কী চাও?", "tumi ki chao?", "What do you want?"),
  ("আমি তোমাকে ভুলব না।", "ami tomake bhulbo na.", "I will not forget you."),
 ]),

dict(id="describing", group="words", title=("বিশেষণ", "bisheshon", "Describing words"),
 blurb="Adjectives in pairs of opposites, so each one helps you remember the other.",
 sections=[
  ("Size and shape", [
   ("বড়", "boro", "big"), ("ছোট", "chhoto", "small"), ("লম্বা", "lomba", "tall; long"), ("বেঁটে", "bente", "short (height)"), ("মোটা", "mota", "fat; thick"),
   ("রোগা", "roga", "thin"), ("চওড়া", "chowra", "wide"), ("সরু", "shoru", "narrow"), ("গোল", "gol", "round"), ("উঁচু", "unchu", "high"), ("নিচু", "nichu", "low"),
  ]),
  ("Quality", [
   ("ভালো", "bhalo", "good"), ("খারাপ", "kharap", "bad"), ("সুন্দর", "shundor", "beautiful; nice"), ("নতুন", "notun", "new"), ("পুরনো", "purono", "old (things)"),
   ("পরিষ্কার", "poriskar", "clean"), ("ময়লা", "moyla", "dirty"), ("সহজ", "shohoj", "easy"), ("কঠিন", "kothin", "hard; difficult"), ("সত্যি", "shotti", "true"),
   ("মিথ্যা", "mithya", "false"),
  ]),
  ("Weight, speed and amount", [
   ("ভারী", "bhari", "heavy"), ("হালকা", "halka", "light"), ("দ্রুত", "druto", "fast"), ("ধীর", "dhir", "slow"), ("বেশি", "beshi", "more"), ("কম", "kom", "less; few"),
   ("অনেক", "onek", "many; much"), ("অল্প", "olpo", "a little"), ("ভরা", "bhora", "full"), ("খালি", "khali", "empty"),
  ]),
  ("People and states", [
   ("বুড়ো", "buro", "old (person)"), ("তরুণ", "torun", "young"), ("ধনী", "dhoni", "rich"), ("গরিব", "gorib", "poor"), ("সুখী", "shukhi", "happy"),
   ("দুঃখী", "dukhi", "sad"), ("চালাক", "chalak", "clever"), ("শান্ত", "shanto", "calm"), ("ব্যস্ত", "bysto", "busy"),
  ]),
 ],
 phrases=[
  ("এই ঘরটা খুব বড়।", "ei ghorta khub boro.", "This room is very big."),
  ("প্রশ্নটা কঠিন, কিন্তু উত্তরটা সহজ।", "proshnota kothin, kintu uttorta shohoj.", "The question is hard, but the answer is easy."),
  ("আস্তে আস্তে বলুন।", "aste aste bolun.", "Please speak slowly."),
 ]),

dict(id="questions", group="words", title=("প্রশ্নের শব্দ", "proshner shobdo", "Question words"),
 blurb="The words you need to ask anything.",
 sections=[
  ("Asking", [
   ("কে", "ke", "who"), ("কী", "ki", "what"), ("কোথায়", "kothay", "where"), ("কখন", "kokhon", "when (what time)"), ("কবে", "kobe", "when (which day)"),
   ("কেন", "keno", "why"), ("কীভাবে", "kibhabe", "how"), ("কত", "koto", "how much"), ("কয়টা", "koyta", "how many"), ("কোন", "kon", "which"),
   ("কার", "kar", "whose"), ("কাকে", "kakey", "whom"), ("কেমন", "kemon", "how (what like)"),
  ]),
 ],
 phrases=[
  ("আপনার নাম কী?", "apnar nam ki?", "What is your name?"),
  ("আপনি কোথায় থাকেন?", "apni kothay thaken?", "Where do you live?"),
  ("এটা কত টাকা?", "eta koto taka?", "How much is this?"),
 ]),

dict(id="greetings", group="words", title=("সৌজন্য", "soujonno", "Greetings and polite words"),
 blurb="Words for greeting, thanking, apologising and asking for help.",
 sections=[
  ("Greetings", [
   ("নমস্কার", "nomoshkar", "hello (with folded hands)"), ("আদাব", "adab", "hello (a Muslim greeting)"), ("শুভ সকাল", "shubho shokal", "good morning"),
   ("শুভ রাত্রি", "shubho ratri", "good night"), ("স্বাগতম", "shagotom", "welcome"), ("আবার দেখা হবে", "abar dekha hobe", "see you again"),
  ]),
  ("Being polite", [
   ("ধন্যবাদ", "dhonyobad", "thank you"), ("দয়া করে", "doya kore", "please"), ("মাফ করবেন", "maph korben", "excuse me; pardon"),
   ("দুঃখিত", "dukkhito", "sorry"), ("হ্যাঁ", "hyan", "yes"), ("না", "na", "no"), ("ঠিক আছে", "thik achhe", "all right; okay"),
  ]),
  ("Useful questions and requests", [
   ("কেমন আছেন?", "kemon achhen?", "How are you?"), ("ভালো আছি", "bhalo achhi", "I am well"), ("আপনার নাম কী?", "apnar nam ki?", "What is your name?"),
   ("আস্তে বলুন", "aste bolun", "speak slowly, please"), ("আবার বলুন", "abar bolun", "say it again, please"), ("সাহায্য করুন", "shahajyo korun", "please help"),
   ("এর মানে কী?", "er mane ki?", "what does this mean?"), ("আমি বুঝিনি", "ami bujhini", "I did not understand"),
  ]),
 ],
 phrases=[
  ("নমস্কার, আপনি কেমন আছেন?", "nomoshkar, apni kemon achhen?", "Hello, how are you?"),
  ("ধন্যবাদ, আমি ভালো আছি।", "dhonyobad, ami bhalo achhi.", "Thank you, I am well."),
  ("দয়া করে একটু সাহায্য করুন।", "doya kore ekto shahajyo korun.", "Please help me a little."),
 ]),
]
