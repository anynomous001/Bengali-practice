# Topic vocabulary: Food & kitchen.
TOPICS = [
dict(id="food", group="food", title=("খাবার", "khabar", "Food and drink"),
 blurb="Everyday meals, drinks, and how food tastes.",
 sections=[
  ("Staples", [
   ("খাবার", "khabar", "food"), ("ভাত", "bhat", "cooked rice"), ("চাল", "chal", "raw rice"), ("ডাল", "dal", "lentils"),
   ("রুটি", "ruti", "flatbread"), ("লুচি", "luchi", "puffed fried bread"), ("পরোটা", "porota", "layered flatbread"),
   ("পাঁউরুটি", "paurooti", "bread loaf"), ("আটা", "ata", "wheat flour"), ("ময়দা", "moyda", "refined flour"),
  ]),
  ("Dishes", [
   ("তরকারি", "torkari", "curry; vegetable dish"), ("ঝোল", "jhol", "thin curry; stew"), ("ভর্তা", "bhorta", "mashed dish"),
   ("খিচুড়ি", "khichuri", "rice and lentil dish"), ("বিরিয়ানি", "biriyani", "biryani"), ("পায়েস", "payesh", "rice pudding"),
   ("ডিম", "dim", "egg"), ("ভাজা", "bhaja", "fried"), ("সেদ্ধ", "sheddho", "boiled"),
  ]),
  ("Dairy, oil and sweeteners", [
   ("দুধ", "dudh", "milk"), ("দই", "doi", "curd; yoghurt"), ("ঘি", "ghi", "ghee"), ("মাখন", "makhon", "butter"),
   ("চিনি", "chini", "sugar"), ("গুড়", "gur", "jaggery"), ("নুন", "nun", "salt"), ("তেল", "tel", "oil"), ("মধু", "modhu", "honey"),
  ]),
  ("Drinks", [
   ("জল", "jol", "water"), ("চা", "cha", "tea"), ("কফি", "kophi", "coffee"), ("শরবত", "shorbot", "sweet cooling drink"),
   ("রস", "ros", "juice"), ("ডাবের জল", "daber jol", "coconut water"),
  ]),
  ("Tastes", [
   ("মিষ্টি", "mishti", "sweet"), ("টক", "tok", "sour"), ("ঝাল", "jhal", "spicy hot"), ("নোনতা", "nonta", "salty"), ("তেতো", "teto", "bitter"),
   ("সুস্বাদু", "shushwadu", "tasty"),
  ]),
 ],
 phrases=[
  ("আমি ভাত খাই।", "ami bhat khai.", "I eat rice."),
  ("আমাকে এক গ্লাস জল দিন।", "amake ek glas jol din.", "Please give me a glass of water."),
  ("ঝালটা একটু কম দেবেন।", "jhalta ekto kom deben.", "Please make it a little less spicy."),
 ]),

dict(id="fish-meat", group="food", title=("মাছ ও মাংস", "mach o mangsho", "Fish and meat"),
 blurb="The fish Bengal is famous for, and common meats.",
 sections=[
  ("Fish", [
   ("মাছ", "mach", "fish"), ("ইলিশ", "ilish", "hilsa"), ("রুই", "rui", "rohu"), ("কাতলা", "katla", "catla"),
   ("ভেটকি", "bhetki", "barramundi"), ("পাবদা", "pabda", "pabda catfish"), ("কই", "koi", "climbing perch"),
   ("মাগুর", "magur", "magur catfish"), ("চিতল", "chital", "clown knifefish"), ("ট্যাংরা", "tyangra", "tengra catfish"),
   ("পুঁটি", "punti", "small barb"), ("চিংড়ি", "chingri", "prawn"), ("কাঁকড়া", "kankra", "crab"),
  ]),
  ("Meat and eggs", [
   ("মাংস", "mangsho", "meat"), ("মুরগি", "murgi", "chicken"), ("পাঁঠা", "pantha", "goat"), ("খাসি", "khasi", "castrated goat meat"),
   ("ডিম", "dim", "egg"), ("হাঁসের ডিম", "hanser dim", "duck egg"),
  ]),
  ("Fish words", [
   ("কাঁটা", "kanta", "fish bone; thorn"), ("আঁশ", "ansh", "scale"), ("জেলে", "jele", "fisherman"), ("জাল", "jal", "net"),
  ]),
 ],
 phrases=[
  ("আমি ইলিশ মাছ ভালোবাসি।", "ami ilish mach bhalobashi.", "I love hilsa fish."),
  ("মাছটা কত করে কিলো?", "machhta koto kore kilo?", "How much is the fish per kilo?"),
  ("এটা কি ভেটকি?", "eta ki bhetki?", "Is this bhetki?"),
 ]),

dict(id="fruits", group="food", title=("ফল", "phol", "Fruits"),
 blurb="Fruits of the season and nuts.",
 sections=[
  ("Common fruits", [
   ("ফল", "phol", "fruit"), ("আম", "am", "mango"), ("কলা", "kola", "banana"), ("আপেল", "apel", "apple"),
   ("কমলালেবু", "komolalebu", "orange"), ("লেবু", "lebu", "lemon; lime"), ("আঙুর", "angur", "grapes"),
   ("তরমুজ", "tormuj", "watermelon"), ("পেঁপে", "pepe", "papaya"), ("পেয়ারা", "peyara", "guava"),
   ("আনারস", "anarosh", "pineapple"), ("নাশপাতি", "nashpati", "pear"), ("ডালিম", "dalim", "pomegranate"),
  ]),
  ("Bengali favourites", [
   ("কাঁঠাল", "kanthal", "jackfruit"), ("লিচু", "lichu", "lychee"), ("জাম", "jam", "black plum"), ("কুল", "kul", "jujube"),
   ("বেল", "bel", "wood apple"), ("তাল", "tal", "palmyra fruit"), ("আতা", "ata", "custard apple"), ("নারকেল", "narkel", "coconut"),
  ]),
  ("Dry fruit and nuts", [
   ("খেজুর", "khejur", "dates"), ("কিশমিশ", "kishmish", "raisins"), ("বাদাম", "badam", "nuts; peanuts"), ("কাজু", "kaju", "cashew"),
  ]),
 ],
 phrases=[
  ("আমি আম খেতে ভালোবাসি।", "ami am khete bhalobashi.", "I like to eat mangoes."),
  ("এই আমটা কি মিষ্টি?", "ei amta ki mishti?", "Is this mango sweet?"),
  ("আমাকে আধ কিলো আঙুর দিন।", "amake adh kilo angur din.", "Give me half a kilo of grapes."),
 ]),

dict(id="vegetables", group="food", title=("সবজি ও মশলা", "shobji o moshla", "Vegetables and spices"),
 blurb="The vegetables in a Bengali kitchen, and the spices that flavour them.",
 sections=[
  ("Everyday vegetables", [
   ("সবজি", "shobji", "vegetable"), ("আলু", "alu", "potato"), ("পেঁয়াজ", "peyaj", "onion"), ("টমেটো", "tometo", "tomato"),
   ("বেগুন", "begun", "aubergine"), ("গাজর", "gajor", "carrot"), ("মূলো", "mulo", "radish"), ("শসা", "shosha", "cucumber"),
   ("বিট", "bit", "beetroot"), ("মটরশুঁটি", "motorshuti", "peas"),
  ]),
  ("Bengali vegetables", [
   ("ফুলকপি", "phulkopi", "cauliflower"), ("বাঁধাকপি", "bandhakopi", "cabbage"), ("পটল", "potol", "pointed gourd"),
   ("ঝিঙে", "jhinge", "ridge gourd"), ("লাউ", "lau", "bottle gourd"), ("কুমড়ো", "kumro", "pumpkin"), ("কাঁচকলা", "kanchkola", "raw banana"),
   ("ঢেঁড়স", "dheros", "okra"), ("করলা", "korola", "bitter gourd"), ("সজনে", "shojne", "drumstick"), ("ওল", "ol", "elephant foot yam"),
   ("কচু", "kochu", "taro"),
  ]),
  ("Greens", [
   ("শাক", "shak", "leafy greens"), ("পালং শাক", "palong shak", "spinach"), ("ধনেপাতা", "dhonepata", "coriander leaves"),
  ]),
  ("Spices and flavours", [
   ("মশলা", "moshla", "spice"), ("লঙ্কা", "lonka", "chilli"), ("কাঁচা লঙ্কা", "kancha lonka", "green chilli"), ("রসুন", "roshun", "garlic"),
   ("আদা", "ada", "ginger"), ("হলুদ", "holud", "turmeric"), ("জিরে", "jire", "cumin"), ("ধনে", "dhone", "coriander seed"),
   ("সরষে", "sorshe", "mustard seed"), ("মরিচ", "morich", "black pepper"), ("এলাচ", "elach", "cardamom"),
   ("দারচিনি", "darchini", "cinnamon"), ("লবঙ্গ", "lobongo", "clove"), ("তেজপাতা", "tejpata", "bay leaf"),
   ("পাঁচফোড়ন", "panchphoron", "five-spice mix"), ("মৌরি", "mouri", "fennel seed"), ("কালোজিরে", "kalojire", "nigella seed"),
  ]),
 ],
 phrases=[
  ("আমি আলু আর পেঁয়াজ কিনব।", "ami alu ar peyaj kinbo.", "I will buy potatoes and onions."),
  ("আজ কী তরকারি হয়েছে?", "aj ki torkari hoyechhe?", "What curry is there today?"),
  ("একটু নুন আর হলুদ দিন।", "ekto nun ar holud din.", "Add a little salt and turmeric."),
 ]),

dict(id="sweets-snacks", group="food", title=("মিষ্টি ও জলখাবার", "mishti o jolkhabar", "Sweets and snacks"),
 blurb="Kolkata's famous sweets and street snacks.",
 sections=[
  ("Sweets", [
   ("মিষ্টি", "mishti", "sweet; sweets"), ("রসগোল্লা", "roshogolla", "rosogolla"), ("সন্দেশ", "shondesh", "shondesh"),
   ("মিষ্টি দই", "mishti doi", "sweet curd"), ("পান্তুয়া", "pantua", "pantua"), ("চমচম", "chomchom", "chomchom"),
   ("জিলিপি", "jilipi", "jalebi"), ("নাড়ু", "naru", "coconut sweet ball"), ("পিঠে", "pithe", "winter rice cakes"),
   ("নলেন গুড়", "nolen gur", "date-palm jaggery"), ("পায়েস", "payesh", "rice pudding"),
  ]),
  ("Snacks", [
   ("জলখাবার", "jolkhabar", "snack; light meal"), ("ফুচকা", "phuchka", "phuchka"), ("ঝালমুড়ি", "jhalmuri", "spiced puffed rice"),
   ("মুড়ি", "muri", "puffed rice"), ("চানাচুর", "chanachur", "chanachur mix"), ("ঘুগনি", "ghugni", "spiced yellow-pea curry"),
   ("তেলেভাজা", "telebhaja", "fried fritters"), ("বেগুনি", "beguni", "aubergine fritter"), ("আলুর চপ", "alur chop", "potato chop"),
   ("কাটলেট", "katlet", "cutlet"), ("কাঠি রোল", "kathi rol", "kathi roll"), ("সিঙ্গারা", "singara", "samosa"),
  ]),
 ],
 phrases=[
  ("আমাকে দুটো রসগোল্লা দিন।", "amake duto roshogolla din.", "Give me two rosogollas."),
  ("এখানকার ফুচকা খুব ভালো।", "ekhankar phuchka khub bhalo.", "The phuchka here is very good."),
  ("একটা ঝালমুড়ি দিন, ঝাল কম।", "ekta jhalmuri din, jhal kom.", "One jhalmuri, please, less spicy."),
 ]),
]
