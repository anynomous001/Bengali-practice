from lib import *

S = SENT
TOPICS = [finish(dict(id="bibhakti", title=("বিভক্তি", "Bibhakti", "Bibhakti: case endings and little words"),
 blurb="The seven bibhaktis: the endings and small words that go after a noun to show its karak. How each one is formed, when to use it, and what the little words after nouns mean.",
 sections=[
  dict(id="what", title="What is bibhakti?", blocks=[
   P("বিভক্তি (bibhakti) is the ending or small word that is added to a noun or pronoun to show what job it does in the sentence. The job is called the কারক (karak), and the ending that shows it is the বিভক্তি. Karak is the role; bibhakti is how the role is written."),
   P("Traditional grammar counts seven bibhaktis, named by number: প্রথমা (first), দ্বিতীয়া (second), তৃতীয়া (third), চতুর্থী (fourth), পঞ্চমী (fifth), ষষ্ঠী (sixth), সপ্তমী (seventh). Here they are with the markers each one uses."),
   TABLE(["Bibhakti", "English name", "Usual markers", "Shows", "Example"], [
     [c("প্রথমা","prothoma"), "nominative", "no ending (sometimes -রা, -ই)", "the doer (কর্তা)", c("রাম যায়।","ram jay.")],
     [c("দ্বিতীয়া","ditiya"), "objective (accusative)", "-কে (for people); none for things", "the object (কর্ম)", c("আমি রামকে দেখলাম।","ami ramke dekhlam.")],
     [c("তৃতীয়া","tritiya"), "instrumental", "দিয়ে, দ্বারা, -এ", "the tool (করণ)", c("কলম দিয়ে লিখি।","kolom diye likhi.")],
     [c("চতুর্থী","chaturthi"), "dative", "-কে, জন্য", "the receiver (সম্প্রদান)", c("গরিবকে দিলাম।","goribke dilam.")],
     [c("পঞ্চমী","ponchomi"), "ablative", "থেকে, হতে, চেয়ে", "the source (অপাদান)", c("বাড়ি থেকে আসি।","bari theke ashi.")],
     [c("ষষ্ঠী","shoshthi"), "genitive", "-র, -এর", "belonging (সম্বন্ধ)", c("রামের বই।","ramer boi.")],
     [c("সপ্তমী","soptomi"), "locative", "-এ, -তে, -য়", "place and time (অধিকরণ)", c("বাজারে যাই।","bajare jai.")],
   ]),
   NOTE("The names and the exact grouping differ a little between textbooks. Some books combine the second and fourth, because both use -কে. Follow your teacher's table when it differs from this one."),
   H("Karak and bibhakti side by side"),
   TABLE(["Karak (the job)", "Bibhakti (the ending)", "Question"], [
     [c("কর্তা","kortha"), c("প্রথমা","prothoma"), "কে?"], [c("কর্ম","korma"), c("দ্বিতীয়া","ditiya"), "কাকে? কী?"], [c("করণ","koron"), c("তৃতীয়া","tritiya"), "কী দিয়ে?"],
     [c("সম্প্রদান","sampradan"), c("চতুর্থী","chaturthi"), "কাকে? কার জন্য?"], [c("অপাদান","apadan"), c("পঞ্চমী","ponchomi"), "কোথা থেকে?"], [c("সম্বন্ধ","sombondho"), c("ষষ্ঠী","shoshthi"), "কার?"], [c("অধিকরণ","adhikoron"), c("সপ্তমী","soptomi"), "কোথায়? কখন?"],
   ]),
  ]),

  dict(id="forms", title="How the endings attach to a noun", blocks=[
   P("The ending you add depends on how the noun ends. Learn the three groups: nouns that end in a consonant, nouns that end in a vowel sign (-ি, -ী, -ু, -ে), and nouns that end in -া. A few common words are irregular, and they are listed in the table."),
   TABLE(["Noun", "Of (-র / -এর)", "In / at (-এ / -তে / -য়)", "To / for a person (-কে)", "From (থেকে)"], [
     [c("ঘর (room)","ghor"), c("ঘরের","ghorer"), c("ঘরে","ghore"), "-", c("ঘর থেকে","ghor theke")], [c("বাজার (market)","bajar"), c("বাজারের","bajarer"), c("বাজারে","bajare"), "-", c("বাজার থেকে","bajar theke")],
     [c("স্কুল (school)","skul"), c("স্কুলের","skuler"), c("স্কুলে","skule"), "-", c("স্কুল থেকে","skul theke")], [c("জল (water)","jol"), c("জলের","joler"), c("জলে","jole"), "-", c("জল থেকে","jol theke")],
     [c("গাছ (tree)","gachh"), c("গাছের","gachher"), c("গাছে","gachhe"), "-", c("গাছ থেকে","gachh theke")], [c("বাড়ি (house)","bari"), c("বাড়ির","barir"), c("বাড়িতে","barite"), "-", c("বাড়ি থেকে","bari theke")],
     [c("নদী (river)","nodi"), c("নদীর","nodir"), c("নদীতে","nodite"), "-", c("নদী থেকে","nodi theke")], [c("পাখি (bird)","pakhi"), c("পাখির","pakhir"), c("পাখিতে","pakhite"), c("পাখিকে","pakhike"), c("পাখি থেকে","pakhi theke")],
     [c("রাস্তা (road)","rasta"), c("রাস্তার","rastar"), c("রাস্তায়","rastay"), "-", c("রাস্তা থেকে","rasta theke")], [c("কলকাতা (Kolkata)","kolkata"), c("কলকাতার","kolkatar"), c("কলকাতায়","kolkatay"), "-", c("কলকাতা থেকে","kolkata theke")],
     [c("টাকা (money)","taka"), c("টাকার","takar"), c("টাকায়","takay"), "-", c("টাকা থেকে","taka theke")], [c("বই (book)","boi"), c("বইয়ের","boiyer"), c("বইয়ে","boiye"), "-", c("বই থেকে","boi theke")],
     [c("ছেলে (boy)","chhele"), c("ছেলের","chheler"), "-", c("ছেলেকে","chheleke"), c("ছেলের কাছ থেকে","chheler kachh theke")], [c("মেয়ে (girl)","meye"), c("মেয়ের","meyer"), "-", c("মেয়েকে","meyeke"), c("মেয়ের কাছ থেকে","meyer kachh theke")],
     [c("মা (mother)","ma"), c("মায়ের","mayer"), "-", c("মাকে","make"), c("মায়ের কাছ থেকে","mayer kachh theke")], [c("বাবা (father)","baba"), c("বাবার","babar"), "-", c("বাবাকে","babake"), c("বাবার কাছ থেকে","babar kachh theke")],
     [c("বন্ধু (friend)","bondhu"), c("বন্ধুর","bondhur"), "-", c("বন্ধুকে","bondhuke"), c("বন্ধুর কাছ থেকে","bondhur kachh theke")], [c("শিক্ষক (teacher)","shikkhok"), c("শিক্ষকের","shikkhoker"), "-", c("শিক্ষককে","shikkhokke"), c("শিক্ষকের কাছ থেকে","shikkhoker kachh theke")],
   ], "Endings added to common nouns"),
   LIST(["After a consonant, the 'of' ending is -এর: ঘর → ঘরের. After a vowel sign or -া it is -র: বাড়ি → বাড়ির, রাস্তা → রাস্তার.", "The 'in' ending is -এ after a consonant (ঘরে), -তে after a vowel sign (বাড়িতে), and -য় after -া (রাস্তায়).", "Words that end in the vowel ই, like বই and দই, add -য়ের: বই → বইয়ের.", "Persons take -কে for the object. Things usually take no ending.", "থেকে is a separate word and never changes the noun: ঘর থেকে.", "For a person, the source is -র কাছ থেকে: বন্ধুর কাছ থেকে (from a friend)."], title="Rules of thumb"),
   NOTE("Places rarely take -কে (the object ending), and people rarely take the locative -এ / -তে. That is why the table leaves those cells empty."),
  ]),

  dict(id="prothoma", title="প্রথমা: the doer, no ending", blocks=[
   P("The first bibhakti (প্রথমা, nominative) marks the doer (কর্তা). It usually has no ending at all. The doer just stands in front of the verb. You can add -রা to a group of people, -ই for emphasis, or -টা / -টি for 'the'."),
   EXS([("রাম বাজারে যায়।","ram bajare jay.","Ram goes to the market."), ("ছেলেরা মাঠে খেলছে।","chhelera mathe khelchhe.","The boys are playing in the field."), ("শিক্ষকরা পড়ান।","shikkhokra poran.","Teachers teach."),
        ("সে-ই এটা করেছে।","she-i eta korechhe.","It was he who did this."), ("বইটা টেবিলে আছে।","boita tebile achhe.","The book is on the table."), ("মেয়েটি গান গাইছে।","meyeti gan gaichhe.","The girl is singing."),
        ("আমরা সবাই বাংলা শিখছি।","amra shobai bangla shikhchhi.","We are all learning Bengali."), ("পাখিরা আকাশে ওড়ে।","pakhira akashe ore.","Birds fly in the sky.")], "No ending on the doer"),
  ]),

  dict(id="ditiya", title="দ্বিতীয়া: the object, -কে", blocks=[
   P("The second bibhakti (দ্বিতীয়া, objective) marks the object (কর্ম). People and animals take -কে. Things take no ending, unless you single out one definite thing (বইটাকে)."),
   TABLE(["Pronoun / noun", "Object form"], [[c("আমি","ami"), c("আমাকে","amake")], [c("তুমি","tumi"), c("তোমাকে","tomake")], [c("আপনি","apni"), c("আপনাকে","apnake")], [c("সে","she"), c("তাকে","take")], [c("আমরা","amra"), c("আমাদের","amader")], [c("তারা","tara"), c("তাদের","tader")], [c("রাম","ram"), c("রামকে","ramke")], [c("কে (who)","ke"), c("কাকে (whom)","kake")]]),
   EXS([("আমি তোমাকে দেখলাম।","ami tomake dekhlam.","I saw you."), ("মা শিশুকে ডাকলেন।","ma shishuke daklen.","Mother called the baby."), ("তুমি কাকে ডাকছ?","tumi kake dakchho?","Whom are you calling?"), ("শিক্ষক ছাত্রদের বকলেন।","shikkhok chhatroder boklen.","The teacher scolded the students."),
        ("আমি বইটা পড়ি।","ami boita pori.","I read the book."), ("সে কুকুরটাকে খাওয়াল।","she kukurtake khaoalo.","He / she fed the dog."), ("আমরা আপনাকে ভালোবাসি।","amra apnake bhalobashi.","We love you."), ("আমি তাকে চিনি।","ami take chini.","I know him / her."),
        ("মা আমাকে ডাকছেন।","ma amake dakchhen.","Mother is calling me."), ("আমি এই গানটা শুনছি।","ami ei ganta shunchhi.","I am listening to this song.")], "-কে for people"),
   MISTAKES([
     (("আমি তোমা দেখলাম।","ami toma dekhlam."), ("আমি তোমাকে দেখলাম।","ami tomake dekhlam."), "The pronoun needs its object form: তোমাকে."),
   ], title="Use the object form of pronouns"),
  ]),

  dict(id="tritiya", title="তৃতীয়া: the tool, দিয়ে", blocks=[
   P("The third bibhakti (তৃতীয়া, instrumental) marks the tool or means (করণ). It uses দিয়ে after the noun, or the ending -এ / -য়, or the formal word দ্বারা."),
   EXS([("আমি কলম দিয়ে লিখি।","ami kolom diye likhi.","I write with a pen."), ("সে হাত দিয়ে খায়।","she hat diye khay.","He / she eats with the hand."), ("আমরা চোখে দেখি।","amra chokhe dekhi.","We see with our eyes."), ("মা ছুরি দিয়ে ফল কাটলেন।","ma chhuri diye phol katlen.","Mother cut the fruit with a knife."),
        ("সে চাবি দিয়ে দরজা খুলল।","she chabi diye dorja khulolo.","He / she opened the door with a key."), ("আমি ট্রেনে যাব।","ami trene jabo.","I will go by train."), ("তিনি কলম দ্বারা লিখলেন।","tini kolom dwara likhlen.","He / she wrote with a pen. (formal)"),
        ("সে সাবান দিয়ে হাত ধুল।","she saban diye hat dhulo.","He / she washed the hands with soap.")], "With what?"),
  ]),

  dict(id="chaturthi", title="চতুর্থী: the receiver, -কে and জন্য", blocks=[
   P("The fourth bibhakti (চতুর্থী, dative) marks the one to whom something is given or for whom it is done (সম্প্রদান). It uses -কে for the receiver, and জন্য after the possessive for 'for'. In many books it overlaps with the second bibhakti, since both can use -কে."),
   EXS([("আমি বন্ধুকে বই দিলাম।","ami bondhuke boi dilam.","I gave a book to my friend."), ("মা শিশুকে দুধ দিলেন।","ma shishuke dudh dilen.","Mother gave milk to the baby."), ("আমি গরিবকে টাকা দিলাম।","ami goribke taka dilam.","I gave money to the poor man."),
        ("এটা তোমার জন্য।","eta tomar jonyo.","This is for you."), ("বাবা আমার জন্য জামা আনলেন।","baba amar jonyo jama anlen.","Father brought a shirt for me."), ("আমরা সবার জন্য খাবার রান্না করলাম।","amra shobar jonyo khabar ranna korlam.","We cooked food for everyone."),
        ("সে মায়ের জন্য ওষুধ কিনল।","she mayer jonyo oshudh kinlo.","He / she bought medicine for his / her mother."), ("কিসের জন্য এসেছ?","kisher jonyo eshechho?","What have you come for?")], "To and for"),
  ]),

  dict(id="ponchomi", title="পঞ্চমী: the source, থেকে", blocks=[
   P("The fifth bibhakti (পঞ্চমী, ablative) marks the source or the starting point (অপাদান). It uses থেকে after the noun, and also হতে in writing. It marks comparison too, with চেয়ে after the possessive form."),
   EXS([("আমি বাড়ি থেকে আসছি।","ami bari theke aschhi.","I am coming from home."), ("সে স্কুল থেকে ফিরল।","she skul theke phirlo.","He / she returned from school."), ("গাছ থেকে ফল পড়ল।","gachh theke phol porlo.","A fruit fell from the tree."),
        ("ট্রেন হাওড়া থেকে ছাড়ে।","tren haora theke chhare.","The train leaves from Howrah."), ("আমি বন্ধুর কাছ থেকে বই পেলাম।","ami bondhur kachh theke boi pelam.","I got a book from a friend."), ("সে আজ সকাল থেকে কাজ করছে।","she aj shokal theke kaj korchhe.","He / she has been working since this morning."),
        ("কলকাতা থেকে দিল্লি অনেক দূর।","kolkata theke dilli onek dur.","Delhi is very far from Kolkata.")], "From"),
   H("Comparison: চেয়ে"),
   P("To say 'more than', put the thing compared after the possessive form and then চেয়ে (than). The adjective follows."),
   EXS([("রামের চেয়ে শ্যাম লম্বা।","ramer cheye shyam lomba.","Shyam is taller than Ram."), ("আমার চেয়ে সে ভালো গাইতে পারে।","amar cheye she bhalo gaite pare.","He / she can sing better than I."), ("গরমের চেয়ে শীত ভালো।","gormer cheye shit bhalo.","Winter is better than summer."), ("এটা ওটার চেয়ে সস্তা।","eta otar cheye shosta.","This is cheaper than that.")], "More than"),
  ]),

  dict(id="shoshthi", title="ষষ্ঠী: belonging, -র and -এর", blocks=[
   P("The sixth bibhakti (ষষ্ঠী, genitive) shows belonging or relation, like English 'of' or '’s'. It ends in -র after a vowel (বাড়ির) and -এর after a consonant (ঘরের). The possessive pronouns (আমার, তোমার, তার) are genitives too. The owner comes before the thing owned."),
   EXS([("এটা রামের বই।","eta ramer boi.","This is Ram's book."), ("আমার বন্ধুর বাড়ি কলকাতায়।","amar bondhur bari kolkatay.","My friend's house is in Kolkata."), ("গাছের পাতা সবুজ।","gachher pata shobuj.","The tree's leaves are green."), ("মায়ের নাম অনিতা।","mayer nam anita.","Mother's name is Anita."),
        ("ঘরের দরজা খোলা।","ghorer dorja khola.","The door of the room is open."), ("বইয়ের দাম কত?","boiyer dam koto?","What is the price of the book?"), ("আমাদের স্কুলের শিক্ষক ভালো।","amader skuler shikkhok bhalo.","The teachers of our school are good."), ("তার ভাইয়ের নাম রাহুল।","tar bhaiyer nam rahul.","His / her brother's name is Rahul.")], "Whose?"),
   H("A chain of belonging"),
   EXS([("আমার বন্ধুর বাড়ির ছাদ।","amar bondhur barir chhad.","The roof of my friend's house."), ("শিক্ষকের মেয়ের বইয়ের নাম।","shikkhoker meyer boiyer nam.","The name of the teacher's daughter's book.")], "One after another"),
   NOTE("With the ending -র/-এর, the owner changes and the thing owned stays the same. With আমার, the same form works for 'my' with every noun: আমার বই, আমার ঘর, আমার বন্ধুরা."),
  ]),

  dict(id="soptomi", title="সপ্তমী: place and time, -এ / -তে / -য়", blocks=[
   P("The seventh bibhakti (সপ্তমী, locative) marks the place or the time (অধিকরণ): where something happens or when. The ending is -এ after a consonant, -তে after a vowel, and -য় after -া. It also marks a state or condition."),
   EXS([("আমি বাজারে যাই।","ami bajare jai."  ,"I go to the market."), ("সে ঘরে আছে।","she ghore achhe.","He / she is in the room."), ("আমরা বাড়িতে থাকি।","amra barite thaki.","We stay at home."), ("তারা রাস্তায় হাঁটছে।","tara rastay hatchhe.","They are walking on the road."),
        ("সে কলকাতায় থাকে।","she kolkatay thake.","He / she lives in Kolkata."), ("বই টেবিলে আছে।","boi tebile achhe.","The book is on the table."), ("পাখি গাছে বসে আছে।","pakhi gachhe boshe achhe.","The bird is sitting on the tree."), ("আমি সকালে চা খাই।","ami shokale cha khai.","I drink tea in the morning."),
        ("সোমবারে স্কুল খোলে।","shombare skul khole.","School opens on Monday."), ("সে বিপদে পড়েছে।","she bipode poreche.","He / she is in trouble.")], "Where, when, in what state"),
   H("Words that work like 'in' and 'on'"),
   P("For more precise places, a possessive noun plus a position word is used: ঘরের ভিতরে (inside the room), টেবিলের উপর (on the table). See the next section."),
  ]),

  dict(id="postpos", title="Little words after nouns", blocks=[
   P("Where English puts a preposition before the noun ('on the table'), Bengali puts a small word after it ('table on'). These are called অনুসর্গ (onushorgo), postpositions. Some of them take the genitive (-র / -এর) before them. Others follow the plain noun."),
   TABLE(["Word", "Meaning", "Goes after", "Example"], [
     [c("উপর / উপরে","upor / upore"), "on, above", "genitive (-র / -এর)", c("টেবিলের উপর","tebiler upor")], [c("নিচে","niche"), "under, below", "genitive", c("গাছের নিচে","gachher niche")], [c("ভিতরে / মধ্যে","bhitore / moddhe"), "in, inside", "genitive", c("ঘরের ভিতরে","ghorer bhitore")],
     [c("বাইরে","baire"), "outside", "genitive", c("বাড়ির বাইরে","barir baire")], [c("সামনে","samne"), "in front of", "genitive", c("স্কুলের সামনে","skuler samne")], [c("পিছনে","pichhone"), "behind", "genitive", c("বাড়ির পিছনে","barir pichhone")],
     [c("পাশে","pashe"), "beside", "genitive", c("আমার পাশে","amar pashe")], [c("কাছে","kachhe"), "near, with", "genitive", c("বাড়ির কাছে","barir kachhe")], [c("সঙ্গে / সাথে","shonge / shathe"), "with (together)", "genitive", c("বন্ধুর সঙ্গে","bondhur shonge")],
     [c("জন্য","jonyo"), "for", "genitive", c("মায়ের জন্য","mayer jonyo")], [c("মতো","moto"), "like", "genitive", c("তোমার মতো","tomar moto")], [c("চেয়ে","cheye"), "than", "genitive", c("আমার চেয়ে","amar cheye")],
     [c("থেকে","theke"), "from, since", "plain noun", c("বাড়ি থেকে","bari theke")], [c("দিয়ে","diye"), "with, by, through", "plain noun", c("কলম দিয়ে","kolom diye")], [c("পর্যন্ত","porjonto"), "until, as far as", "plain noun", c("সকাল পর্যন্ত","shokal porjonto")],
     [c("ছাড়া","chhara"), "without, except", "plain noun", c("জল ছাড়া","jol chhara")], [c("দিকে","dike"), "towards", "genitive", c("স্টেশনের দিকে","steshoner dike")],
   ], "Common postpositions"),
   EXS([("বইটা টেবিলের উপর আছে।","boita tebiler upor achhe.","The book is on the table."), ("বিড়াল গাছের নিচে বসে আছে।","biral gachher niche boshe achhe.","The cat is sitting under the tree."), ("সে ঘরের ভিতরে আছে।","she ghorer bhitore achhe.","He / she is inside the room."),
        ("আমি বন্ধুর সঙ্গে সিনেমা দেখলাম।","ami bondhur shonge sinema dekhlam.","I saw a film with a friend."), ("স্কুলের সামনে একটা দোকান আছে।","skuler samne ekta dokan achhe.","There is a shop in front of the school."), ("আমি সকাল পর্যন্ত পড়লাম।","ami shokal porjonto porlam.","I studied until morning."),
        ("জল ছাড়া মানুষ বাঁচে না।","jol chhara manush banche na.","People cannot live without water."), ("সে ছাতা ছাড়া বেরোল।","she chhata chhara berolo.","He / she went out without an umbrella."), ("তুমি স্টেশনের দিকে যাও।","tumi steshoner dike jao.","Go towards the station."),
        ("তার মতো গান কেউ গাইতে পারে না।","tar moto gan keu gaite pare na.","Nobody can sing like him / her.")], "In sentences"),
   MISTAKES([
     (("টেবিল উপর","tebil upor"), ("টেবিলের উপর","tebiler upor"), "Words like উপর, নিচে and সঙ্গে need the genitive -র / -এর before them."),
     (("বাড়ির থেকে","barir theke"), ("বাড়ি থেকে","bari theke"), "থেকে follows the plain noun, with no -র."),
   ], title="Genitive or plain?"),
  ]),

  dict(id="plural", title="Bibhakti with plurals", blocks=[
   P("The plural endings and the case endings can be combined. The plural -রা marks the doer. The ending -দের covers both the object and 'of' for people: ছেলেদের means 'the boys' (object) and 'of the boys' (genitive). For things, add -গুলো first and then the case ending: বইগুলোর (of the books), বইগুলোতে (in the books)."),
   TABLE(["Case", "Singular", "Plural"], [
     ["Doer (প্রথমা)", c("ছেলে","chhele"), c("ছেলেরা","chhelera")], ["Object (দ্বিতীয়া)", c("ছেলেকে","chheleke"), c("ছেলেদের","chheleder")], ["Of (ষষ্ঠী)", c("ছেলের","chheler"), c("ছেলেদের","chheleder")],
     ["Doer (things)", c("বই","boi"), c("বইগুলো","boigulo")], ["Of (things)", c("বইয়ের","boiyer"), c("বইগুলোর","boigulor")], ["In (things)", c("বইয়ে","boiye"), c("বইগুলোতে","boigulote")],
   ]),
   EXS([("ছেলেরা মাঠে খেলছে।","chhelera mathe khelchhe.","The boys are playing in the field."), ("শিক্ষক ছেলেদের পড়ান।","shikkhok chheleder poran.","The teacher teaches the boys."), ("ছেলেদের বই টেবিলে আছে।","chheleder boi tebile achhe.","The boys' books are on the table."),
        ("বইগুলোর দাম বেশি।","boigulor dam beshi.","The price of the books is high."), ("আমরা মেয়েদের গান শুনলাম।","amra meyeder gan shunlam.","We listened to the girls' song.")], "Plurals and endings"),
  ]),
 ],
 exercises=[
  PICK("Which bibhakti shows the doer?", O(("প্রথমা","prothoma"),("দ্বিতীয়া","ditiya"),("সপ্তমী","soptomi")), 0, "প্রথমা (nominative) marks the doer.", inst="Choose the bibhakti."),
  PICK("Which bibhakti shows place and time?", O(("সপ্তমী","soptomi"),("ষষ্ঠী","shoshthi"),("তৃতীয়া","tritiya")), 0, "সপ্তমী (locative): -এ / -তে / -য়.", inst="Choose the bibhakti."),
  PICK("Which bibhakti shows belonging ('of')?", O(("ষষ্ঠী","shoshthi"),("পঞ্চমী","ponchomi"),("চতুর্থী","chaturthi")), 0, "ষষ্ঠী (genitive): -র / -এর.", inst="Choose the bibhakti."),
  PICK("Which bibhakti shows the source ('from')?", O(("পঞ্চমী","ponchomi"),("ষষ্ঠী","shoshthi"),("সপ্তমী","soptomi")), 0, "পঞ্চমী (ablative): থেকে.", inst="Choose the bibhakti."),
  PICK("Which bibhakti shows the tool ('with')?", O(("তৃতীয়া","tritiya"),("দ্বিতীয়া","ditiya"),("চতুর্থী","chaturthi")), 0, "তৃতীয়া (instrumental): দিয়ে.", inst="Choose the bibhakti."),
  PICK("Which bibhakti shows the object?", O(("দ্বিতীয়া","ditiya"),("প্রথমা","prothoma"),("ষষ্ঠী","shoshthi")), 0, "দ্বিতীয়া (objective): -কে.", inst="Choose the bibhakti."),
  PICK("Which bibhakti is used in 'আমি বাজারে যাই' for বাজারে?", O(("সপ্তমী","soptomi"),("প্রথমা","prothoma"),("ষষ্ঠী","shoshthi")), 0, "বাজারে is the place: সপ্তমী.", inst="Name the bibhakti of the word."),
  PICK("Which bibhakti is 'রামের' in 'রামের বই'?", O(("ষষ্ঠী","shoshthi"),("সপ্তমী","soptomi"),("পঞ্চমী","ponchomi")), 0, "-এর marks belonging: ষষ্ঠী.", inst="Name the bibhakti of the word."),
  PICK("Which bibhakti is 'বাড়ি থেকে'?", O(("পঞ্চমী","ponchomi"),("সপ্তমী","soptomi"),("তৃতীয়া","tritiya")), 0, "থেকে marks the source: পঞ্চমী.", inst="Name the bibhakti of the words."),
  PICK("Which bibhakti is 'কলম দিয়ে'?", O(("তৃতীয়া","tritiya"),("পঞ্চমী","ponchomi"),("সপ্তমী","soptomi")), 0, "দিয়ে marks the tool: তৃতীয়া.", inst="Name the bibhakti of the words."),
  FILL("এটা ___ বই।","eta ___ boi.", O(("রামের","ramer"),("রামকে","ramke"),("রামে","rame")), 0, "'Ram's book' needs the genitive: রামের.", inst="Choose the form that shows belonging."),
  FILL("আমি ___ দেখলাম।","ami ___ dekhlam.", O(("রামকে","ramke"),("রামের","ramer"),("রামে","rame")), 0, "A person as the object takes -কে.", inst="Choose the form that shows the object."),
  FILL("আমরা ___ থাকি।","amra ___ thaki.", O(("বাড়িতে","barite"),("বাড়িকে","barike"),("বাড়িতে থেকে","barite theke")), 0, "'At home' needs the locative: বাড়িতে.", inst="Choose the form that shows the place."),
  FILL("সে ___ থাকে।","she ___ thake.", O(("কলকাতায়","kolkatay"),("কলকাতাতে","kolkatate"),("কলকাতাকে","kolkatake")), 0, "After -া the locative is -য়: কলকাতায়.", inst="Choose the form that shows the place."),
  FILL("এটা মায়ের ___।","eta mayer ___.", O(("জন্য","jonyo"),("থেকে","theke"),("দিয়ে","diye")), 0, "'For mother': মায়ের জন্য.", inst="Choose the word that fits after the genitive."),
  FILL("আমি বাড়ি ___ আসছি।","ami bari ___ aschhi.", O(("থেকে","theke"),("জন্য","jonyo"),("সঙ্গে","shonge")), 0, "'From home': বাড়ি থেকে.", inst="Choose the word that fits."),
  FILL("আমি কলম ___ লিখি।","ami kolom ___ likhi.", O(("দিয়ে","diye"),("থেকে","theke"),("জন্য","jonyo")), 0, "'With a pen': কলম দিয়ে.", inst="Choose the word that fits."),
  FILL("বইটা টেবিলের ___ আছে।","boita tebiler ___ achhe.", O(("উপর","upor"),("থেকে","theke"),("দিয়ে","diye")), 0, "'On the table': টেবিলের উপর.", inst="Choose the position word that fits."),
  FILL("সে বন্ধুর ___ গেল।","she bondhur ___ gelo.", O(("সঙ্গে","shonge"),("থেকে","theke"),("দিয়ে","diye")), 0, "'With a friend': বন্ধুর সঙ্গে.", inst="Choose the word that fits."),
  FILL("___ চেয়ে শ্যাম লম্বা।","___ cheye shyam lomba.", O(("রামের","ramer"),("রাম","ram"),("রামকে","ramke")), 0, "'Than Ram': রামের চেয়ে.", inst="Choose the form that goes before চেয়ে."),
  PICK("What is the 'of' form of বাড়ি (house)?", O(("বাড়ির","barir"),("বাড়িতে","barite"),("বাড়িকে","barike")), 0, "After a vowel sign, 'of' is -র: বাড়ির. (বাড়িতে is 'in', বাড়িকে is the object.)", inst="Choose the correct form."),
  PICK("What is the 'of' form of ঘর (room)?", O(("ঘরের","ghorer"),("ঘরে","ghore"),("ঘরকে","ghorke")), 0, "After a consonant, 'of' is -এর: ঘরের.", inst="Choose the correct form."),
  PICK("What is the 'in' form of রাস্তা (road)?", O(("রাস্তায়","rastay"),("রাস্তার","rastar"),("রাস্তাকে","rastake")), 0, "After -া, 'in' is -য়: রাস্তায়. (রাস্তার is 'of'.)", inst="Choose the correct form."),
  PICK("What is the 'of' form of বই (book)?", O(("বইয়ের","boiyer"),("বইয়ে","boiye"),("বইকে","boike")), 0, "After the vowel ই, 'of' is -য়ের: বইয়ের.", inst="Choose the correct form."),
  SPOT(O(("টেবিলের উপর","tebiler upor"),("টেবিল উপর","tebil upor"),("টেবিলকে উপর","tebilke upor")), 0, "উপর needs the genitive: টেবিলের উপর.", inst="Only one phrase is correct. Choose it."),
  SPOT(O(("বাড়ি থেকে","bari theke"),("বাড়ির থেকে","barir theke"),("বাড়িকে থেকে","barike theke")), 0, "থেকে follows the plain noun.", inst="Only one phrase is correct. Choose it."),
 ]))]
