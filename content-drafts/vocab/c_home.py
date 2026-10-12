# Topic vocabulary: Home & things.
TOPICS = [
dict(id="house", group="home", title=("বাড়ি", "bari", "House and rooms"),
 blurb="Parts of a home and the rooms inside it.",
 sections=[
  ("The house", [
   ("বাড়ি", "bari", "house; home"), ("ঘর", "ghor", "room"), ("দরজা", "dorja", "door"), ("জানালা", "janala", "window"),
   ("দেয়াল", "deyal", "wall"), ("ছাদ", "chhad", "roof"), ("মেঝে", "mejhe", "floor"), ("সিঁড়ি", "siri", "stairs"),
   ("বারান্দা", "baranda", "balcony; veranda"), ("উঠোন", "uthon", "courtyard"), ("বাগান", "bagan", "garden"), ("গেট", "get", "gate"),
  ]),
  ("Rooms", [
   ("রান্নাঘর", "rannaghor", "kitchen"), ("শোওয়ার ঘর", "showar ghor", "bedroom"), ("বসার ঘর", "boshar ghor", "sitting room"),
   ("স্নানঘর", "snanghor", "bathroom"), ("খাওয়ার ঘর", "khaoar ghor", "dining room"), ("ঠাকুরঘর", "thakurghor", "prayer room"),
  ]),
  ("Living in the house", [
   ("চাবি", "chabi", "key"), ("তালা", "tala", "lock"), ("আলো", "alo", "light"), ("অন্ধকার", "ondhokar", "darkness"),
   ("বিদ্যুৎ", "biddyut", "electricity"), ("পাখা", "pakha", "fan"), ("ঘণ্টা", "ghonta", "bell"),
  ]),
 ],
 phrases=[
  ("আমার বাড়ি কলকাতায়।", "amar bari kolkatay.", "My home is in Kolkata."),
  ("দরজাটা বন্ধ করে দাও।", "dorjata bondho kore dao.", "Please close the door."),
  ("জানালাটা খুলে দিন।", "janalata khule din.", "Please open the window."),
 ]),

dict(id="things", group="home", title=("জিনিসপত্র", "jinishpotro", "Things at home"),
 blurb="Furniture, kitchenware and everyday objects.",
 sections=[
  ("Furniture", [
   ("জিনিস", "jinish", "thing"), ("টেবিল", "tebil", "table"), ("চেয়ার", "cheyar", "chair"), ("খাট", "khat", "bed (frame)"),
   ("বিছানা", "bichhana", "bedding; bed"), ("আলমারি", "almari", "cupboard"), ("তাক", "tak", "shelf"), ("আয়না", "ayna", "mirror"),
  ]),
  ("Bedding and bath", [
   ("বালিশ", "balish", "pillow"), ("চাদর", "chadar", "bedsheet"), ("কম্বল", "kombol", "blanket"), ("মাদুর", "madur", "mat"),
   ("সাবান", "saban", "soap"), ("তোয়ালে", "toyale", "towel"), ("চিরুনি", "chiruni", "comb"), ("বালতি", "balti", "bucket"),
  ]),
  ("Kitchen things", [
   ("থালা", "thala", "plate"), ("বাটি", "bati", "bowl"), ("গ্লাস", "glas", "glass"), ("চামচ", "chamoch", "spoon"),
   ("ছুরি", "chhuri", "knife"), ("হাঁড়ি", "hari", "cooking pot"), ("কড়াই", "korai", "wok"), ("খুন্তি", "khunti", "spatula"),
   ("ঢাকনা", "dhakna", "lid"), ("উনুন", "unun", "stove"), ("বোতল", "botol", "bottle"),
  ]),
  ("Everyday objects", [
   ("ঘড়ি", "ghori", "clock; watch"), ("ছাতা", "chhata", "umbrella"), ("ব্যাগ", "byag", "bag"), ("ঝাঁটা", "jhanta", "broom"),
   ("টর্চ", "torch", "torch"), ("মোমবাতি", "mombati", "candle"), ("দেশলাই", "deshlai", "matchbox"), ("কাগজ", "kagoj", "paper"),
  ]),
 ],
 phrases=[
  ("টেবিলের উপর বইটা রাখো।", "tebiler upor boita rakho.", "Put the book on the table."),
  ("আমার ছাতাটা কোথায়?", "amar chhatata kothay?", "Where is my umbrella?"),
  ("এই থালাটা পরিষ্কার করো।", "ei thalata poriskar koro.", "Clean this plate."),
 ]),

dict(id="clothes", group="home", title=("পোশাক", "poshak", "Clothes"),
 blurb="What people wear, from everyday clothes to the festival sari.",
 sections=[
  ("Everyday clothes", [
   ("পোশাক", "poshak", "clothes"), ("কাপড়", "kapor", "cloth; clothes"), ("জামা", "jama", "shirt; dress"), ("শার্ট", "shart", "shirt"),
   ("প্যান্ট", "pyant", "trousers"), ("গেঞ্জি", "genji", "vest; t-shirt"), ("মোজা", "moja", "socks"), ("জুতো", "juto", "shoes"),
   ("চটি", "choti", "sandals; slippers"), ("টুপি", "tupi", "cap"), ("রুমাল", "rumal", "handkerchief"),
  ]),
  ("Traditional wear", [
   ("শাড়ি", "shari", "sari"), ("ধুতি", "dhuti", "dhoti"), ("পাঞ্জাবি", "panjabi", "panjabi (long shirt)"), ("কুর্তা", "kurta", "kurta"),
   ("সালোয়ার", "shalwar", "salwar"), ("ওড়না", "orna", "scarf; stole"), ("লুঙ্গি", "lungi", "lungi"), ("গামছা", "gamchha", "thin cotton towel"),
  ]),
  ("Jewellery and accessories", [
   ("গয়না", "goyna", "jewellery"), ("চুড়ি", "churi", "bangle"), ("হার", "har", "necklace"), ("আংটি", "angti", "ring"),
   ("চশমা", "choshma", "glasses"), ("বেল্ট", "belt", "belt"), ("ঘড়ি", "ghori", "watch"),
  ]),
 ],
 phrases=[
  ("আজ আমি নতুন শাড়ি পরব।", "aj ami notun shari porbo.", "Today I will wear a new sari."),
  ("এই জামাটা আমাকে মানাচ্ছে না।", "ei jamata amake manachchhe na.", "This shirt doesn't suit me."),
  ("আমার জুতো ছোট হয়ে গেছে।", "amar juto chhoto hoye gechhe.", "My shoes have become small."),
 ]),
]
