# Topic vocabulary: People & body. Words are (Bengali, romanized, English[, note]).
TOPICS = [
dict(id="family", group="people", title=("পরিবার", "poribar", "Family"),
 blurb="Parents, grandparents, brothers and sisters, and the many words for aunts and uncles.",
 sections=[
  ("Close family", [
   ("পরিবার", "poribar", "family"), ("মা", "ma", "mother"), ("বাবা", "baba", "father"), ("ভাই", "bhai", "brother"),
   ("বোন", "bon", "sister"), ("দাদা", "dada", "elder brother"), ("দিদি", "didi", "elder sister"),
   ("ছেলে", "chhele", "son; boy"), ("মেয়ে", "meye", "daughter; girl"), ("স্বামী", "shami", "husband"), ("স্ত্রী", "stri", "wife"),
   ("বাচ্চা", "bachcha", "child"), ("শিশু", "shishu", "baby"), ("ছেলেমেয়ে", "chhelemeye", "children"),
  ]),
  ("Grandparents", [
   ("ঠাকুরদা", "thakurda", "grandfather (father's side)"), ("ঠাকুমা", "thakuma", "grandmother (father's side)"),
   ("দাদু", "dadu", "grandfather (mother's side)"), ("দিদা", "dida", "grandmother (mother's side)"),
   ("নাতি", "nati", "grandson"), ("নাতনি", "natni", "granddaughter"),
  ]),
  ("Aunts and uncles", [
   ("কাকা", "kaka", "uncle (father's younger brother)"), ("কাকিমা", "kakima", "aunt (wife of kaka)"),
   ("জেঠু", "jethu", "uncle (father's elder brother)"), ("জেঠিমা", "jethima", "aunt (wife of jethu)"),
   ("পিসি", "pishi", "aunt (father's sister)"), ("পিসেমশাই", "pishemoshai", "uncle (pishi's husband)"),
   ("মামা", "mama", "uncle (mother's brother)"), ("মামি", "mami", "aunt (wife of mama)"),
   ("মাসি", "mashi", "aunt (mother's sister)"), ("মেসো", "meso", "uncle (mashi's husband)"),
  ]),
  ("More in-laws", [
   ("বেয়াই", "beyai", "father of your child's spouse"), ("বেয়ান", "beyan", "mother of your child's spouse"),
   ("বউমা", "bouma", "daughter-in-law (said with affection)"), ("জামাইবাবু", "jamaibabu", "sister's husband"),
   ("বৌদি", "boudi", "brother's wife; sister-in-law"), ("শ্যালক", "shyalok", "wife's brother"), ("শ্যালিকা", "shyalika", "wife's sister"),
   ("দেওর", "deor", "husband's younger brother"), ("ননদ", "nonod", "husband's sister"), ("ভাশুর", "bhashur", "husband's elder brother"),
   ("জা", "ja", "wife of your husband's brother"),
  ]),
  ("Nieces, nephews and in-laws", [
   ("ভাইপো", "bhaipo", "nephew (brother's son)"), ("ভাইঝি", "bhaijhi", "niece (brother's daughter)"),
   ("ভাগ্নে", "bhagne", "nephew (sister's son)"), ("ভাগ্নি", "bhagni", "niece (sister's daughter)"),
   ("শ্বশুর", "shoshur", "father-in-law"), ("শাশুড়ি", "shashuri", "mother-in-law"),
   ("বউ", "bou", "wife; daughter-in-law"), ("জামাই", "jamai", "son-in-law"),
  ]),
  ("Others", [
   ("আত্মীয়", "atmiyo", "relative"), ("বন্ধু", "bondhu", "friend"), ("প্রতিবেশী", "protibeshi", "neighbour"),
  ]),
 ],
 phrases=[
  ("ইনি আমার মা।", "ini amar ma.", "This is my mother."),
  ("আমার একটা ছোট ভাই আছে।", "amar ekta chhoto bhai achhe.", "I have a younger brother."),
  ("তোমার বাড়িতে কে কে আছে?", "tomar barite ke ke achhe?", "Who is there in your home?"),
 ]),

dict(id="people", group="people", title=("মানুষ ও পেশা", "manush o pesha", "People and jobs"),
 blurb="Kinds of people and the work they do.",
 sections=[
  ("People", [
   ("মানুষ", "manush", "person; people"), ("পুরুষ", "purush", "man"), ("মহিলা", "mohila", "woman"),
   ("অতিথি", "atithi", "guest"), ("বিদেশি", "bideshi", "foreigner"), ("রাজা", "raja", "king"), ("রানি", "rani", "queen"),
   ("ছাত্র", "chhatro", "student (boy)"), ("ছাত্রী", "chhatri", "student (girl)"),
  ]),
  ("Jobs", [
   ("শিক্ষক", "shikkhok", "teacher"), ("ডাক্তার", "daktar", "doctor"), ("নার্স", "nars", "nurse"), ("উকিল", "ukil", "lawyer"),
   ("ইঞ্জিনিয়ার", "enjiniyar", "engineer"), ("চাষি", "chashi", "farmer"), ("জেলে", "jele", "fisherman"),
   ("দোকানদার", "dokandar", "shopkeeper"), ("ব্যবসায়ী", "byabsayi", "businessperson"), ("ড্রাইভার", "draibhar", "driver"),
   ("রাঁধুনি", "randhuni", "cook"), ("পুলিশ", "pulish", "police officer"), ("সৈনিক", "soinik", "soldier"),
   ("শিল্পী", "shilpi", "artist"), ("লেখক", "lekhok", "writer"), ("গায়ক", "gayok", "singer"),
   ("নাপিত", "napit", "barber"), ("কুমোর", "kumor", "potter"), ("তাঁতি", "tanti", "weaver"),
   ("মাঝি", "majhi", "boatman"), ("পুরোহিত", "purohit", "priest"),
  ]),
 ],
 phrases=[
  ("আপনি কী করেন?", "apni ki koren?", "What do you do?"),
  ("আমি শিক্ষক।", "ami shikkhok.", "I am a teacher."),
  ("উনি ডাক্তার।", "uni daktar.", "He/She is a doctor."),
 ]),

dict(id="body", group="people", title=("শরীর", "shorir", "The body"),
 blurb="Parts of the body, and how to say what hurts.",
 sections=[
  ("Head and face", [
   ("মাথা", "matha", "head"), ("চুল", "chul", "hair"), ("কপাল", "kopal", "forehead"), ("মুখ", "mukh", "face; mouth"),
   ("চোখ", "chokh", "eye"), ("ভুরু", "bhuru", "eyebrow"), ("কান", "kan", "ear"), ("নাক", "nak", "nose"),
   ("গাল", "gal", "cheek"), ("ঠোঁট", "thont", "lip"), ("দাঁত", "dant", "tooth"), ("জিভ", "jibh", "tongue"),
   ("দাড়ি", "dari", "beard"), ("গোঁফ", "gonph", "moustache"),
  ]),
  ("Body", [
   ("শরীর", "shorir", "body"), ("গলা", "gola", "neck; throat; voice"), ("কাঁধ", "kandh", "shoulder"), ("বুক", "buk", "chest"),
   ("পেট", "pet", "stomach"), ("পিঠ", "pith", "back"), ("কোমর", "komor", "waist"),
  ]),
  ("Arms and legs", [
   ("হাত", "hat", "hand; arm"), ("আঙুল", "angul", "finger"), ("নখ", "nokh", "nail"), ("পা", "pa", "foot; leg"), ("হাঁটু", "hantu", "knee"),
  ]),
  ("Inside", [
   ("হৃদয়", "hridoy", "heart"), ("মন", "mon", "mind; heart"), ("হাড়", "har", "bone"), ("চামড়া", "chamra", "skin"), ("রক্ত", "rokto", "blood"),
  ]),
  ("Being unwell", [
   ("ব্যথা", "byatha", "pain"), ("জ্বর", "jor", "fever"), ("সর্দি", "shordi", "cold"), ("কাশি", "kashi", "cough"),
   ("মাথাব্যথা", "mathabyatha", "headache"), ("পেটব্যথা", "petbyatha", "stomach ache"), ("ওষুধ", "oshudh", "medicine"),
  ]),
 ],
 phrases=[
  ("আমার মাথা ব্যথা করছে।", "amar matha byatha korchhe.", "I have a headache."),
  ("আমার জ্বর হয়েছে।", "amar jor hoyechhe.", "I have a fever."),
  ("আমার পেটে ব্যথা।", "amar pete byatha.", "I have a pain in my stomach."),
 ]),

dict(id="feelings", group="people", title=("অনুভূতি", "onubhuti", "Feelings"),
 blurb="Emotions, hunger and thirst, sleep and health.",
 sections=[
  ("Emotions", [
   ("খুশি", "khushi", "happy"), ("আনন্দ", "anondo", "joy"), ("দুঃখ", "dukkho", "sadness"), ("রাগ", "rag", "anger"),
   ("ভয়", "bhoy", "fear"), ("ভালোবাসা", "bhalobasha", "love"), ("লজ্জা", "lojja", "shyness; shame"),
   ("অবাক", "abak", "surprised"), ("চিন্তা", "chinta", "worry"), ("আশা", "asha", "hope"),
  ]),
  ("The body's needs", [
   ("খিদে", "khide", "hunger"), ("তেষ্টা", "teshta", "thirst"), ("ঘুম", "ghum", "sleep"), ("ক্লান্ত", "klanto", "tired"),
   ("সুস্থ", "shustho", "healthy; well"), ("অসুস্থ", "oshustho", "unwell; ill"), ("ভালো লাগা", "bhalo laga", "to like; to feel good"),
   ("একা", "eka", "alone"),
  ]),
 ],
 phrases=[
  ("আমার খুব খিদে পেয়েছে।", "amar khub khide peyechhe.", "I am very hungry."),
  ("আমার ঘুম পাচ্ছে।", "amar ghum pachchhe.", "I am sleepy."),
  ("আমি খুব খুশি।", "ami khub khushi.", "I am very happy."),
 ]),
]
