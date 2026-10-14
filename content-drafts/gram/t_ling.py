from lib import *

PAIRS = [("ছেলে","chhele","boy","মেয়ে","meye","girl"), ("ভাই","bhai","brother","বোন","bon","sister"), ("বাবা","baba","father","মা","ma","mother"),
         ("দাদা","dada","elder brother","দিদি","didi","elder sister"), ("ঠাকুরদা","thakurda","grandfather","ঠাকুমা","thakuma","grandmother"),
         ("কাকা","kaka","uncle (father's brother)","কাকিমা","kakima","aunt (his wife)"), ("মামা","mama","uncle (mother's brother)","মামি","mami","aunt (his wife)"),
         ("রাজা","raja","king","রানি","rani","queen"), ("ছাত্র","chhatro","male student","ছাত্রী","chhatri","female student"),
         ("শিক্ষক","shikkhok","male teacher","শিক্ষিকা","shikkhika","female teacher"), ("লেখক","lekhok","male writer","লেখিকা","lekhika","female writer"),
         ("গায়ক","gayok","male singer","গায়িকা","gayika","female singer"), ("নায়ক","nayok","hero, actor","নায়িকা","nayika","heroine, actress"),
         ("বালক","balok","boy","বালিকা","balika","girl")]

TOPICS = [finish(dict(id="ling", title=("লিঙ্গ", "Ling", "Gender: he, she and it"),
 blurb="Gender in Bengali lives only in some nouns. Learn the pairs, the two common endings, and the big surprise: he and she, verbs and adjectives do not change.",
 sections=[
  dict(id="what", title="Gender lives in the words", blocks=[
   P("লিঙ্গ (ling) means 'gender'. Bengali has three kinds. পুংলিঙ্গ (pumlingo) is masculine, স্ত্রীলিঙ্গ (strilingo) is feminine, and ক্লীবলিঙ্গ (klibolingo) is neuter, for things with no gender. You only need to remember the three terms once: the important thing is how gender behaves."),
   P("In Bengali, gender shows only in the words themselves. A few nouns have a masculine and a feminine form, like ছেলে (boy) and মেয়ে (girl). Everything else in the sentence stays the same. This is much simpler than languages where verbs and adjectives change for gender."),
   TABLE(["Name", "Meaning", "Examples"], [
     [c("পুংলিঙ্গ","pumlingo"), "masculine", c("ছেলে, বাবা, ছাত্র","chhele, baba, chhatro")],
     [c("স্ত্রীলিঙ্গ","strilingo"), "feminine", c("মেয়ে, মা, ছাত্রী","meye, ma, chhatri")],
     [c("ক্লীবলিঙ্গ","klibolingo"), "neuter: no gender", c("বই, টেবিল, গাছ","boi, tebil, gachh")],
   ], "The three genders"),
  ]),

  dict(id="pairs", title="Masculine and feminine pairs", blocks=[
   P("Many words for people come in pairs. Learn them together."),
   TABLE(["Masculine", "Meaning", "Feminine", "Meaning"], [[c(a, b), en1, c(d, e), en2] for a, b, en1, d, e, en2 in PAIRS], "Masculine (পুংলিঙ্গ) and feminine (স্ত্রীলিঙ্গ)"),
   H("In sentences"),
   EXS([("আমার ভাই ডাক্তার।","amar bhai daktar.","My brother is a doctor."), ("আমার বোন ডাক্তার।","amar bon daktar.","My sister is a doctor."), ("আমার বাবা শিক্ষক।","amar baba shikkhok.","My father is a teacher."),
        ("আমার মা শিক্ষিকা।","amar ma shikkhika.","My mother is a teacher."), ("রাহুল একজন ছাত্র।","rahul ekjon chhatro.","Rahul is a student."), ("রিনা একজন ছাত্রী।","rina ekjon chhatri.","Rina is a student."),
        ("তিনি একজন লেখিকা।","tini ekjon lekhika.","She is a writer."), ("তিনি একজন গায়ক।","tini ekjon gayok.","He is a singer.")], "Pairs in use"),
  ]),

  dict(id="endings", title="Two endings that make the feminine", blocks=[
   P("Many pairs follow a pattern. Some feminine words are made by changing the ending of the masculine word. Others are separate words, so learn them one by one."),
   TABLE(["Pattern", "Masculine", "Feminine"], [
     ["-ক becomes -িকা", c("শিক্ষক","shikkhok"), c("শিক্ষিকা","shikkhika")], ["", c("লেখক","lekhok"), c("লেখিকা","lekhika")], ["", c("গায়ক","gayok"), c("গায়িকা","gayika")], ["", c("নায়ক","nayok"), c("নায়িকা","nayika")], ["", c("বালক","balok"), c("বালিকা","balika")],
     ["-ত্র becomes -ত্রী", c("ছাত্র","chhatro"), c("ছাত্রী","chhatri")],
     ["a different word", c("ছেলে","chhele"), c("মেয়ে","meye")], ["", c("ভাই","bhai"), c("বোন","bon")], ["", c("বাবা","baba"), c("মা","ma")],
   ], "How the feminine is made"),
   NOTE("Many people today use the masculine form for both, for example শিক্ষক for any teacher. The feminine forms are still correct and you will hear and read them often."),
  ]),

  dict(id="nochange", title="What does not change", blocks=[
   P("This is the good news. In Bengali the pronoun সে, the verb and the adjective stay the same for men and women."),
   TABLE(["Part of the sentence", "Does it change for gender?", "Example"], [
     ["pronoun সে / তিনি", "No: one word for he and she", c("সে স্কুলে যায়।","she skule jay.")],
     ["verb", "No", c("ছেলেটি পড়ছে। মেয়েটি পড়ছে।","chheleti porchhe. meyeti porchhe.")],
     ["adjective", "No", c("ছেলেটি ভালো। মেয়েটি ভালো।","chheleti bhalo. meyeti bhalo.")],
   ], "Gender and the rest of the sentence"),
   EXS([("সে স্কুলে যায়।","she skule jay.","He goes to school. / She goes to school."), ("তিনি আমার শিক্ষক।","tini amar shikkhok.","He is my teacher. (tini is respectful: he or she)"), ("ছেলেটি খুব ভালো।","chheleti khub bhalo.","The boy is very good."),
        ("মেয়েটি খুব ভালো।","meyeti khub bhalo.","The girl is very good."), ("মেয়েটি গান গাইছে।","meyeti gan gaichhe.","The girl is singing."), ("ছেলেটি গান গাইছে।","chheleti gan gaichhe.","The boy is singing."),
        ("সে বাজারে গেল।","she bajare gelo.","He went to the market. / She went to the market.")], "Same word, same verb"),
   MISTAKES([
     (("মেয়েটি ভালি।","meyeti bhali."), ("মেয়েটি ভালো।","meyeti bhalo."), "The adjective does not take a feminine form. ভালো is used for girls and boys alike."),
   ], title="Do not change the adjective"),
  ]),

  dict(id="common", title="Common and neuter words", blocks=[
   P("Some words are for both men and women: ডাক্তার (daktar, doctor) is used for a male or a female doctor, and so are বন্ধু (friend), মানুষ (person) and শিশু (child). Things such as বই (book), টেবিল (table) and গাছ (tree) are neuter: they take no gender at all."),
   EXS([("আমার বন্ধু ডাক্তার।","amar bondhu daktar.","My friend is a doctor. (a man or a woman)"), ("ডাক্তার এসেছেন।","daktar eshechhen.","The doctor has come. (a man or a woman)"), ("বইটা টেবিলে আছে।","boita tebile achhe.","The book is on the table."),
        ("গাছটা অনেক বড়।","gachhta onek boro.","The tree is very big."), ("শিশুটি ঘুমোচ্ছে।","shishuti ghumochchhe.","The child is sleeping.")], "Common and neuter"),
  ]),
 ],
 exercises=[
  PICK("What is the Bengali word for 'masculine'?", O(("পুংলিঙ্গ","pumlingo"),("স্ত্রীলিঙ্গ","strilingo"),("ক্লীবলিঙ্গ","klibolingo")), 0, "পুংলিঙ্গ is masculine.", inst="Choose the word."),
  PICK("What is the Bengali word for 'feminine'?", O(("স্ত্রীলিঙ্গ","strilingo"),("পুংলিঙ্গ","pumlingo"),("ক্লীবলিঙ্গ","klibolingo")), 0, "স্ত্রীলিঙ্গ is feminine.", inst="Choose the word."),
  PICK("What is the Bengali word for 'neuter'?", O(("ক্লীবলিঙ্গ","klibolingo"),("পুংলিঙ্গ","pumlingo"),("স্ত্রীলিঙ্গ","strilingo")), 0, "ক্লীবলিঙ্গ is neuter.", inst="Choose the word."),
  PICK("Which is the feminine of ছাত্র (male student)?", O(("ছাত্রী","chhatri"),("ছাত্রিকা","chhatrika"),("ছাত্রা","chhatra")), 0, "-ত্র becomes -ত্রী: ছাত্রী.", inst="Choose the feminine word."),
  PICK("Which is the feminine of শিক্ষক (male teacher)?", O(("শিক্ষিকা","shikkhika"),("শিক্ষকী","shikkhoki"),("শিক্ষকা","shikkhoka")), 0, "-ক becomes -িকা: শিক্ষিকা.", inst="Choose the feminine word."),
  PICK("Which means 'sister'?", O(("বোন","bon"),("ভাই","bhai"),("ছেলে","chhele")), 0, "বোন is the sister, the partner of ভাই.", inst="Choose the word."),
  PICK("Which means 'girl'?", O(("মেয়ে","meye"),("ছেলে","chhele"),("বাবা","baba")), 0, "মেয়ে is the girl, the partner of ছেলে.", inst="Choose the word."),
  PICK("Which one is a neuter word?", O(("বই","boi"),("ছাত্রী","chhatri"),("বাবা","baba")), 0, "বই, a thing, has no gender.", inst="Choose the neuter word."),
  PICK("Which word can be used for both a man and a woman?", O(("ডাক্তার","daktar"),("ছাত্রী","chhatri"),("ছেলে","chhele")), 0, "ডাক্তার works for any doctor.", inst="Choose the word."),
  PICK("Does the verb change between 'the boy is singing' and 'the girl is singing'?", ["No, it stays the same", "Yes, it takes a feminine ending", "Yes, it adds -রা"], 0, "Bengali verbs do not change for gender.", inst="Choose the true statement."),
  PICK("What does সে mean?", ["only 'he'", "only 'she'", "'he' or 'she'"], 2, "সে is one word for both he and she.", inst="Choose the meaning."),
  FILL("রিনা একজন ___। (female student)","rina ekjon ___.", O(("ছাত্রী","chhatri"),("ছাত্র","chhatro"),("ছাত্রিকা","chhatrika")), 0, "A female student: ছাত্রী.", inst="Choose the word that fits."),
  FILL("আমার মা ___। (a teacher)","amar ma ___.", O(("শিক্ষিকা","shikkhika"),("শিক্ষক","shikkhok"),("শিক্ষকা","shikkhoka")), 0, "For a woman teacher: শিক্ষিকা.", inst="Choose the word that fits."),
  FILL("আমার ভাই ___। (a doctor)","amar bhai ___.", O(("ডাক্তার","daktar"),("ডাক্তারী","daktari"),("ডাক্তারিকা","daktarika")), 0, "ডাক্তার is used for both.", inst="Choose the word that fits."),
  SPOT(O(("মেয়েটি ভালো।","meyeti bhalo."),("মেয়েটি ভালি।","meyeti bhali."),("মেয়েটি ভালা।","meyeti bhala.")), 0, "The adjective ভালো does not change for gender.", inst="Only one sentence is correct. Choose it."),
  MEAN("My sister is a teacher.", O(("আমার বোন শিক্ষিকা।","amar bon shikkhika."),("আমার ভাই শিক্ষিকা।","amar bhai shikkhika."),("আমার মা শিক্ষক।","amar ma shikkhok.")), 0, "বোন (sister) with শিক্ষিকা (female teacher).", inst="Choose the Bengali sentence that means the same as the English sentence."),
  MEAN("My brother is a doctor.", O(("আমার ভাই ডাক্তার।","amar bhai daktar."),("আমার বোন ডাক্তার।","amar bon daktar."),("আমার বাবা ডাক্তার।","amar baba daktar.")), 0, "ভাই is brother, ডাক্তার is doctor.", inst="Choose the Bengali sentence that means the same as the English sentence."),
 ]))]
