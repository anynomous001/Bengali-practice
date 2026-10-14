from lib import *

S = SENT
# (singular bare, a/one, the, plural, the plural) for non-human nouns; (bare, one, the, plural) for people
THINGS = [("বই","boi","book"),("খাতা","khata","notebook"),("গাছ","gachh","tree"),("পাখি","pakhi","bird"),("কুকুর","kukur","dog"),("আম","am","mango"),("ঘর","ghor","room"),("ফুল","phul","flower"),
          ("জামা","jama","shirt"),("ছবি","chhobi","picture"),("চেয়ার","cheyar","chair"),("কলম","kolom","pen"),("বাড়ি","bari","house"),("নদী","nodi","river"),("রাস্তা","rasta","road"),("টেবিল","tebil","table")]
PEOPLE = [("ছেলে","chhele","boy","ছেলেটি","chheleti","ছেলেরা","chhelera"),("মেয়ে","meye","girl","মেয়েটি","meyeti","মেয়েরা","meyera"),("বন্ধু","bondhu","friend","বন্ধুটি","bondhuti","বন্ধুরা","bondhura"),
          ("শিক্ষক","shikkhok","teacher","শিক্ষকটি","shikkhokti","শিক্ষকরা","shikkhokra"),("ডাক্তার","daktar","doctor","ডাক্তারটি","daktarti","ডাক্তাররা","daktarra"),("ছাত্র","chhatro","student","ছাত্রটি","chhatroti","ছাত্ররা","chhatrora"),
          ("মানুষ","manush","person","মানুষটি","manushti","মানুষেরা","manushera"),("শিশু","shishu","child","শিশুটি","shishuti","শিশুরা","shishura")]

