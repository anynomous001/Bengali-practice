# Topic vocabulary: City & travel.
TOPICS = [
dict(id="places", group="city", title=("জায়গা", "jayga", "Places in the city"),
 blurb="Buildings and places you look for in a town, and some well-known places in Kolkata.",
 sections=[
  ("Shops and services", [
   ("জায়গা", "jayga", "place"), ("শহর", "shohor", "city; town"), ("গ্রাম", "gram", "village"), ("বাজার", "bajar", "market"),
   ("দোকান", "dokan", "shop"), ("ব্যাংক", "byank", "bank"), ("ডাকঘর", "dakghor", "post office"), ("ওষুধের দোকান", "oshudher dokan", "pharmacy"),
   ("হোটেল", "hotel", "hotel"), ("রেস্তোরাঁ", "restoran", "restaurant"),
  ]),
  ("Public places", [
   ("স্কুল", "skul", "school"), ("কলেজ", "kolej", "college"), ("হাসপাতাল", "haspatal", "hospital"), ("থানা", "thana", "police station"),
   ("পার্ক", "park", "park"), ("মাঠ", "math", "playing field"), ("লাইব্রেরি", "laibreri", "library"), ("অফিস", "ofis", "office"),
   ("সিনেমা হল", "sinema hol", "cinema hall"), ("জাদুঘর", "jadughor", "museum"), ("চিড়িয়াখানা", "chiriyakhana", "zoo"),
  ]),
  ("Places of worship", [
   ("মন্দির", "mondir", "temple"), ("মসজিদ", "moshjid", "mosque"), ("গির্জা", "girja", "church"),
  ]),
  ("Kolkata", [
   ("কলকাতা", "kolkata", "Kolkata"), ("হাওড়া", "haora", "Howrah"), ("গঙ্গা", "ganga", "the Ganga (Hooghly)"), ("ময়দান", "moidan", "the Maidan"),
   ("কালীঘাট", "kalighat", "Kalighat"), ("দক্ষিণেশ্বর", "dokkhineshshor", "Dakshineswar"), ("কলেজ স্ট্রিট", "kolej strit", "College Street"),
   ("শিয়ালদহ", "sheyaldoho", "Sealdah"),
  ]),
 ],
 phrases=[
  ("এখানে কাছে কি কোনো ওষুধের দোকান আছে?", "ekhane kachhe ki kono oshudher dokan achhe?", "Is there a pharmacy near here?"),
  ("আমি কলেজ স্ট্রিটে বই কিনতে যাচ্ছি।", "ami kolej strite boi kinte jachchhi.", "I am going to College Street to buy books."),
  ("হাসপাতালটা কোথায়?", "haspatalta kothay?", "Where is the hospital?"),
 ]),

dict(id="directions", group="city", title=("দিক", "dik", "Directions and position"),
 blurb="Left, right, near, far: the words for finding your way.",
 sections=[
  ("Directions", [
   ("দিক", "dik", "direction"), ("ডান", "dan", "right"), ("বাঁ", "ban", "left"), ("সোজা", "shoja", "straight"),
   ("উত্তর", "uttor", "north"), ("দক্ষিণ", "dokkhin", "south"), ("পূর্ব", "purbo", "east"), ("পশ্চিম", "poshchim", "west"),
  ]),
  ("Where something is", [
   ("সামনে", "samne", "in front"), ("পিছনে", "pichhone", "behind"), ("উপরে", "upore", "above; up"), ("নিচে", "niche", "below; down"),
   ("ভিতরে", "bhitore", "inside"), ("বাইরে", "baire", "outside"), ("মাঝখানে", "majhkhane", "in the middle"), ("পাশে", "pashe", "beside"),
   ("কাছে", "kachhe", "near"), ("দূরে", "dure", "far"), ("এখানে", "ekhane", "here"), ("ওখানে", "okhane", "there"), ("কোথায়", "kothay", "where"),
  ]),
  ("Roads", [
   ("রাস্তা", "rasta", "road"), ("গলি", "goli", "lane"), ("মোড়", "mor", "turning; corner"), ("চৌমাথা", "choumatha", "crossroads"),
   ("ফুটপাথ", "phutpath", "pavement"), ("সেতু", "setu", "bridge"), ("ব্রিজ", "brij", "bridge"), ("ঠিকানা", "thikana", "address"),
  ]),
 ],
 phrases=[
  ("সোজা গিয়ে ডান দিকে ঘুরুন।", "shoja giye dan dike ghurun.", "Go straight and turn right."),
  ("স্টেশনটা এখান থেকে কত দূর?", "steshonta ekhan theke koto dur?", "How far is the station from here?"),
  ("এটা কি সঠিক রাস্তা?", "eta ki shothik rasta?", "Is this the right road?"),
 ]),

dict(id="transport", group="city", title=("যানবাহন", "janbahon", "Transport"),
 blurb="Getting around Kolkata and beyond: from trams and metro to boats.",
 sections=[
  ("Vehicles", [
   ("গাড়ি", "gari", "car; vehicle"), ("বাস", "bas", "bus"), ("ট্রাম", "tram", "tram"), ("মেট্রো", "metro", "metro"), ("ট্রেন", "tren", "train"),
   ("ট্যাক্সি", "taksi", "taxi"), ("অটো", "auto", "auto-rickshaw"), ("রিকশা", "riksha", "rickshaw"), ("সাইকেল", "saikel", "bicycle"),
   ("নৌকা", "nouka", "boat"), ("লঞ্চ", "lonch", "motor launch"), ("ফেরি", "pheri", "ferry"), ("বিমান", "biman", "aeroplane"),
  ]),
  ("Travelling", [
   ("যাত্রী", "jatri", "passenger"), ("চালক", "chalok", "driver"), ("টিকিট", "tikit", "ticket"), ("ভাড়া", "bhara", "fare; rent"),
   ("স্টেশন", "steshon", "station"), ("প্ল্যাটফর্ম", "platform", "platform"), ("বাসস্ট্যান্ড", "basstyand", "bus stand"), ("বিমানবন্দর", "bimanbondor", "airport"),
   ("যাত্রা", "jatra", "journey"),
  ]),
 ],
 phrases=[
  ("ভাড়া কত?", "bhara koto?", "How much is the fare?"),
  ("এই বাসটা কোথায় যাবে?", "ei bashta kothay jabe?", "Where does this bus go?"),
  ("আমাকে হাওড়া স্টেশনে নিয়ে যান।", "amake haora steshone niye jan.", "Take me to Howrah station."),
 ]),

dict(id="market", group="city", title=("বাজার ও টাকা", "bajar o taka", "Market and money"),
 blurb="Buying, selling, bargaining and paying.",
 sections=[
  ("Money", [
   ("টাকা", "taka", "money; rupee"), ("পয়সা", "poysha", "paisa; coin"), ("খুচরো", "khuchro", "change; small coins"), ("দাম", "dam", "price"),
   ("দর", "dor", "rate"), ("বেতন", "beton", "salary"), ("ফেরত", "pherot", "return; refund"), ("রসিদ", "roshid", "receipt"), ("কার্ড", "kard", "card"),
  ]),
  ("Buying and selling", [
   ("কেনা", "kena", "to buy"), ("বিক্রি", "bikri", "sale"), ("খদ্দের", "khoddher", "customer"), ("দোকানদার", "dokandar", "shopkeeper"),
   ("সস্তা", "shosta", "cheap"), ("দামি", "dami", "expensive"), ("ছাড়", "chhar", "discount"), ("ঝুড়ি", "jhuri", "basket"), ("থলে", "thole", "cloth bag"),
  ]),
  ("Quantities", [
   ("কিলো", "kilo", "kilo"), ("গ্রাম", "gram", "gram"), ("লিটার", "litar", "litre"), ("ডজন", "dojon", "dozen"), ("আধ", "adh", "half"),
   ("পোয়া", "poya", "quarter kilo"), ("এক টুকরো", "ek tukro", "one piece"), ("একটু", "ekto", "a little"), ("অনেক", "onek", "a lot"),
  ]),
 ],
 phrases=[
  ("এটার দাম কত?", "etar dam koto?", "How much is this?"),
  ("একটু কমান।", "ekto koman.", "Please reduce it a little."),
  ("আমি এক কিলো আলু চাই।", "ami ek kilo alu chai.", "I want one kilo of potatoes."),
 ]),
]
