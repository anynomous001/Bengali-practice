# Topic vocabulary: Nature.
TOPICS = [
dict(id="animals", group="nature", title=("পশু", "poshu", "Animals"),
 blurb="Pets, farm animals and wild animals.",
 sections=[
  ("Pets and farm animals", [
   ("পশু", "poshu", "animal"), ("কুকুর", "kukur", "dog"), ("বিড়াল", "biral", "cat"), ("গরু", "goru", "cow"), ("ষাঁড়", "shnar", "bull"),
   ("মহিষ", "mohish", "buffalo"), ("ছাগল", "chhagol", "goat"), ("ভেড়া", "bhera", "sheep"), ("ঘোড়া", "ghora", "horse"),
   ("গাধা", "gadha", "donkey"), ("শূকর", "shukor", "pig"), ("উট", "ut", "camel"),
  ]),
  ("Wild animals", [
   ("হাতি", "hati", "elephant"), ("বাঘ", "bagh", "tiger"), ("সিংহ", "shingho", "lion"), ("ভালুক", "bhaluk", "bear"),
   ("হরিণ", "horin", "deer"), ("শেয়াল", "sheyal", "jackal; fox"), ("নেকড়ে", "nekre", "wolf"), ("বাঁদর", "bandor", "monkey"),
   ("গন্ডার", "gondar", "rhinoceros"),
  ]),
  ("Small animals", [
   ("খরগোশ", "khorgosh", "rabbit"), ("ইঁদুর", "indur", "mouse; rat"), ("কাঠবিড়ালি", "kathbirali", "squirrel"),
   ("সাপ", "shap", "snake"), ("কুমির", "kumir", "crocodile"), ("কচ্ছপ", "kochchhop", "tortoise"), ("ব্যাঙ", "byang", "frog"),
  ]),
 ],
 phrases=[
  ("আমার একটা কুকুর আছে।", "amar ekta kukur achhe.", "I have a dog."),
  ("সুন্দরবনে বাঘ আছে।", "shundorbone bagh achhe.", "There are tigers in the Sundarbans."),
  ("বিড়ালটা দুধ খাচ্ছে।", "biralta dudh khachchhe.", "The cat is drinking milk."),
 ]),

dict(id="birds-insects", group="nature", title=("পাখি ও পোকা", "pakhi o poka", "Birds and insects"),
 blurb="Birds you see and hear, and the small creatures around them.",
 sections=[
  ("Birds", [
   ("পাখি", "pakhi", "bird"), ("কাক", "kak", "crow"), ("চড়ুই", "choroi", "sparrow"), ("শালিক", "shalik", "myna"),
   ("কোকিল", "kokil", "koel; cuckoo"), ("ময়ূর", "moyur", "peacock"), ("টিয়া", "tiya", "parrot"), ("পায়রা", "payra", "pigeon"),
   ("হাঁস", "hans", "duck"), ("মুরগি", "murgi", "hen"), ("মোরগ", "morog", "rooster"), ("বক", "bok", "egret; crane"),
   ("ঈগল", "igol", "eagle"), ("পেঁচা", "pencha", "owl"),
  ]),
  ("Insects and small creatures", [
   ("পোকা", "poka", "insect; bug"), ("মাছি", "machhi", "fly"), ("মশা", "mosha", "mosquito"), ("পিঁপড়ে", "pipre", "ant"),
   ("প্রজাপতি", "projapoti", "butterfly"), ("মৌমাছি", "moumachhi", "bee"), ("মাকড়সা", "makorsha", "spider"),
   ("আরশোলা", "arshola", "cockroach"), ("ফড়িং", "phoring", "grasshopper"), ("জোনাকি", "jonaki", "firefly"), ("কেঁচো", "kencho", "earthworm"),
  ]),
  ("Bird words", [
   ("ডানা", "dana", "wing"), ("পালক", "palok", "feather"), ("বাসা", "basha", "nest"), ("ঠোঁট", "thont", "beak; lip"), ("ডিম", "dim", "egg"),
  ]),
 ],
 phrases=[
  ("গাছে একটা পাখি বসে আছে।", "gachhe ekta pakhi boshe achhe.", "A bird is sitting on the tree."),
  ("কোকিল গান গাইছে।", "kokil gan gaichhe.", "The koel is singing."),
  ("রাতে খুব মশা কামড়ায়।", "rate khub mosha kamray.", "Mosquitoes bite a lot at night."),
 ]),

dict(id="nature", group="nature", title=("প্রকৃতি", "prokriti", "Nature"),
 blurb="Sky, water, land, trees and flowers.",
 sections=[
  ("Sky", [
   ("আকাশ", "akash", "sky"), ("সূর্য", "shurjo", "sun"), ("চাঁদ", "chand", "moon"), ("তারা", "tara", "star"), ("মেঘ", "megh", "cloud"),
   ("রোদ", "rod", "sunshine"), ("বাতাস", "batash", "wind; air"), ("বৃষ্টি", "brishti", "rain"), ("ঝড়", "jhor", "storm"),
   ("কুয়াশা", "kuasha", "fog; mist"), ("বজ্র", "bojro", "thunder"),
  ]),
  ("Water", [
   ("জল", "jol", "water"), ("নদী", "nodi", "river"), ("সমুদ্র", "shomudro", "sea"), ("পুকুর", "pukur", "pond"), ("খাল", "khal", "canal"),
   ("ঝরনা", "jhorna", "waterfall; spring"), ("ঢেউ", "dheu", "wave"), ("ঘাট", "ghat", "river steps; landing"), ("দ্বীপ", "dwip", "island"),
  ]),
  ("Land", [
   ("মাটি", "mati", "soil; earth"), ("পাহাড়", "pahar", "hill; mountain"), ("মাঠ", "math", "field"), ("বন", "bon", "forest"),
   ("জঙ্গল", "jongol", "jungle"), ("বালি", "bali", "sand"), ("পাথর", "pathor", "stone"), ("পথ", "poth", "path"), ("আগুন", "agun", "fire"),
  ]),
  ("Plants", [
   ("গাছ", "gachh", "tree; plant"), ("পাতা", "pata", "leaf"), ("ফুল", "phul", "flower"), ("ঘাস", "ghas", "grass"), ("ধান", "dhan", "paddy"),
   ("পাট", "pat", "jute"), ("বাঁশ", "bansh", "bamboo"), ("বট", "bot", "banyan tree"), ("নিম", "nim", "neem"),
  ]),
  ("Flowers", [
   ("গোলাপ", "golap", "rose"), ("পদ্ম", "podmo", "lotus"), ("জবা", "joba", "hibiscus"), ("শিউলি", "shiuli", "night jasmine"),
   ("বেলি", "beli", "jasmine"), ("গাঁদা", "ganda", "marigold"), ("কাশফুল", "kashphul", "kash grass flower"), ("রজনীগন্ধা", "rojonigondha", "tuberose"),
  ]),
 ],
 phrases=[
  ("আকাশে মেঘ করেছে।", "akashe megh korechhe.", "Clouds have gathered in the sky."),
  ("নদীর পাড়ে অনেক গাছ আছে।", "nodir pare onek gachh achhe.", "There are many trees on the river bank."),
  ("শরতে কাশফুল ফোটে।", "shorote kashphul phote.", "Kash flowers bloom in autumn."),
 ]),

dict(id="weather", group="nature", title=("আবহাওয়া ও ঋতু", "abhaoya o ritu", "Weather and seasons"),
 blurb="The six Bengali seasons, and how to talk about the weather.",
 sections=[
  ("The six seasons", [
   ("ঋতু", "ritu", "season"), ("গ্রীষ্ম", "grishmo", "summer"), ("বর্ষা", "borsha", "monsoon"), ("শরৎ", "shorot", "autumn"),
   ("হেমন্ত", "hemonto", "late autumn"), ("শীত", "shit", "winter"), ("বসন্ত", "boshonto", "spring"),
  ]),
  ("Describing the weather", [
   ("আবহাওয়া", "abhaoya", "weather"), ("গরম", "gorom", "hot"), ("ঠান্ডা", "thanda", "cold"), ("মেঘলা", "meghla", "cloudy"),
   ("রোদেলা", "rodela", "sunny"), ("ভেজা", "bheja", "wet"), ("শুকনো", "shukno", "dry"), ("স্যাঁতসেঁতে", "syatsente", "damp; humid"),
   ("আরামদায়ক", "aramdayok", "comfortable; pleasant"),
  ]),
 ],
 phrases=[
  ("আজ খুব গরম।", "aj khub gorom.", "It is very hot today."),
  ("বাইরে বৃষ্টি হচ্ছে।", "baire brishti hochchhe.", "It is raining outside."),
  ("কলকাতায় শীত খুব কম।", "kolkatay shit khub kom.", "Winter in Kolkata is very mild."),
 ]),
]
