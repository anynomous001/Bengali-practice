// "My path": the goals a student can pick, each an ordered list of lessons that already exist in the curriculum.
// To add a goal, add an entry below. To add a lesson to a goal, add its id (see src/data/curriculum.ts) to a stage.
// Lesson ids that do not exist are left out of the page, and `npm run check:paths` lists them.

export type PathStep = { id: string; why: string };
export type PathStage = {
  title: string;
  blurb: string;
  steps: PathStep[];
  /** Left out for students who say they can already read Bengali letters. */
  script?: boolean;
};
export type PathGoal = {
  id: string;
  /** A short label shown on lessons when a student has more than one goal. */
  tag: string;
  title: string;
  /** A Bengali word that stands for the goal, shown big on its card. */
  bn: string;
  bnRoman: string;
  blurb: string;
  /** Who this path is for. */
  who: string;
  stages: PathStage[];
  /** Said honestly when the path is shorter than it should be. */
  note?: string;
};

const SCRIPT: PathStage = {
  title: "The script",
  blurb: "Learn the letters and the signs first. Everything else is easier once you can read them.",
  script: true,
  steps: [
    { id: "reading/alphabet", why: "Every Bengali word is built from these letters." },
    { id: "reading/matras", why: "The vowel signs, so you can read whole words and not just single letters." },
  ],
};