TOPICS = [finish(dict(id="bachan", title=("বচন", "Bochon", "Number: one, many and counting"),
 blurb="Singular and plural: how to say 'a', 'the' and 'some', how to make plurals for people and for things, and how to count with the right counting word.",
 sections=[
  dict(id="board", title="The board summary: four rules", blocks=[
   P("Bengali has two numbers. একবচন (ekbochon) is singular and বহুবচন (bohubochon) is plural. Four rules are enough for a first lesson."),
   TABLE(["Rule", "Singular", "Plural"], [
     ["People: add -রা / -ra", c("ছেলে","chhele"), c("ছেলেরা","chhelera")],
     ["", c("মেয়ে","meye"), c("মেয়েরা","meyera")],
     ["", c("বন্ধু","bondhu"), c("বন্ধুরা","bondhura")],
     ["Things and animals: add -গুলো / -gulo", c("বই","boi"), c("বইগুলো","boigulo")],
     ["", c("গাছ","gachh"), c("গাছগুলো","gachhgulo")],
     ["Pronouns change completely", c("আমি","ami"), c("আমরা","amra")],
     ["", c("তুমি","tumi"), c("তোমরা","tomra")],
     ["", c("আপনি","apni"), c("আপনারা","apnara")],
     ["", c("সে","se"), c("তারা","tara")],
   ], "Making the plural"),
   RULE("After a number, no plural marker", "When you count, the noun stays singular and a counter follows the number: -টা (-টো, -টে) for things and -জন for people.", [
     ("দুটো বই", "duto boi", "two books"), ("তিনজন ছেলে", "tinjon chhele", "three boys")]),
  ]),

  dict(id="what", title="One or many: singular and plural", blocks=[
   P("বচন (bochon) means 'number': one or many. Singular is একবচন (ek-bochon, 'one-number') and plural is বহুবচন (bohu-bochon, 'many-number'). Bengali treats number more lightly than English. A plain noun can mean one or many, and the plural ending is used only when you need to be clear. The verb never changes for number."),
   TABLE(["", "Singular (একবচন)", "Plural (বহুবচন)"], [
     ["a plain noun", c("বই","boi"), c("বই (many) / বইগুলো","boi / boigulo")], ["with a count", c("একটা বই","ekta boi"), c("তিনটে বই","tinte boi")], ["'the' (definite)", c("বইটা","boita"), c("বইগুলো","boigulo")],
     ["people", c("ছেলেটি","chheleti"), c("ছেলেরা","chhelera")],
   ]),
   H("The same noun, one and many"),
   EXS([("আমার একটা বই আছে।","amar ekta boi achhe.","I have a book. (one)"), ("আমার অনেক বই আছে।","amar onek boi achhe.","I have many books. (a plain noun after 'many')"), ("বইটা টেবিলে আছে।","boita tebile achhe.","The book is on the table. (one, known)"),
        ("বইগুলো টেবিলে আছে।","boigulo tebile achhe.","The books are on the table. (many, known)"), ("ছেলেটি পড়ছে।","chheleti porchhe.","The boy is studying. (one)"), ("ছেলেরা পড়ছে।","chhelera porchhe.","The boys are studying. (many)"),
        ("আমি আম খাই।","ami am khai.","I eat mangoes. (in general)"), ("আমি একটা আম খেলাম।","ami ekta am khelam.","I ate a mango. (one)")], "One and many"),
   NOTE("The verb stays the same: ছেলেটি পড়ছে (one boy is studying) and ছেলেরা পড়ছে (the boys are studying) both use পড়ছে. Only the noun, and the pronoun, show number: আমি → আমরা, সে → তারা."),
  ]),

  dict(id="singular", title="Singular: 'a' and 'the'", blocks=[
   P("Bengali has no separate words for 'a' and 'the'. Instead it uses small endings on the noun, together with one (এক). A plain noun is general: বই (a book, books). To say 'one book' use একটা বই or একটি বই. To say 'the book' add -টা (spoken) or -টি (written, formal) to the noun: বইটা, বইটি."),
   TABLE(["Idea", "How", "Example", "Meaning"], [
     ["general (a / any)", "the plain noun", c("আমি বই পড়ি।","ami boi pori."), "I read books / a book (in general)"],
     ["one, a certain", "একটা / একটি + noun", c("আমি একটা বই পড়ি।","ami ekta boi pori."), "I read a (one) book"],
     ["the (definite)", "noun + -টা / -টি", c("আমি বইটা পড়ি।","ami boita pori."), "I read the book"],
     ["this particular", "এই + noun + -টা", c("এই বইটা ভালো।","ei boita bhalo."), "This book is good"],
   ]),
   TABLE(["Ending", "Use", "Example"], [
     [c("-টা","-ta"), "ordinary, spoken Bengali: the most common", c("বইটা, ছেলেটা","boita, chheleta")], [c("-টি","-ti"), "writing, polite speech, small or dear things and people", c("বইটি, মেয়েটি","boiti, meyeti")],
     [c("-খানা","-khana"), "flat things: books, cloth, letters", c("বইখানা, চিঠিখানা","boikhana, chithikhana")], [c("-টুকু","-tuku"), "a small amount of something you cannot count", c("জলটুকু, দুধটুকু","joltuku, dudhtuku")],
   ], "Which ending?"),
   H("The, in sentences"),
   EXS([("বইটা কোথায়?","boita kothay?","Where is the book?"), ("মেয়েটি গান গাইছে।","meyeti gan gaichhe.","The girl is singing."), ("ঘরটা অনেক বড়।","ghorta onek boro.","The room is very big."), ("কুকুরটা ঘুমাচ্ছে।","kukurta ghumachchhe.","The dog is sleeping."),
        ("চিঠিখানা কে লিখেছে?","chithikhana ke likhechhe?","Who wrote the letter?"), ("জলটুকু খেয়ে নাও।","joltuku kheye nao.","Drink up the little water."), ("এই ছেলেটা আমার ভাই।","ei chheleta amar bhai.","This boy is my brother."), ("ওই বাড়িটা আমাদের।","oi barita amader.","That house is ours.")], "Definite nouns"),
   H("A, one, in sentences"),
   EXS([("আমার একটা ভাই আছে।","amar ekta bhai achhe.","I have a brother."), ("আমি একটা আম কিনলাম।","ami ekta am kinlam.","I bought a mango."), ("সে একটি গান গাইল।","she ekti gan gailo.","He / she sang a song."), ("একজন মানুষ এল।","ekjon manush elo.","A person came."),
        ("আমাকে একটা কলম দাও।","amake ekta kolom dao.","Give me a pen."), ("এক কাপ চা দিন।","ek kap cha din.","Please give me a cup of tea.")], "One or a"),
  ]),

  dict(id="plural", title="Plural: -রা, -গুলো, -দের", blocks=[
   P("Bengali has several plural endings, and the choice depends on whether the noun is a person or a thing. For people use -রা (or -েরা after some words). For things and animals use -গুলো (or the literary -গুলি). In writing you also meet -সমূহ, -বৃন্দ and -গণ for formal groups."),
   TABLE(["Ending", "Used with", "Example", "Meaning"], [
     [c("-রা / -েরা","-ra / -era"), "people (the doer)", c("ছেলেরা, শিক্ষকরা, মানুষেরা","chhelera, shikkhokra, manushera"), "boys, teachers, people"],
     [c("-দের","-der"), "people (object and 'of')", c("ছেলেদের, শিক্ষকদের","chheleder, shikkhokder"), "the boys, of the boys"],
     [c("-গুলো","-gulo"), "things and animals", c("বইগুলো, কুকুরগুলো","boigulo, kukurgulo"), "the books, the dogs"], [c("-গুলি","-guli"), "things (written)", c("বইগুলি, ছবিগুলি","boiguli, chhobiguli"), "the books, the pictures"],
     [c("-সমূহ","-shomuho"), "formal groups of things", c("গ্রন্থসমূহ","grontho-shomuho"), "(the) works, volumes"], [c("-বৃন্দ / -গণ","-brindo / -gon"), "formal groups of people", c("শিক্ষকবৃন্দ, ভক্তগণ","shikkhokbrindo, bhoktogon"), "the teachers, the devotees"],
   ]),
   H("Plural of people"),
   EXS([("ছেলেরা মাঠে খেলছে।","chhelera mathe khelchhe.","The boys are playing in the field."), ("মেয়েরা গান গাইছে।","meyera gan gaichhe.","The girls are singing."), ("শিক্ষকরা ক্লাসে আছেন।","shikkhokra klase achhen.","The teachers are in class."), ("বন্ধুরা এসেছে।","bondhura eshechhe.","The friends have come."),
        ("ডাক্তাররা হাসপাতালে কাজ করেন।","daktarra haspatale kaj koren.","Doctors work in the hospital."), ("আমি ছেলেদের ডাকলাম।","ami chheleder daklam.","I called the boys."), ("ছাত্রদের বই কোথায়?","chhatroder boi kothay?","Where are the students' books?"), ("মানুষেরা বাজারে যায়।","manushera bajare jay.","People go to the market.")], "-রা and -দের"),
   H("Plural of things and animals"),
   EXS([("বইগুলো টেবিলে আছে।","boigulo tebile achhe.","The books are on the table."), ("পাখিগুলো গাছে বসে আছে।","pakhigulo gachhe boshe achhe.","The birds are sitting on the tree."), ("কুকুরগুলো ঘুমাচ্ছে।","kukurgulo ghumachchhe.","The dogs are sleeping."), ("আমগুলো খুব মিষ্টি।","amgulo khub mishti.","The mangoes are very sweet."),
        ("ছবিগুলো সুন্দর।","chhobigulo shundor.","The pictures are beautiful."), ("ফুলগুলো তুলে নাও।","phulgulo tule nao.","Pick the flowers."), ("জামাগুলো ধুতে হবে।","jamagulo dhute hobe.","The shirts have to be washed."), ("এই গাছগুলো আমার।","ei gachhgulo amar.","These trees are mine.")], "-গুলো"),
   H("Singular and plural pairs"),
   TABLE(["Meaning", "Singular (the)", "Plural (the)"], [[b, c(f"{bn}{'টা' if True else ''}", f"{ro}ta"), c(f"{bn}গুলো", f"{ro}gulo")] for bn, ro, b in THINGS], "Things and animals: -টা and -গুলো"),
   TABLE(["Meaning", "Plain", "Singular (the)", "Plural"], [[en, c(bn, ro), c(sbn, sro), c(pbn, pro)] for bn, ro, en, sbn, sro, pbn, pro in PEOPLE], "People: -টি and -রা"),
   MISTAKES([
     (("ছেলেগুলো এসেছে।","chhelegulo eshechhe."), ("ছেলেরা এসেছে।","chhelera eshechhe."), "For people, -রা is the natural plural. -গুলো is for things, or used for people only with a slightly negative tone."),
     (("বইরা পড়ি।","boira pori."), ("বইগুলো পড়ি।","boigulo pori."), "-রা is for people. Things take -গুলো."),
   ], title="People or things?"),
  ]),

  dict(id="counting", title="Counting: numbers with counting words", blocks=[
   P("When you count things, Bengali puts a counting word (a classifier) after the number: দুটো বই 'two-ish book', পাঁচজন ছাত্র 'five-person student'. Use -টা (or -টি) for things and animals, and -জন for people. After a number the noun stays singular: it never takes -গুলো."),
   TABLE(["Number", "For things (-টা)", "For people (-জন)"], [
     [c("১ · এক","1 · ek"), c("একটা","ekta"), c("একজন","ekjon")], [c("২ · দুই","2 · dui"), c("দুটো","duto"), c("দুজন","dujon")], [c("৩ · তিন","3 · tin"), c("তিনটে","tinte"), c("তিনজন","tinjon")],
     [c("৪ · চার","4 · char"), c("চারটে","charte"), c("চারজন","charjon")], [c("৫ · পাঁচ","5 · panch"), c("পাঁচটা","panchta"), c("পাঁচজন","panchjon")], [c("৬ · ছয়","6 · chhoy"), c("ছটা","chhota"), c("ছয়জন","chhoyjon")],
     [c("৭ · সাত","7 · shat"), c("সাতটা","shatta"), c("সাতজন","shatjon")], [c("৮ · আট","8 · aat"), c("আটটা","atta"), c("আটজন","atjon")], [c("৯ · নয়","9 · noy"), c("নটা","nota"), c("নয়জন","noyjon")], [c("১০ · দশ","10 · dosh"), c("দশটা","doshta"), c("দশজন","doshjon")],
   ], "Numbers one to ten"),
   H("Counting things"),
   EXS([("আমার তিনটে বই আছে।","amar tinte boi achhe.","I have three books."), ("দুটো আম দিন।","duto am din.","Please give two mangoes."), ("টেবিলে চারটে চেয়ার আছে।","tebile charte cheyar achhe.","There are four chairs at the table."), ("আমি পাঁচটা ছবি এঁকেছি।","ami panchta chhobi ekechhi.","I have drawn five pictures."),
        ("গাছে দশটা পাখি বসে আছে।","gachhe doshta pakhi boshe achhe.","Ten birds are sitting on the tree."), ("আমি সাতটা কলা কিনলাম।","ami shatta kola kinlam.","I bought seven bananas."), ("ঘরে ছটা জানালা আছে।","ghore chhota janala achhe.","The room has six windows."), ("আমি একটা কলম কিনলাম।","ami ekta kolom kinlam.","I bought one pen.")], "-টা"),
   H("Counting people"),
   EXS([("ক্লাসে পাঁচজন ছাত্র আছে।","klase panchjon chhatro achhe.","There are five students in the class."), ("আমরা চারজন বন্ধু।","amra charjon bondhu.","We are four friends."), ("তিনজন শিক্ষক এসেছেন।","tinjon shikkhok eshechhen.","Three teachers have come."), ("আমার দুজন ভাই আছে।","amar dujon bhai achhe.","I have two brothers."),
        ("দশজন মানুষ এল।","doshjon manush elo.","Ten people came."), ("আপনারা কজন?","apnara kojon?","How many of you are there?"), ("একজন ডাক্তার ডাকো।","ekjon daktar dako.","Call a doctor."), ("ছয়জন ছেলে খেলছে।","chhoyjon chhele khelchhe.","Six boys are playing.")], "-জন"),
   H("Units and measures"),
   P("For quantities of food and drink, use the measure word the way English does: a cup of tea, a kilo of potatoes. There is no counting word, because the measure is the counting word."),
   EXS([("এক কাপ চা দিন।","ek kap cha din.","Please give one cup of tea."), ("দুই গ্লাস জল আনো।","dui glas jol ano.","Bring two glasses of water."), ("আমি এক কিলো আলু কিনলাম।","ami ek kilo alu kinlam.","I bought a kilo of potatoes."), ("আমাকে এক ডজন কলা দিন।","amake ek dojon kola din.","Give me a dozen bananas."),
        ("এক টুকরো রুটি খাও।","ek tukro ruti khao.","Eat a piece of bread."), ("আমি এক প্লেট ভাত খেলাম।","ami ek plet bhat khelam.","I ate a plate of rice."), ("দুই লিটার দুধ লাগবে।","dui litar dudh lagbe.","We will need two litres of milk.")], "Measures"),
   MISTAKES([
     (("তিনটে বইগুলো","tinte boigulo"), ("তিনটে বই","tinte boi"), "After a number the noun stays singular. Do not add -গুলো."),
     (("পাঁচটা ছাত্র","panchta chhatro"), ("পাঁচজন ছাত্র","panchjon chhatro"), "People are counted with -জন, not -টা."),
     (("দুজন বই","dujon boi"), ("দুটো বই","duto boi"), "Things are counted with -টা, not -জন."),
   ], title="Counting rules"),
  ]),

  dict(id="definite", title="A, the and some: the same noun four ways", blocks=[
   P("Put together everything about singular and plural, and you can say four different things about one noun. Compare them side by side."),
   TABLE(["Idea", "Bengali", "Meaning"], [
     ["in general", c("আমি বই কিনি।","ami boi kini."), "I buy books."], ["one", c("আমি একটা বই কিনলাম।","ami ekta boi kinlam."), "I bought a book."], ["the one", c("আমি বইটা কিনলাম।","ami boita kinlam."), "I bought the book."],
     ["a counted number", c("আমি তিনটে বই কিনলাম।","ami tinte boi kinlam."), "I bought three books."], ["the many", c("আমি বইগুলো কিনলাম।","ami boigulo kinlam."), "I bought the books."],
   ]),
   H("Words for quantity"),
   P("Words like অনেক (many, much), কিছু (some), সব (all), কয়েকটা (a few), একটু (a little) stand in front of a plain noun with no plural ending."),
   EXS([("আমার অনেক বন্ধু আছে।","amar onek bondhu achhe.","I have many friends."), ("কিছু লোক এসেছে।","kichhu lok eshechhe.","Some people have come."), ("সব ছাত্র উপস্থিত।","shob chhatro uposthit.","All students are present."), ("কয়েকটা বই দাও।","koyekta boi dao.","Give me a few books."),
        ("একটু জল দিন।","ektu jol din.","Please give me a little water."), ("আমার কোনো ভাই নেই।","amar kono bhai nei.","I have no brother."), ("প্রত্যেক ছেলে একটা করে বই পেল।","protyek chhele ekta kore boi pelo.","Each boy got one book."), ("বেশি লোক আসেনি।","beshi lok asheni.","Not many people came.")], "Quantity words"),
  ]),

  dict(id="pronouns", title="Number in pronouns and verbs", blocks=[
   P("Only the pronoun shows number in Bengali, never the verb. Each singular pronoun has a plural partner: আমি → আমরা, তুমি → তোমরা, আপনি → আপনারা, সে → তারা. The verb after the plural pronoun is exactly the same as the one after the singular."),
   TABLE(["Singular", "Plural", "Verb (present of যাওয়া)"], [
     [c("আমি","ami"), c("আমরা","amra"), c("যাই","jai")], [c("তুমি","tumi"), c("তোমরা","tomra"), c("যাও","jao")], [c("আপনি","apni"), c("আপনারা","apnara"), c("যান","jan")], [c("সে","she"), c("তারা","tara"), c("যায়","jay")], [c("তুই","tui"), c("তোরা","tora"), c("যাস","jas")],
   ]),
   EXS([("আমরা বাজারে যাই।","amra bajare jai.","We go to the market."), ("তোমরা কোথায় যাও?","tomra kothay jao?","Where do you (all) go?"), ("আপনারা কখন আসবেন?","apnara kokhon ashben?","When will you (all) come?"), ("তারা স্কুলে পড়ে।","tara skule pore.","They study at school."),
        ("তোরা কী খাচ্ছিস?","tora ki khachchhis?","What are you (all) eating?")], "Pronoun plurals"),
  ]),
 ],
 exercises=[
  PICK("What is the Bengali word for 'singular'?", O(("একবচন","ek-bochon"),("বহুবচন","bohu-bochon"),("বচন","bochon")), 0, "একবচন means 'one-number': singular.", inst="Choose the word."),
  PICK("What is the Bengali word for 'plural'?", O(("বহুবচন","bohu-bochon"),("একবচন","ek-bochon"),("পুরুষ","purush")), 0, "বহুবচন means 'many-number': plural.", inst="Choose the word."),
  PICK("Does the verb change between 'the boy is studying' and 'the boys are studying'?", ["Yes, it changes", "No, it stays the same: পড়ছে", "Yes, it adds -রা"], 1, "The verb never changes for number.", inst="Choose the true statement."),
  FILL("___ কোথায়? (the book)","___ kothay?", O(("বইটা","boita"),("বইগুলো","boigulo"),("বইরা","boira")), 0, "One known book: বইটা.", inst="Choose the form that means 'the book'."),
  FILL("___ টেবিলে আছে। (the books)","___ tebile achhe.", O(("বইগুলো","boigulo"),("বইটা","boita"),("বইরা","boira")), 0, "Many known things: -গুলো.", inst="Choose the form that means 'the books'."),
  FILL("___ মাঠে খেলছে। (the boys)","___ mathe khelchhe.", O(("ছেলেরা","chhelera"),("ছেলেগুলো","chhelegulo"),("ছেলেটি","chheleti")), 0, "People take -রা.", inst="Choose the form that means 'the boys'."),
  FILL("___ গান গাইছে। (the girl)","___ gan gaichhe.", O(("মেয়েটি","meyeti"),("মেয়েরা","meyera"),("মেয়েগুলো","meyegulo")), 0, "One known girl: -টি.", inst="Choose the form that means 'the girl'."),
  FILL("আমার ___ বই আছে। (three)","amar ___ boi achhe.", O(("তিনটে","tinte"),("তিনজন","tinjon"),("তিনগুলো","tingulo")), 0, "Things are counted with -টা: তিনটে.", inst="Choose the counting word that fits."),
  FILL("ক্লাসে ___ ছাত্র আছে। (five)","klase ___ chhatro achhe.", O(("পাঁচজন","panchjon"),("পাঁচটা","panchta"),("পাঁচগুলো","panchgulo")), 0, "People are counted with -জন: পাঁচজন.", inst="Choose the counting word that fits."),
  FILL("আমার ___ ভাই আছে। (two)","amar ___ bhai achhe.", O(("দুজন","dujon"),("দুটো","duto"),("দুগুলো","dugulo")), 0, "Brothers are people: দুজন.", inst="Choose the counting word that fits."),
  FILL("দুটো ___ দিন। (mangoes)","duto ___ din.", O(("আম","am"),("আমগুলো","amgulo"),("আমেরা","amera")), 0, "After a number the noun stays singular: আম.", inst="Choose the noun form that fits."),
  FILL("পাখি ___ গাছে বসে আছে। (the birds)","pakhi ___ gachhe boshe achhe.", O(("গুলো","gulo"),("রা","ra"),("জন","jon")), 0, "Birds take -গুলো.", inst="Choose the ending that fits."),
  PICK("Which is the plural of ছেলে (boy)?", O(("ছেলেরা","chhelera"),("ছেলেগুলো","chhelegulo"),("ছেলেটা","chheleta")), 0, "People take -রা.", inst="Choose the plural form."),
  PICK("Which is the plural of বই (book)?", O(("বইগুলো","boigulo"),("বইরা","boira"),("বইজন","boijon")), 0, "Things take -গুলো.", inst="Choose the plural form."),
  PICK("Which is the plural of শিক্ষক (teacher)?", O(("শিক্ষকরা","shikkhokra"),("শিক্ষকগুলো","shikkhokgulo"),("শিক্ষকটা","shikkhokta")), 0, "People take -রা.", inst="Choose the plural form."),
  PICK("Which counting word is used for people?", O(("-জন","-jon"),("-টা","-ta"),("-খানা","-khana")), 0, "-জন counts people.", inst="Choose the counting word."),
  PICK("Which means 'two books'?", O(("দুটো বই","duto boi"),("দুজন বই","dujon boi"),("দুটো বইগুলো","duto boigulo")), 0, "-টা for things, and the noun stays singular.", inst="Choose the Bengali phrase."),
  PICK("Which means 'three students'?", O(("তিনজন ছাত্র","tinjon chhatro"),("তিনটে ছাত্র","tinte chhatro"),("তিন ছাত্রগুলো","tin chhatrogulo")), 0, "-জন for people, noun singular.", inst="Choose the Bengali phrase."),
  PICK("What does বইটা mean?", ["a book", "the book", "books"], 1, "-টা after a noun means 'the'.", inst="Choose the meaning."),
  PICK("What does একটা বই mean?", ["a (one) book", "the book", "the books"], 0, "একটা is 'one, a'.", inst="Choose the meaning."),
  PICK("What is the plural of আমি?", O(("আমরা","amra"),("আমি-রা","ami-ra"),("আমাদের","amader")), 0, "আমি → আমরা.", inst="Choose the plural pronoun."),
  PICK("What is the plural of আপনি?", O(("আপনারা","apnara"),("আপনিরা","apnira"),("তোমরা","tomra")), 0, "আপনি → আপনারা.", inst="Choose the plural pronoun."),
  MEAN("I bought three books.", O(("আমি তিনটে বই কিনলাম।","ami tinte boi kinlam."),("আমি তিনটে বইগুলো কিনলাম।","ami tinte boigulo kinlam."),("আমি তিনজন বই কিনলাম।","ami tinjon boi kinlam.")), 0, "Counting things: -টা, singular noun.", inst="Choose the Bengali sentence that means the same as the English sentence."),
  MEAN("There are five students in the class.", O(("ক্লাসে পাঁচজন ছাত্র আছে।","klase panchjon chhatro achhe."),("ক্লাসে পাঁচটা ছাত্র আছে।","klase panchta chhatro achhe."),("ক্লাসে পাঁচ ছাত্ররা আছে।","klase panch chhatrora achhe.")), 0, "People are counted with -জন.", inst="Choose the Bengali sentence that means the same as the English sentence."),
  SPOT(O(("আমার দুটো বই আছে।","amar duto boi achhe."),("আমার দুটো বইগুলো আছে।","amar duto boigulo achhe."),("আমার দুজন বই আছে।","amar dujon boi achhe.")), 0, "A counted noun stays singular, and things take -টা.", inst="Only one sentence is correct. Choose it."),
  SPOT(O(("ছেলেরা খেলছে।","chhelera khelchhe."),("ছেলেরা খেলছেন।","chhelera khelchhen."),("ছেলেরা খেলছি।","chhelera khelchhi.")), 0, "ছেলেরা is ordinary third person: খেলছে.", inst="Only one sentence has the right verb. Choose it."),
 ]))]
