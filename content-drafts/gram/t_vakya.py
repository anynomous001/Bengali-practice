from lib import *

S = SENT
TOPICS = [finish(dict(id="vakya", title=("বাক্য", "Bakyo", "Building sentences"),
 blurb="Word order, describing words, comparing, joining sentences with 'and', 'but' and 'because', and giving reasons.",
 sections=[
  dict(id="order", title="Word order: subject, object, verb", blocks=[
   P("A Bengali sentence usually follows the order subject – object – verb (SOV): আমি ভাত খাই, literally 'I rice eat'. The verb comes last. English puts the verb in the middle (subject – verb – object), so this is the first big habit to learn."),
   RULE("The order of a plain sentence", "Doer first, then the other parts (time, place, object), and the verb at the very end.", [("আমি ভাত খাই।","ami bhat khai.","I eat rice. (I – rice – eat)"), ("সে বই পড়ে।","she boi pore.","He / she reads a book. (he – book – reads)")]),
   TABLE(["Part", "Position", "Example"], [
     ["doer (subject)", "first", c("আমি","ami")], ["time", "near the start", c("রোজ সকালে","roj shokale")], ["place", "before the object", c("বাজারে","bajare")], ["object", "just before the verb", c("মাছ","mach")], ["verb", "last", c("কিনি","kini")],
   ], "A fuller sentence: আমি রোজ সকালে বাজারে মাছ কিনি"),
   EXS([("আমি রোজ সকালে বাজারে মাছ কিনি।","ami roj shokale bajare mach kini.","I buy fish at the market every morning."), ("মা রান্নাঘরে ভাত রান্না করছেন।","ma rannaghore bhat ranna korchhen.","Mother is cooking rice in the kitchen."), ("শিক্ষক ক্লাসে ছাত্রদের গল্প বললেন।","shikkhok klase chhatroder golpo bollen.","The teacher told the students a story in class."),
        ("সে কাল বন্ধুকে চিঠি লিখবে।","she kal bondhuke chithi likhbe.","He / she will write a letter to a friend tomorrow."), ("আমরা রবিবার পার্কে খেলি।","amra robibar parke kheli.","We play in the park on Sundays."), ("বাবা অফিসে যান।","baba ofise jan.","Father goes to the office."),
        ("আমি আজ সকালে চা খাইনি।","ami aj shokale cha khaini.","I did not have tea this morning."), ("ছেলেরা মাঠে ফুটবল খেলছে।","chhelera mathe phutbol khelchhe.","The boys are playing football in the field.")], "Verb last"),
   MISTAKES([
     (("আমি খাই ভাত।","ami khai bhat."), ("আমি ভাত খাই।","ami bhat khai."), "The verb goes at the end."),
     (("যায় সে বাজারে।","jay she bajare."), ("সে বাজারে যায়।","she bajare jay."), "Subject first, verb last."),
   ], title="Do not put the verb in the middle"),
   NOTE("In speech, and in poetry, a word is sometimes moved to the end for stress: খাই আমি ভাত? is rare, but আমি যাব না, কাল is a natural afterthought. As a learner, keep to subject – object – verb."),
  ]),

  dict(id="adj", title="Describing words: adjectives and adverbs", blocks=[
   P("An adjective (বিশেষণ) comes before the noun it describes: ভালো বই (good book), বড় বাড়ি (big house). An adverb (ক্রিয়াবিশেষণ) comes before the verb it describes: আস্তে বলো (speak slowly). Adjectives do not change for number or gender, and the noun carries any ending."),
   TABLE(["Adjective", "Meaning", "Example"], [
     [c("ভালো","bhalo"), "good", c("ভালো বই","bhalo boi")], [c("খারাপ","kharap"), "bad", c("খারাপ আবহাওয়া","kharap abhaoya")], [c("বড়","boro"), "big", c("বড় বাড়ি","boro bari")], [c("ছোট","chhoto"), "small", c("ছোট ঘর","chhoto ghor")],
     [c("নতুন","notun"), "new", c("নতুন জামা","notun jama")], [c("পুরনো","purono"), "old", c("পুরনো বই","purono boi")], [c("সুন্দর","shundor"), "beautiful", c("সুন্দর ফুল","shundor phul")], [c("লম্বা","lomba"), "tall, long", c("লম্বা ছেলে","lomba chhele")],
     [c("গরম","gorom"), "hot", c("গরম চা","gorom cha")], [c("ঠান্ডা","thanda"), "cold", c("ঠান্ডা জল","thanda jol")], [c("মিষ্টি","mishti"), "sweet", c("মিষ্টি আম","mishti am")], [c("সহজ","shohoj"), "easy", c("সহজ প্রশ্ন","shohoj proshno")],
   ]),
   H("Adjectives before nouns"),
   EXS([("আমি একটা ভালো বই কিনলাম।","ami ekta bhalo boi kinlam.","I bought a good book."), ("ওটা একটা বড় বাড়ি।","ota ekta boro bari.","That is a big house."), ("সে নতুন জামা পরেছে।","she notun jama porechhe.","He / she is wearing a new shirt."), ("আমি গরম চা খাই।","ami gorom cha khai.","I drink hot tea."),
        ("আমাদের একটা ছোট বাগান আছে।","amader ekta chhoto bagan achhe.","We have a small garden."), ("এটা একটা সুন্দর ছবি।","eta ekta shundor chhobi.","This is a beautiful picture."), ("আমি মিষ্টি আম ভালোবাসি।","ami mishti am bhalobashi.","I love sweet mangoes."), ("এটা সহজ প্রশ্ন।","eta shohoj proshno.","This is an easy question.")], "Describing nouns"),
   H("An adjective after the noun, as the answer"),
   P("When the adjective says what something is, it often comes at the end of the sentence without a verb: ঘরটা বড় (the room is big)."),
   EXS([("ঘরটা বড়।","ghorta boro.","The room is big."), ("আমটা খুব মিষ্টি।","amta khub mishti.","The mango is very sweet."), ("জলটা ঠান্ডা।","jolta thanda.","The water is cold."), ("প্রশ্নটা কঠিন।","proshnota kothin.","The question is hard."), ("ছেলেটা লম্বা।","chheleta lomba.","The boy is tall.")], "Saying what it is like"),
   H("Adverbs: how, how much"),
   EXS([("আস্তে বলুন।","aste bolun.","Please speak slowly."), ("সে তাড়াতাড়ি হাঁটে।","she taratari hate.","He / she walks fast."), ("সে খুব ভালো গান গায়।","she khub bhalo gan gay.","He / she sings very well."), ("আমি একটু ক্লান্ত।","ami ektu klanto.","I am a little tired."),
        ("তুমি ঠিক বলেছ।","tumi thik bolechho.","You have said it right."), ("আমরা আনন্দে নাচলাম।","amra anonde nachlam.","We danced with joy.")], "Adverbs"),
   TABLE(["Word", "Meaning", "Example"], [[c("খুব","khub"), "very", c("খুব সুন্দর","khub shundor")], [c("একটু","ektu"), "a little", c("একটু ঠান্ডা","ektu thanda")], [c("অনেক","onek"), "much, many", c("অনেক বড়","onek boro")], [c("আরও","aro"), "more, even more", c("আরও ভালো","aro bhalo")], [c("সবচেয়ে","shobcheye"), "the most", c("সবচেয়ে ভালো","shobcheye bhalo")]]),
  ]),

  dict(id="compare", title="Comparing: more, less, the most", blocks=[
   P("To compare, put the thing you compare with in the genitive (-র / -এর) and add চেয়ে (than). The adjective stays as it is. To say 'the most', use সবচেয়ে or সবার চেয়ে (more than all)."),
   TABLE(["Idea", "Bengali pattern", "Example"], [
     ["more than", "X-র চেয়ে Y adjective", c("রামের চেয়ে শ্যাম লম্বা।","ramer cheye shyam lomba.")], ["as … as", "X-র মতো Y adjective", c("সে আমার মতো লম্বা।","she amar moto lomba.")],
     ["the most", "সবচেয়ে + adjective", c("সে সবচেয়ে লম্বা।","she shobcheye lomba.")], ["better, more", "আরও + adjective", c("এটা আরও ভালো।","eta aro bhalo.")],
   ]),
   EXS([("রামের চেয়ে শ্যাম লম্বা।","ramer cheye shyam lomba.","Shyam is taller than Ram."), ("গরমের চেয়ে শীত ভালো।","gormer cheye shit bhalo.","Winter is better than summer."), ("এটা ওটার চেয়ে সস্তা।","eta otar cheye shosta.","This is cheaper than that."), ("সে আমার মতো লম্বা।","she amar moto lomba.","He / she is as tall as I am."),
        ("সে ক্লাসের সবচেয়ে ভালো ছাত্র।","she klaser shobcheye bhalo chhatro.","He / she is the best student in the class."), ("এটা সবচেয়ে সুন্দর ছবি।","eta shobcheye shundor chhobi.","This is the most beautiful picture."), ("আজ কালকের চেয়ে বেশি গরম।","aj kalker cheye beshi gorom.","Today is hotter than yesterday."), ("কলকাতা আমার সবচেয়ে প্রিয় শহর।","kolkata amar shobcheye priyo shohor.","Kolkata is my favourite city.")], "More than, as … as, the most"),
  ]),

  dict(id="join", title="Joining sentences: and, but, or, so", blocks=[
   P("Short words join one idea to another. Learn the most common ones, and you will be able to build sentences of any length."),
   TABLE(["Word", "Meaning", "Example"], [
     [c("আর / এবং","ar / ebong"), "and", c("আমি চা খাই আর সে কফি খায়।","ami cha khai ar she kophi khay.")], [c("কিন্তু","kintu"), "but", c("আমি যাব, কিন্তু সে যাবে না।","ami jabo, kintu she jabe na.")],
     [c("বা / অথবা","ba / othoba"), "or", c("চা বা কফি","cha ba kophi")], [c("তাই","tai"), "so, therefore", c("আমি ক্লান্ত, তাই ঘুমাব।","ami klanto, tai ghumabo.")],
     [c("কারণ","karon"), "because", c("আমি যাব না, কারণ বৃষ্টি হচ্ছে।","ami jabo na, karon brishti hochchhe.")], [c("তবে","tobe"), "however, but", c("এটা সুন্দর, তবে দামি।","eta shundor, tobe dami.")],
     [c("যদি … তাহলে","jodi … tahole"), "if … then", c("যদি পড়ো তাহলে পাশ করবে।","jodi poro tahole pash korbe.")], [c("যখন … তখন","jokhon … tokhon"), "when … then", c("যখন এলাম তখন সে ঘুমাচ্ছিল।","jokhon elam tokhon she ghumachchhilo.")],
     [c("যে","je"), "that", c("সে বলল যে সে আসবে।","she bollo je she ashbe.")], [c("না হলে","na hole"), "otherwise", c("তাড়াতাড়ি চলো, না হলে দেরি হবে।","taratari cholo, na hole deri hobe.")],
   ]),
   H("And, but, or"),
   EXS([("আমি চা খাই আর সে কফি খায়।","ami cha khai ar she kophi khay.","I drink tea and he / she drinks coffee."), ("আমি বাজারে গেলাম এবং মাছ কিনলাম।","ami bajare gelam ebong mach kinlam.","I went to the market and bought fish."), ("আমি যাব, কিন্তু সে যাবে না।","ami jabo, kintu she jabe na.","I will go, but he / she will not."),
        ("এটা সুন্দর, তবে দামি।","eta shundor, tobe dami.","This is beautiful, but expensive."), ("তুমি চা খাবে বা কফি?","tumi cha khabe ba kophi?","Will you have tea or coffee?"), ("রাম আর শ্যাম দুজন বন্ধু।","ram ar shyam dujon bondhu.","Ram and Shyam are two friends.")], "Joining equals"),
   H("Reasons: কারণ and তাই"),
   P("Both words say that one thing is the reason for another. তাই comes after the reason and introduces the result. কারণ comes after the result and introduces the reason."),
   EXS([("আমি ক্লান্ত, তাই ঘুমাব।","ami klanto, tai ghumabo.","I am tired, so I will sleep."), ("আমি যাব না, কারণ বৃষ্টি হচ্ছে।","ami jabo na, karon brishti hochchhe.","I will not go, because it is raining."), ("তার জ্বর হয়েছে, তাই সে আসেনি।","tar jor hoyechhe, tai she asheni.","He / she has a fever, so he / she did not come."),
        ("সে আসেনি, কারণ তার জ্বর হয়েছে।","she asheni, karon tar jor hoyechhe.","He / she did not come, because he / she has a fever."), ("আমার খিদে পেয়েছে, তাই আমি খাচ্ছি।","amar khide peyechhe, tai ami khachchhi.","I am hungry, so I am eating."), ("বৃষ্টি হচ্ছে, তাই ছাতা নাও।","brishti hochchhe, tai chhata nao.","It is raining, so take an umbrella.")], "Because and so"),
   H("When, if, that"),
   EXS([("যখন বৃষ্টি পড়ে তখন আমি বাড়িতে থাকি।","jokhon brishti pore tokhon ami barite thaki.","When it rains I stay at home."), ("যদি তুমি আসো তাহলে আমি খুশি হব।","jodi tumi asho tahole ami khushi hobo.","If you come, then I will be happy."), ("সে বলল যে সে কাল আসবে।","she bollo je she kal ashbe.","He / she said that he / she will come tomorrow."),
        ("আমি জানি যে তুমি ভালো আছ।","ami jani je tumi bhalo achho.","I know that you are well."), ("তাড়াতাড়ি চলো, না হলে দেরি হবে।","taratari cholo, na hole deri hobe.","Hurry up, otherwise we will be late.")], "Longer sentences"),
  ]),

  dict(id="quantity", title="How much, how many: quantity words", blocks=[
   P("Quantity words stand before a noun and usually need no plural ending: অনেক বন্ধু (many friends), কিছু জল (some water)."),
   TABLE(["Word", "Meaning", "Example"], [
     [c("অনেক","onek"), "many, much", c("অনেক বই","onek boi")], [c("কিছু","kichhu"), "some", c("কিছু লোক","kichhu lok")], [c("সব","shob"), "all", c("সব ছাত্র","shob chhatro")], [c("কয়েকটা","koyekta"), "a few", c("কয়েকটা বই","koyekta boi")],
     [c("একটু","ektu"), "a little", c("একটু জল","ektu jol")], [c("কম","kom"), "few, little", c("কম লোক","kom lok")], [c("বেশি","beshi"), "more", c("বেশি টাকা","beshi taka")], [c("প্রত্যেক","protyek"), "each, every", c("প্রত্যেক দিন","protyek din")], [c("কোনো","kono"), "any, no (with না)", c("কোনো সমস্যা নেই","kono shomoshsha nei")],
   ]),
   EXS([("আমার অনেক বন্ধু আছে।","amar onek bondhu achhe.","I have many friends."), ("কিছু লোক এসেছে।","kichhu lok eshechhe.","Some people have come."), ("সব ছাত্র ক্লাসে আছে।","shob chhatro klase achhe.","All the students are in class."), ("আমাকে কয়েকটা বই দাও।","amake koyekta boi dao.","Give me a few books."),
        ("একটু জল দিন।","ektu jol din.","Please give a little water."), ("প্রত্যেক দিন আমি হাঁটি।","protyek din ami hati.","Every day I walk."), ("আজ কম লোক এসেছে।","aj kom lok eshechhe.","Few people have come today."), ("আমার কোনো সমস্যা নেই।","amar kono shomoshsha nei.","I have no problem.")], "Quantity words in sentences"),
  ]),

  dict(id="build", title="Building a long sentence step by step", blocks=[
   P("You can build a long, natural sentence by adding one piece at a time. Start with the core and add time, place, description and reason, always keeping the verb last."),
   LIST(["Core: আমি যাই। (I go.)", "Add a place: আমি বাজারে যাই। (I go to the market.)", "Add a time: আমি রোজ বাজারে যাই। (I go to the market every day.)", "Add the object: আমি রোজ বাজারে মাছ কিনতে যাই। (I go to the market every day to buy fish.)",
         "Add a description: আমি রোজ সকালে বাজারে তাজা মাছ কিনতে যাই। (I go to the market every morning to buy fresh fish.)", "Add the reason: আমি রোজ সকালে বাজারে তাজা মাছ কিনতে যাই, কারণ বাড়িতে মাছ ছাড়া ভাত হয় না। (… because rice without fish is not a meal at home.)"], ordered=True, title="Growing a sentence"),
   EXS([("আমি যাই।","ami jai.","I go."), ("আমি বাজারে যাই।","ami bajare jai.","I go to the market."), ("আমি রোজ বাজারে যাই।","ami roj bajare jai.","I go to the market every day."), ("আমি রোজ বাজারে মাছ কিনতে যাই।","ami roj bajare mach kinte jai.","I go to the market every day to buy fish."),
        ("আমি রোজ সকালে বাজারে তাজা মাছ কিনতে যাই।","ami roj shokale bajare taja mach kinte jai.","I go to the market every morning to buy fresh fish.")], "Four steps"),
  ]),
 ],
 exercises=[
  PICK("Where does the verb go in a Bengali sentence?", ["at the beginning", "in the middle", "at the end"], 2, "Bengali order is subject – object – verb.", inst="Choose the correct position."),
  SPOT(O(("আমি ভাত খাই।","ami bhat khai."),("আমি খাই ভাত।","ami khai bhat."),("খাই আমি ভাত।","khai ami bhat.")), 0, "The verb goes last.", inst="Only one sentence has the right word order. Choose it."),
  SPOT(O(("সে রোজ বই পড়ে।","she roj boi pore."),("সে পড়ে রোজ বই।","she pore roj boi."),("রোজ পড়ে সে বই।","roj pore she boi.")), 0, "Subject, time, object, verb.", inst="Only one sentence has the right word order. Choose it."),
  SPOT(O(("মা রান্নাঘরে রান্না করছেন।","ma rannaghore ranna korchhen."),("মা করছেন রান্না রান্নাঘরে।","ma korchhen ranna rannaghore."),("রান্নাঘরে করছেন মা রান্না।","rannaghore korchhen ma ranna.")), 0, "The verb করছেন comes last.", inst="Only one sentence has the right word order. Choose it."),
  PICK("Where does an adjective go?", ["before the noun", "after the noun", "after the verb"], 0, "ভালো বই: the adjective comes before the noun.", inst="Choose the correct position."),
  MEAN("I bought a good book.", O(("আমি একটা ভালো বই কিনলাম।","ami ekta bhalo boi kinlam."),("আমি বই ভালো একটা কিনলাম।","ami boi bhalo ekta kinlam."),("আমি কিনলাম একটা ভালো বই।","ami kinlam ekta bhalo boi.")), 0, "Adjective before the noun, verb last.", inst="Choose the Bengali sentence that means the same as the English sentence."),
  MEAN("Shyam is taller than Ram.", O(("রামের চেয়ে শ্যাম লম্বা।","ramer cheye shyam lomba."),("রাম চেয়ে শ্যাম লম্বা।","ram cheye shyam lomba."),("শ্যামের চেয়ে রাম লম্বা।","shyamer cheye ram lomba.")), 0, "X-র চেয়ে Y: Y is more than X.", inst="Choose the Bengali sentence that means the same as the English sentence."),
  MEAN("He / she is the best student in the class.", O(("সে ক্লাসের সবচেয়ে ভালো ছাত্র।","she klaser shobcheye bhalo chhatro."),("সে ক্লাসে ভালো ছাত্র সবচেয়ে।","she klase bhalo chhatro shobcheye."),("সে সবচেয়ে ক্লাসের ভালো ছাত্র।","she shobcheye klaser bhalo chhatro.")), 0, "সবচেয়ে goes before the adjective.", inst="Choose the Bengali sentence that means the same as the English sentence."),
  FILL("আমি ক্লান্ত, ___ ঘুমাব।","ami klanto, ___ ghumabo.", O(("তাই","tai"),("কিন্তু","kintu"),("কারণ","karon")), 0, "'… so I will sleep': তাই.", inst="Choose the word that joins the two parts."),
  FILL("আমি যাব, ___ সে যাবে না।","ami jabo, ___ she jabe na.", O(("কিন্তু","kintu"),("তাই","tai"),("কারণ","karon")), 0, "'… but he will not go': কিন্তু.", inst="Choose the word that joins the two parts."),
  FILL("আমি যাব না, ___ বৃষ্টি হচ্ছে।","ami jabo na, ___ brishti hochchhe.", O(("কারণ","karon"),("তাই","tai"),("কিন্তু","kintu")), 0, "'… because it is raining': কারণ.", inst="Choose the word that joins the two parts."),
  FILL("তুমি চা খাবে ___ কফি?","tumi cha khabe ___ kophi?", O(("বা","ba"),("আর","ar"),("তাই","tai")), 0, "'tea or coffee': বা.", inst="Choose the word that joins the two parts."),
  FILL("আমি চা খাই ___ সে কফি খায়।","ami cha khai ___ she kophi khay.", O(("আর","ar"),("কিন্তু","kintu"),("কারণ","karon")), 0, "'tea and … coffee': আর.", inst="Choose the word that joins the two parts."),
  FILL("___ বৃষ্টি পড়ে ___ আমি বাড়িতে থাকি।","___ brishti pore ___ ami barite thaki.", O(("যখন … তখন","jokhon … tokhon"),("যদি … কিন্তু","jodi … kintu"),("কারণ … তাই","karon … tai")), 0, "'When it rains, then I stay home': যখন … তখন.", inst="Choose the pair of words that fits both blanks."),
  PICK("Which word means 'very'?", O(("খুব","khub"),("একটু","ektu"),("কম","kom")), 0, "খুব = very.", inst="Choose the Bengali word."),
  PICK("Which word means 'a little'?", O(("একটু","ektu"),("খুব","khub"),("অনেক","onek")), 0, "একটু = a little.", inst="Choose the Bengali word."),
  PICK("Which word means 'the most'?", O(("সবচেয়ে","shobcheye"),("আরও","aro"),("খুব","khub")), 0, "সবচেয়ে = the most.", inst="Choose the Bengali word."),
  PICK("After a quantity word like অনেক, the noun usually:", ["takes -গুলো", "stays plain: অনেক বই", "takes -রা"], 1, "Quantity words need no plural ending.", inst="Choose the true statement."),
  PICK("Which means 'everyone has come' in the order doer – verb?", O(("সবাই এসেছে।","shobai eshechhe."),("এসেছে সবাই।","eshechhe shobai."),("সবাই এসেছে না।","shobai eshechhe na.")), 0, "Verb last: সবাই এসেছে.", inst="Choose the correct Bengali sentence."),
  SPOT(O(("সে বলল যে সে আসবে।","she bollo je she ashbe."),("সে যে বলল আসবে সে।","she je bollo ashbe she."),("যে সে বলল সে আসবে।","je she bollo she ashbe.")), 0, "'said that': বলল যে.", inst="Only one sentence is built correctly. Choose it."),
  SPOT(O(("এটা সুন্দর, তবে দামি।","eta shundor, tobe dami."),("এটা সুন্দর তবে দামি না, তবে।","eta shundor tobe dami na, tobe."),("তবে এটা দামি সুন্দর।","tobe eta dami shundor.")), 0, "Two descriptions joined by তবে.", inst="Only one sentence is built correctly. Choose it."),
 ]))]
