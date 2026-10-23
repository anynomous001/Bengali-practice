# Topic vocabulary: speech, hearing and therapy. Words are (Bengali, romanized, English[, note]).
# Written for speech therapists and other professionals who work with Bengali-speaking (Kolkata) families.
# The Bengali needs the teacher's review before students rely on it.
TOPICS = [
dict(id="mouth-voice", group="clinical", title=("মুখ ও কণ্ঠস্বর", "mukh o konthoshor", "Mouth, voice and hearing"),
 blurb="The parts of the mouth and throat, words for voice and sound, and how to ask about hearing.",
 sections=[
  ("Mouth and throat", [
   ("মুখ", "mukh", "mouth; face"), ("ঠোঁট", "thont", "lip"), ("দাঁত", "dant", "tooth"), ("জিভ", "jibh", "tongue"),
   ("তালু", "talu", "palate; the roof of the mouth"), ("চোয়াল", "choyal", "jaw"), ("গলা", "gola", "throat; voice"),
   ("নাক", "nak", "nose"), ("গাল", "gal", "cheek"), ("থুতনি", "thutni", "chin"), ("ফুসফুস", "phusphus", "lung"),
   ("শ্বাস", "shash", "breath"), ("স্বরযন্ত্র", "shorojontro", "voice box (larynx)"),
  ]),
  ("Voice and sound", [
   ("আওয়াজ", "awaj", "sound; voice"), ("স্বর", "shor", "voice; tone"), ("শব্দ", "shobdo", "sound; noise"),
   ("জোরে", "jore", "loudly"), ("আস্তে", "aste", "softly; slowly"), ("চুপ", "chup", "quiet; silent"),
   ("ফিসফিস", "phisphis", "whisper"), ("গান", "gan", "song"), ("কাশি", "kashi", "cough"), ("হাঁচি", "hanchi", "sneeze"),
  ]),
  ("Ears and hearing", [
   ("কান", "kan", "ear"), ("শোনা", "shona", "to hear; to listen"), ("শ্রবণশক্তি", "shrobonshokti", "hearing"),
   ("বধির", "bodhir", "deaf"), ("কানে কম শোনা", "kane kom shona", "hard of hearing"), ("কানের ব্যথা", "kaner byatha", "earache"),
   ("কানের পর্দা", "kaner porda", "eardrum"), ("কানের যন্ত্র", "kaner jontro", "hearing aid"),
  ]),
 ],
 phrases=[
  ("মুখ খোলো।", "mukh kholo.", "Open your mouth."),
  ("জিভ বের করো।", "jibh ber koro.", "Stick out your tongue."),
  ("ঠোঁট বন্ধ করো।", "thont bondho koro.", "Close your lips."),
  ("জিভটা ওপরে তোলো।", "jibhta opore tolo.", "Lift your tongue up."),
  ("দাঁত দেখাও।", "dant dekhao.", "Show me your teeth."),
  ("গভীর শ্বাস নাও।", "gobhir shash nao.", "Take a deep breath."),
  ("আস্তে আস্তে শ্বাস ছাড়ো।", "aste aste shash chharo.", "Breathe out slowly."),
  ("তুমি কি ভালো শুনতে পাও?", "tumi ki bhalo shunte pao?", "Can you hear well?"),
  ("কানে কি ব্যথা করে?", "kane ki byatha kore?", "Does your ear hurt?"),
  ("গলা কি ব্যথা করছে?", "gola ki byatha korchhe?", "Does your throat hurt?"),
 ]),

dict(id="speech-language", group="clinical", title=("কথা ও ভাষা", "kotha o bhasha", "Speech and language"),
 blurb="Words for speaking, understanding and how speech sounds, and for asking about a child's development.",
 sections=[
  ("Speaking and understanding", [
   ("কথা", "kotha", "speech; talk"), ("কথা বলা", "kotha bola", "to speak"), ("ভাষা", "bhasha", "language"),
   ("শব্দ", "shobdo", "word"), ("বাক্য", "bakyo", "sentence"), ("অক্ষর", "okkhor", "letter; syllable"),
   ("ধ্বনি", "dhoni", "speech sound"), ("উচ্চারণ", "uchcharon", "pronunciation"), ("বোঝা", "bojha", "to understand"),
   ("বলা", "bola", "to say"), ("প্রশ্ন", "proshno", "question"), ("উত্তর", "uttor", "answer"),
  ]),
  ("How speech sounds", [
   ("স্পষ্ট", "sposhto", "clear"), ("অস্পষ্ট", "osposhto", "unclear"), ("ঠিক", "thik", "correct; right"), ("ভুল", "bhul", "wrong; a mistake"),
   ("তাড়াতাড়ি", "taratari", "quickly"), ("ধীরে", "dhire", "slowly"), ("আবার", "abar", "again"), ("বারবার", "barbar", "again and again"),
   ("তোতলানো", "totlano", "to stutter"), ("আধো আধো কথা", "adho adho kotha", "baby talk"), ("নাকি সুরে", "naki shure", "in a nasal voice"),
  ]),
  ("Child development", [
   ("বয়স", "boyosh", "age"), ("মাস", "mash", "month"), ("বছর", "bochhor", "year"), ("বড় হওয়া", "boro howa", "to grow up"),
   ("প্রথম", "prothom", "first"), ("দেরি", "deri", "delay; lateness"), ("হাঁটা", "hata", "walking"), ("খেলা", "khela", "play; a game"),
   ("মাতৃভাষা", "matribhasha", "mother tongue"), ("দুই ভাষা", "dui bhasha", "two languages"),
  ]),
 ],
 phrases=[
  ("আপনার ছেলের বয়স কত?", "apnar chheler boyosh koto?", "How old is your son?"),
  ("আপনার মেয়ে কবে প্রথম কথা বলেছিল?", "apnar meye kobe prothom kotha bolechhilo?", "When did your daughter first speak?"),
  ("ও কি আপনার কথা বোঝে?", "o ki apnar kotha bojhe?", "Does he or she understand what you say?"),
  ("বাড়িতে আপনারা কোন কোন ভাষায় কথা বলেন?", "barite apnara kon kon bhashay kotha bolen?", "Which languages do you speak at home?"),
  ("ওর কথা কি স্পষ্ট?", "or kotha ki sposhto?", "Is his or her speech clear?"),
  ("আবার বলো।", "abar bolo.", "Say it again."),
  ("আমার সঙ্গে বলো।", "amar shonge bolo.", "Say it with me."),
  ("আস্তে আস্তে বলো।", "aste aste bolo.", "Say it slowly."),
 ]),

dict(id="therapy-practice", group="clinical", title=("থেরাপি ও অনুশীলন", "therapi o onushilon", "Therapy and home practice"),
 blurb="People, sessions and the words you need to give home exercises, praise a child and talk with parents.",
 sections=[
  ("People and places", [
   ("থেরাপিস্ট", "therapist", "therapist"), ("থেরাপি", "therapi", "therapy"), ("ডাক্তার", "daktar", "doctor"), ("শিক্ষক", "shikkhok", "teacher"),
   ("বাবা-মা", "baba-ma", "parents"), ("অভিভাবক", "obhibhabok", "parent; guardian"), ("রোগী", "rogi", "patient"),
   ("ক্লিনিক", "klinik", "clinic"), ("হাসপাতাল", "haspatal", "hospital"),
  ]),
  ("Sessions", [
   ("সেশন", "seshon", "session"), ("পরীক্ষা", "porikkha", "test; examination"), ("মূল্যায়ন", "mullayon", "assessment"),
   ("রিপোর্ট", "riport", "report"), ("লক্ষ্য", "lokkho", "goal"), ("পরিকল্পনা", "porikolpona", "plan"),
   ("উন্নতি", "unnoti", "progress; improvement"), ("সমস্যা", "shomoshya", "problem"), ("পরামর্শ", "poramorsho", "advice"),
   ("সময়", "shomoy", "time"), ("পরের সপ্তাহ", "porer shoptaho", "next week"),
  ]),
  ("Practice at home", [
   ("অনুশীলন", "onushilon", "practice"), ("ব্যায়াম", "byayam", "exercise"), ("বাড়ির কাজ", "barir kaj", "homework"),
   ("রোজ", "roj", "every day"), ("মিনিট", "minit", "minute"), ("খেলনা", "khelna", "toy"), ("ছবি", "chhobi", "picture"),
   ("বই", "boi", "book"), ("প্রশংসা", "proshongsha", "praise"), ("সাবাশ", "shabash", "well done"),
   ("চেষ্টা", "cheshta", "effort; a try"), ("ধৈর্য", "dhoirjo", "patience"),
  ]),
 ],
 phrases=[
  ("আজ আমরা একসঙ্গে খেলব।", "aj amra ekshonge khelbo.", "Today we will play together."),
  ("আমার দিকে তাকাও।", "amar dike takao.", "Look at me."),
  ("মন দিয়ে শোনো।", "mon diye shono.", "Listen carefully."),
  ("সাবাশ! খুব ভালো হয়েছে।", "shabash! khub bhalo hoyechhe.", "Well done! That was very good."),
  ("আবার চেষ্টা করো।", "abar cheshta koro.", "Try again."),
  ("বাড়িতে রোজ দশ মিনিট অনুশীলন করবেন।", "barite roj dosh minit onushilon korben.", "Please practise for ten minutes every day at home."),
  ("সে ধীরে ধীরে ভালো হচ্ছে।", "she dhire dhire bhalo hochchhe.", "He or she is getting better slowly."),
  ("আপনার কোনো প্রশ্ন আছে?", "apnar kono proshno achhe?", "Do you have any questions?"),
  ("পরের সপ্তাহে আবার আসবেন।", "porer shoptahe abar ashben.", "Please come again next week."),
  ("ধৈর্য ধরুন, সময় লাগবে।", "dhoirjo dhorun, shomoy lagbe.", "Please be patient, it will take time."),
 ]),
]