export const GOALS: PathGoal[] = [
  {
    id: "family",
    tag: "Family",
    title: "Talk with my family",
    bn: "পরিবার",
    bnRoman: "poribar",
    blurb: "Speak with parents, grandparents and relatives back home, and understand their replies.",
    who: "For people who live abroad and want to talk with family in Bengal.",
    stages: [
      SCRIPT,
      {
        title: "Greetings and family",
        blurb: "How to greet people, name your relatives, and say how you feel.",
        steps: [
          { id: "vocabulary/greetings", why: "Polite words are the first thing relatives notice." },
          { id: "vocabulary/family", why: "Names for every relative: the words you will use most." },
          { id: "vocabulary/feelings", why: "Say how you are, and ask how they are." },
          { id: "vocabulary/questions", why: "Ask who, what, where and when." },
        ],
      },
      {
        title: "Talking with elders",
        blurb: "Who you say আপনি to and who you say তুমি to, and the verbs you need.",
        steps: [
          { id: "grammar/purush", why: "Choosing আপনি, তুমি or তুই is the key to speaking respectfully with family." },
          { id: "vocabulary/verbs", why: "The 52 most common verbs for everyday talk." },
          { id: "grammar/kriya", why: "How verbs change for each person, including polite commands." },
          { id: "grammar/tense-present", why: "Say what you are doing and what you do every day." },
        ],
      },
      {
        title: "Everyday talk",
        blurb: "Food, the house, days and the festivals you celebrate together.",
        steps: [
          { id: "vocabulary/food", why: "Meals are a big part of family conversation." },
          { id: "vocabulary/house", why: "Talk about home, and ask about theirs." },
          { id: "vocabulary/time", why: "Days and times, for planning calls and visits." },
          { id: "vocabulary/describing", why: "Describe people, food and things." },
          { id: "vocabulary/festivals", why: "Festival wishes and what happens at Pujo." },
        ],
      },
      {
        title: "Family conversations",
        blurb: "Four role plays for the conversations you will actually have: calls, grandparents, your partner's family and planning a visit.",
        steps: [
          { id: "speaking/roleplay-family-call", why: "Call your parents: ask how they are, if they have eaten, and tell them about your day." },
          { id: "speaking/roleplay-family-grandparents", why: "Greet your grandparents with respect, ask for a story, and say yes to food kindly." },
          { id: "speaking/roleplay-family-inlaws", why: "Meet your partner's parents: introduce yourself, praise the food, and ask people to slow down." },
          { id: "speaking/roleplay-family-visit", why: "Plan a visit home: dates, who picks you up, and what to do when a flight changes." },
        ],
      },
      {
        title: "Say it aloud",
        blurb: "More practice speaking, with no script.",
        steps: [
          { id: "speaking/flashcards", why: "Say the Bengali word before you see it." },
          { id: "speaking/roleplay-phone", why: "Starting a call, asking for someone and ending politely." },
          { id: "speaking/roleplay-restaurant", why: "Eating out together: ordering and talking at the table." },
          { id: "speaking/impromptu", why: "Talk about a topic you have never seen, like a real conversation." },
          { id: "speaking/story-relay", why: "Tell a story together, one sentence at a time." },
        ],
      },
    ],
  },
  {
    id: "devotional",
    tag: "Devotional",
    title: "Devotional communication",
    bn: "ভক্তি",
    bnRoman: "bhokti",
    blurb: "Greet devotees, join kīrtan, talk about your path, and read the texts in the original.",
    who: "For people in a spiritual community who want to speak and read the way it is done there.",
    stages: [
      SCRIPT,
      {
        title: "First words",
        blurb: "Greetings, how to address people, and the words of daily practice.",
        steps: [
          { id: "vocabulary/dev-greetings", why: "How to greet and take leave." },
          { id: "vocabulary/dev-address", why: "The right way to address seniors and devotees." },
          { id: "vocabulary/dev-practice", why: "Words for practice and daily life." },
          { id: "vocabulary/dev-heart", why: "Words for qualities and feelings." },
        ],
      },
      {
        title: "At the ashram and temple",
        blurb: "What to say and what you will hear when you arrive.",
        steps: [
          { id: "vocabulary/dev-phrases", why: "Everyday phrases in the sādhu-saṅga." },
          { id: "speaking/roleplay-dev-ashram", why: "Practice arriving and greeting a senior devotee." },
          { id: "vocabulary/dev-temple", why: "Phrases for the temple or ashram." },
          { id: "speaking/roleplay-dev-temple", why: "Practice a visit to the temple." },
          { id: "vocabulary/dev-food", why: "The words for food and prasād." },
          { id: "speaking/roleplay-dev-prasad", why: "Offer and accept prasād, and say sorry the Vaishnava way." },
        ],
      },
      {
        title: "Kīrtan",
        blurb: "Join in, understand what is sung, and say something about it.",
        steps: [
          { id: "vocabulary/dev-kirtan", why: "The words of kīrtan and music." },
          { id: "vocabulary/dev-kirtan-phrases", why: "What to say at kīrtan." },
          { id: "speaking/roleplay-dev-kirtan", why: "Practice complimenting the singing and joining the cheer." },
          { id: "vocabulary/dev-names", why: "Divine names and holy places." },
        ],
      },
      {
        title: "Your own path",
        blurb: "Talk about who you follow, ask for a blessing, and take leave.",
        steps: [
          { id: "vocabulary/dev-path", why: "Phrases for talking about your own path." },
          { id: "speaking/roleplay-dev-path", why: "Say who you follow and ask to learn more." },
          { id: "speaking/roleplay-dev-blessing", why: "Ask for a blessing and take leave with a bow." },
          { id: "vocabulary/dev-festivals", why: "Festival wishes." },
        ],
      },
      {
        title: "Reading the texts",
        blurb: "From single words to verses, nām and prayers, letter by letter.",
        steps: [
          { id: "reading/dev-ladder", why: "A ladder of devotional words, from easy to harder." },
          { id: "reading/dev-nam", why: "Bābājī's nām, read slowly." },
          { id: "reading/dev-decoder", why: "How verse words differ from everyday words." },
          { id: "reading/dev-bhajan", why: "Read a whole bhajan." },
          { id: "reading/dev-guru", why: "Prayers to the guru." },
        ],
      },
      {
        title: "Say it politely",
        blurb: "Complete lines and put sentences together the polite way.",
        steps: [
          { id: "grammar/class-dev-polite", why: "Everyday devotional sentences with the polite আপনি forms." },
          { id: "grammar/class-dev-sayverbs", why: "Sentences with the action words." },
        ],
      },
    ],
  },
  {
    id: "professional",
    tag: "Work",
    title: "Professional communication",
    bn: "কাজ",
    bnRoman: "kaj",
    blurb: "Be polite and clear at work: greetings, jobs, numbers, time and plans.",
    who: "For professionals who work with Bengali-speaking clients, colleagues or partners.",
    stages: [
      SCRIPT,
      {
        title: "Polite basics",
        blurb: "Greetings, the right level of formality, and questions.",
        steps: [
          { id: "vocabulary/greetings", why: "Greetings and polite words for any meeting." },
          { id: "grammar/purush", why: "আপনি is the formal level you use with colleagues and clients." },
          { id: "vocabulary/questions", why: "Ask clearly who, what, where, when and how much." },
          { id: "vocabulary/people", why: "People and jobs: how to name roles and professions." },
        ],
      },
      {
        title: "Work, numbers and time",
        blurb: "The words of work, money and the calendar.",
        steps: [
          { id: "vocabulary/media", why: "Work and technology words." },
          { id: "vocabulary/time", why: "Days and times, for meetings and deadlines." },
          { id: "reading/numbers", why: "Numbers, prices, days and months." },
          { id: "speaking/numbers", why: "Understand a number or price when you hear it." },
          { id: "vocabulary/market", why: "Money and prices." },
        ],
      },
      {
        title: "Speaking clearly",
        blurb: "Verbs, plans and polite sentences.",
        steps: [
          { id: "vocabulary/verbs", why: "The common verbs behind most sentences." },
          { id: "grammar/kriya", why: "Polite commands and requests." },
          { id: "grammar/tense-future", why: "Talk about plans, promises and what will happen." },
          { id: "grammar/nishedh", why: "Say no politely, and ask yes/no questions." },
          { id: "grammar/vakya", why: "Join ideas with 'and', 'but' and 'because'." },
        ],
      },
      {
        title: "Conversations",
        blurb: "Practice speaking out loud.",
        steps: [
          { id: "speaking/roleplay-phone", why: "Start a call, ask for someone, and handle a bad line." },
          { id: "speaking/impromptu", why: "Speak on a topic with a timer, as in a real meeting." },
        ],
      },
    ],
    note: "This path is shorter than it should be. Workplace role plays, such as a call with a client, are still to come.",
  },
  {
    id: "clinical",
    tag: "Clinical",
    title: "Speech and health care work",
    bn: "চিকিৎসা",
    bnRoman: "chikitsha",
    blurb: "Talk with Bengali-speaking families and children: ask about history, give simple instructions and explain home practice.",
    who: "For speech therapists, nurses, teachers and others who work with Bengali-speaking clients and their families.",
    stages: [
      SCRIPT,
      {
        title: "Polite basics",
        blurb: "Greet people properly, and ask clear questions.",
        steps: [
          { id: "vocabulary/greetings", why: "Greetings and polite words for any first meeting." },
          { id: "grammar/purush", why: "আপনি for parents and other adults, তুমি for children, and how the verb changes." },
          { id: "vocabulary/questions", why: "Ask who, what, where, when and how much." },
          { id: "vocabulary/people", why: "People and jobs: family members, teachers, doctors and therapists." },
        ],
      },
      {
        title: "The mouth, voice and hearing",
        blurb: "The words for the parts of the mouth, for voice and sound, and for hearing.",
        steps: [
          { id: "vocabulary/body", why: "The body, and how to say what hurts." },
          { id: "vocabulary/mouth-voice", why: "Mouth, throat, voice, sound and hearing: the words of your work." },
          { id: "vocabulary/speech-language", why: "Speech, language, how speech sounds and how a child develops." },
          { id: "vocabulary/clinical-history", why: "Conditions, feeding and swallowing, and the questions for a case history." },
          { id: "vocabulary/science-brain", why: "Science, the brain and memory, and the words for sound and language." },
        ],
      },
      {
        title: "Giving instructions",
        blurb: "Short commands for a child, and polite requests for a parent.",
        steps: [
          { id: "vocabulary/verbs", why: "The common verbs behind most instructions." },
          { id: "grammar/kriya", why: "Commands for a child and polite requests for an adult." },
          { id: "vocabulary/therapy-practice", why: "Sessions, home practice, praise and next steps." },
        ],
      },
      {
        title: "With a child and a family",
        blurb: "Three role plays for the conversations you will have: the first interview, a session with a child and explaining home practice.",
        steps: [
          { id: "speaking/roleplay-clinical-intake", why: "Greet a parent, ask about the child's speech and hearing, and listen to their worries." },
          { id: "speaking/roleplay-clinical-session", why: "Get a child's attention, give mouth and sound exercises, and praise the effort." },
          { id: "speaking/roleplay-clinical-home", why: "Say how the session went, give home exercises and agree the next visit." },
          { id: "speaking/roleplay-phone", why: "Call a family to confirm an appointment." },
        ],
      },
      {
        title: "With adult patients",
        blurb: "Friendly small talk with a patient, and the two checks you may do every day: a bedside swallowing check and a memory and orientation check.",
        steps: [
          { id: "vocabulary/swallow-check", why: "Mouth and tongue movements, water and sips, and what you listen for." },
          { id: "vocabulary/patient-chat", why: "Where a patient lives and with whom, how they slept, and small talk that puts them at ease." },
          { id: "vocabulary/memory-check", why: "Date, day and season questions, three-word recall and kind words for the patient." },
          { id: "speaking/roleplay-clinical-chat", why: "Chat with a patient before a session: where they live, who is at home, and what they used to do." },
          { id: "speaking/listen-patient", why: "Hear what a patient says and pick what it means." },
          { id: "speaking/listen-memory", why: "The three-word recall check, for your own ears: hear, count backwards, then recall." },
          { id: "speaking/roleplay-clinical-swallow", why: "Check a patient's swallow: mouth, tongue, cough, saliva and small sips of water." },
          { id: "speaking/roleplay-clinical-memory", why: "Ask orientation questions, give three words to remember and ask for them again." },
        ],
      },
    ],
    note: "Written for this path and still to be reviewed by your teacher. Phonetic symbols (IPA) and longer listening practice are still to come.",
  },
  {
    id: "passion",
    tag: "Curiosity",
    title: "Learn it for the love of it",
    bn: "ভালোবাসা",
    bnRoman: "bhalobasha",
    blurb: "A well-rounded start: the script, everyday words, how sentences work and a few stories.",
    who: "For anyone who simply loves languages and wants to learn Bengali for its own sake.",
    stages: [
      SCRIPT,
      {
        title: "First words",
        blurb: "Greetings, sounds and numbers: the small things that make it feel real.",
        steps: [
          { id: "speaking/sounds", why: "Hear the sounds, so you can tell similar letters apart." },
          { id: "vocabulary/greetings", why: "Say hello and be polite from day one." },
          { id: "reading/numbers", why: "Numbers, days and months." },
        ],
      },
      {
        title: "Words you will enjoy",
        blurb: "Food, festivals and the words people use to describe things.",
        steps: [
          { id: "vocabulary/food", why: "Bengali food is a good reason to learn the language." },
          { id: "vocabulary/festivals", why: "Festivals, and how people wish each other well." },
          { id: "vocabulary/describing", why: "Describe people, food and things." },
          { id: "vocabulary/film-tv", why: "Talk about films and TV, and what you thought of them." },
          { id: "vocabulary/art-craft", why: "Painting, sculpture and the crafts of Bengal." },
        ],
      },
      {
        title: "How the language works",
        blurb: "Enough grammar to see the pattern, and then to build sentences of your own.",
        steps: [
          { id: "grammar/purush", why: "Three levels of 'you', and why Bengali has them." },
          { id: "grammar/kriya", why: "How verbs are built and how they change." },
          { id: "grammar/tense-present", why: "Say what you do and what you are doing." },
        ],
      },
      {
        title: "Stories",
        blurb: "Read your first fables, easiest first.",
        steps: [
          { id: "reading/story-thirsty-crow", why: "The shortest story, with simple words." },
          { id: "reading/story-fox-grapes", why: "Another short fable." },
          { id: "reading/story-hare-tortoise", why: "A little longer: your first real story." },
        ],
      },
      {
        title: "Keep it fresh",
        blurb: "Spaced repetition and a little speaking, a few minutes a day.",
        steps: [
          { id: "vocabulary/flashcards", why: "Words you miss come back sooner." },
          { id: "speaking/impromptu", why: "Say a few sentences against a timer." },
        ],
      },
    ],
  },
  {
    id: "travel",
    tag: "Travel",
    title: "Travel and the market",
    bn: "ভ্রমণ",
    bnRoman: "bhromon",
    blurb: "Get around, bargain, order food and handle the everyday situations of a trip.",
    who: "For anyone visiting Kolkata or Bengal, or spending time at a market.",
    stages: [
      {
        title: "Numbers and money",
        blurb: "Understand prices and say what you want to pay.",
        steps: [
          { id: "reading/numbers", why: "Numbers 0 to 100, prices in টাকা, and days and months." },
          { id: "speaking/numbers", why: "Hear a number or price and pick the numeral." },
          { id: "vocabulary/market", why: "The words of the market and of money." },
        ],
      },
      {
        title: "Getting around",
        blurb: "Places, directions and transport.",
        steps: [
          { id: "vocabulary/places", why: "Places in the city." },
          { id: "vocabulary/directions", why: "Left, right, near, far, and where things are." },
          { id: "vocabulary/transport", why: "Rickshaw, auto, bus, train and metro." },
          { id: "speaking/roleplay-rickshaw", why: "Agree on the fare and give directions on the way." },
          { id: "speaking/roleplay-directions", why: "Stop someone and ask the way, then check you understood." },
          { id: "speaking/roleplay-train", why: "Buy a ticket and cope when a train is full or late." },
        ],
      },
      {
        title: "Shopping and eating",
        blurb: "Bargain politely and order a meal.",
        steps: [
          { id: "vocabulary/food", why: "Food and drink words." },
          { id: "speaking/roleplay-shop", why: "Ask the price and bargain politely." },
          { id: "speaking/roleplay-restaurant", why: "Order, ask for less spice, fix a wrong order and pay." },
        ],
      },
      {
        title: "Staying and staying well",
        blurb: "A hotel room, and what to say if you are unwell.",
        steps: [
          { id: "speaking/roleplay-hotel", why: "Check in and sort out a problem with the room." },
          { id: "vocabulary/body", why: "Body words, to say what hurts." },
          { id: "speaking/roleplay-doctor", why: "Say what is wrong and understand how to take the medicine." },
        ],
      },
    ],
  },
  {
    id: "speaking",
    tag: "Speaking",
    title: "Speak Bengali",
    bn: "বলা",
    bnRoman: "bola",
    blurb: "A general path from the first words to speaking freely.",
    who: "For anyone who wants to be able to talk.",
    stages: [
      {
        title: "Sounds",
        blurb: "Hear the letters and numbers so you can say them right.",
        steps: [
          { id: "speaking/sounds", why: "Listen to every letter and test your ear." },
          { id: "speaking/numbers", why: "Hear a number or price and pick the numeral." },
        ],
      },
      {
        title: "First words",
        blurb: "Greetings, questions and the verbs you will use most.",
        steps: [
          { id: "vocabulary/greetings", why: "Greetings and polite words." },
          { id: "vocabulary/questions", why: "Ask who, what, where and when." },
          { id: "vocabulary/verbs", why: "The most common verbs." },
          { id: "vocabulary/people", why: "People and jobs." },
          { id: "speaking/flashcards", why: "Say the Bengali word before you see it." },
        ],
      },
      {
        title: "Conversations",
        blurb: "Real situations, with the words and the phrases you need.",
        steps: [
          { id: "speaking/roleplay-shop", why: "A first conversation: asking a price and bargaining." },
          { id: "speaking/roleplay-restaurant", why: "Ordering and paying." },
          { id: "speaking/roleplay-phone", why: "A phone call." },
          { id: "speaking/roleplay-directions", why: "Asking the way." },
        ],
      },
      {
        title: "Speak freely",
        blurb: "Talk without a script.",
        steps: [
          { id: "speaking/impromptu", why: "Speak on a topic you have never seen." },
          { id: "speaking/story-relay", why: "Tell a story together, one sentence at a time." },
          { id: "speaking/exam", why: "A timed check of letters and numbers by ear." },
        ],
      },
    ],
  },
  {
    id: "reading",
    tag: "Reading",
    title: "Read Bengali",
    bn: "পড়া",
    bnRoman: "pora",
    blurb: "From the first letter to whole stories on your own.",
    who: "For anyone who wants to read signs, messages and stories.",
    stages: [
      SCRIPT,
      {
        title: "Numbers",
        blurb: "The numerals, so you can read prices, dates and phone numbers.",
        steps: [{ id: "reading/numbers", why: "Numbers 0 to 100, prices, days and months." }],
      },
      {
        title: "Short stories",
        blurb: "Seven fables, easiest first. Each is read in layers: words, Bengali only, line by line, then English.",
        steps: [
          { id: "reading/story-thirsty-crow", why: "Level 1: the shortest, with simple words." },
          { id: "reading/story-fox-grapes", why: "Level 1." },
          { id: "reading/story-hare-tortoise", why: "Level 2." },
          { id: "reading/story-ant-grasshopper", why: "Level 2." },
          { id: "reading/story-lion-mouse", why: "Level 2." },
          { id: "reading/story-monkey-crocodile", why: "Level 3: longer, with more verbs." },
          { id: "reading/story-blue-jackal", why: "Level 3." },
        ],
      },
      {
        title: "Keep it fresh",
        blurb: "Spaced repetition for letters, signs, words and numbers.",
        steps: [{ id: "reading/flashcards", why: "Cards you miss come back sooner." }],
      },
    ],
  },
  {
    id: "grammar",
    tag: "Grammar",
    title: "Speak and write correctly",
    bn: "ব্যাকরণ",
    bnRoman: "bakoron",
    blurb: "Understand how sentences are built, so you can make your own.",
    who: "For anyone who likes to know why, or who wants to write correctly.",
    stages: [
      {
        title: "Foundations",
        blurb: "Who is speaking, and the verb at the heart of the sentence.",
        steps: [
          { id: "grammar/purush", why: "The three persons and three levels of respect." },
          { id: "grammar/kriya", why: "Roots and endings, 'to be' and 'to have', and commands." },
        ],
      },
      {
        title: "Tenses",
        blurb: "Present, past and future, and the tables to check yourself.",
        steps: [
          { id: "grammar/kal", why: "The big picture of how Bengali handles time." },
          { id: "grammar/tense-present", why: "Present tenses." },
          { id: "grammar/tense-past", why: "Past tenses." },
          { id: "grammar/tense-future", why: "Future tenses." },
          { id: "grammar/tense-tables", why: "Verb tables to check yourself." },
        ],
      },
      {
        title: "What nouns do",
        blurb: "The job each noun does for the verb.",
        steps: [
          { id: "grammar/karak", why: "The roles of nouns in a sentence." },
          { id: "grammar/bibhakti", why: "The endings and little words that show the role." },
        ],
      },
      {
        title: "Sentences",
        blurb: "Plural, gender, saying no, and joining ideas.",
        steps: [
          { id: "grammar/bachan", why: "Singular and plural." },
          { id: "grammar/ling", why: "Gender." },
          { id: "grammar/nishedh", why: "Saying no, and asking." },
          { id: "grammar/vakya", why: "Word order and joining sentences." },
        ],
      },
      {
        title: "Practice",
        blurb: "Translate and fix sentences until it comes without thinking.",
        steps: [
          { id: "grammar/translate", why: "Ten sentences a round, in either direction." },
          { id: "grammar/class-pronoun-tense", why: "Choose the right pronoun and tense." },
          { id: "grammar/class-fix-tense", why: "Fix sentences with the wrong tense." },
          { id: "grammar/class-complex-translation", why: "Translate longer sentences." },
          { id: "grammar/exam", why: "A timed test across the whole course." },
        ],
      },
    ],
  },
];

export const getGoal = (id: string) => GOALS.find((g) => g.id === id);
export type Reads = "no" | "little" | "yes";
export const READS: { id: Reads; label: string }[] = [
  { id: "no", label: "Not yet" },
  { id: "little", label: "A little" },
  { id: "yes", label: "Yes, I can read it" },
];
