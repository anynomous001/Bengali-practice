# Topic vocabulary: Time & colours.
TOPICS = [
dict(id="time", group="time", title=("সময়", "shomoy", "Days and time"),
 blurb="Days of the week, parts of the day, and words for when things happen.",
 sections=[
  ("Days of the week", [
   ("রবিবার", "robibar", "Sunday"), ("সোমবার", "shombar", "Monday"), ("মঙ্গলবার", "mongolbar", "Tuesday"), ("বুধবার", "budhbar", "Wednesday"),
   ("বৃহস্পতিবার", "brihoshpotibar", "Thursday"), ("শুক্রবার", "shukrobar", "Friday"), ("শনিবার", "shonibar", "Saturday"),
  ]),
  ("Parts of the day", [
   ("ভোর", "bhor", "dawn"), ("সকাল", "shokal", "morning"), ("দুপুর", "dupur", "noon; midday"), ("বিকেল", "bikel", "afternoon"),
   ("সন্ধ্যা", "shondhya", "evening"), ("রাত", "rat", "night"), ("দিন", "din", "day"),
  ]),
  ("Today, tomorrow, yesterday", [
   ("আজ", "aj", "today"), ("আগামীকাল", "agamikal", "tomorrow"), ("গতকাল", "gotokal", "yesterday"),
   ("কাল", "kal", "tomorrow or yesterday (the tense of the verb tells you which)"), ("এখন", "ekhon", "now"), ("পরে", "pore", "later"),
   ("আগে", "age", "before; earlier"), ("তারপর", "tarpor", "then; after that"),
  ]),
  ("Units of time", [
   ("সময়", "shomoy", "time"), ("সেকেন্ড", "sekend", "second"), ("মিনিট", "minit", "minute"), ("ঘণ্টা", "ghonta", "hour"),
   ("সপ্তাহ", "shoptaho", "week"), ("মাস", "mash", "month"), ("বছর", "bochhor", "year"), ("তারিখ", "tarikh", "date"),
  ]),
  ("How often", [
   ("প্রতিদিন", "protidin", "every day"), ("সবসময়", "shobshomoy", "always"), ("মাঝে মাঝে", "majhe majhe", "sometimes"),
   ("কখনো", "kokhono", "ever; never (with না)"), ("আজকাল", "ajkal", "nowadays"), ("তাড়াতাড়ি", "taratari", "quickly; soon"),
  ]),
 ],
 phrases=[
  ("আজ কী বার?", "aj ki bar?", "What day is it today?"),
  ("আমি প্রতিদিন সকালে চা খাই।", "ami protidin shokale cha khai.", "I drink tea every morning."),
  ("এখন কটা বাজে?", "ekhon kota baje?", "What time is it now?"),
 ]),

dict(id="months", group="time", title=("মাস ও বছর", "mash o bochhor", "Months and the calendar"),
 blurb="The twelve Bengali months and the English months, with the festivals that mark the year.",
 sections=[
  ("Bengali months", [
   ("বৈশাখ", "boishakh", "Boishakh (mid-April to mid-May)"), ("জ্যৈষ্ঠ", "joishtho", "Joishtho (mid-May to mid-June)"),
   ("আষাঢ়", "asharh", "Asharh (mid-June to mid-July)"), ("শ্রাবণ", "shrabon", "Shrabon (mid-July to mid-August)"),
   ("ভাদ্র", "bhadro", "Bhadro (mid-August to mid-September)"), ("আশ্বিন", "ashwin", "Ashwin (mid-September to mid-October)"),
   ("কার্তিক", "kartik", "Kartik (mid-October to mid-November)"), ("অগ্রহায়ণ", "ograhayon", "Ograhayon (mid-November to mid-December)"),
   ("পৌষ", "poush", "Poush (mid-December to mid-January)"), ("মাঘ", "magh", "Magh (mid-January to mid-February)"),
   ("ফাল্গুন", "phalgun", "Phalgun (mid-February to mid-March)"), ("চৈত্র", "choitro", "Choitro (mid-March to mid-April)"),
  ]),
  ("English months", [
   ("জানুয়ারি", "januari", "January"), ("ফেব্রুয়ারি", "phebruari", "February"), ("মার্চ", "march", "March"), ("এপ্রিল", "epril", "April"),
   ("মে", "me", "May"), ("জুন", "jun", "June"), ("জুলাই", "julai", "July"), ("আগস্ট", "agosto", "August"),
   ("সেপ্টেম্বর", "septembor", "September"), ("অক্টোবর", "oktobor", "October"), ("নভেম্বর", "novembor", "November"), ("ডিসেম্বর", "disembor", "December"),
  ]),
  ("Calendar words", [
   ("ক্যালেন্ডার", "kyalendar", "calendar"), ("পঞ্জিকা", "ponjika", "almanac; Bengali calendar"), ("নববর্ষ", "nobobarsho", "new year"),
   ("জন্মদিন", "jonmodin", "birthday"), ("ছুটি", "chhuti", "holiday; leave"),
  ]),
 ],
 phrases=[
  ("বাংলা নববর্ষ পয়লা বৈশাখে।", "bangla nobobarsho poila boishakhe.", "The Bengali new year is on the first of Boishakh."),
  ("তোমার জন্মদিন কবে?", "tomar jonmodin kobe?", "When is your birthday?"),
  ("আমার জন্মদিন মার্চ মাসে।", "amar jonmodin march mashe.", "My birthday is in March."),
 ]),

dict(id="colours", group="time", title=("রং", "rong", "Colours"),
 blurb="Colours and how to describe them.",
 sections=[
  ("Main colours", [
   ("রং", "rong", "colour"), ("লাল", "lal", "red"), ("নীল", "nil", "blue"), ("সবুজ", "shobuj", "green"), ("হলুদ", "holud", "yellow"),
   ("কালো", "kalo", "black"), ("সাদা", "shada", "white"), ("কমলা", "komola", "orange"), ("বেগুনি", "beguni", "purple"),
   ("গোলাপি", "golapi", "pink"), ("বাদামি", "badami", "brown"), ("ধূসর", "dhushor", "grey"),
  ]),
  ("Shades", [
   ("আকাশি", "akashi", "sky blue"), ("খয়েরি", "khoyeri", "reddish brown"), ("সোনালি", "shonali", "golden"), ("রুপোলি", "rupoli", "silver"),
   ("ফিকে", "phike", "pale; light"), ("গাঢ়", "gadho", "dark; deep"), ("উজ্জ্বল", "ujjol", "bright"),
  ]),
 ],
 phrases=[
  ("আমার প্রিয় রং নীল।", "amar priyo rong nil.", "My favourite colour is blue."),
  ("এই শাড়িটা লাল আর সাদা।", "ei sharita lal ar shada.", "This sari is red and white."),
  ("আকাশটা আজ খুব নীল।", "akashta aj khub nil.", "The sky is very blue today."),
 ]),
]
