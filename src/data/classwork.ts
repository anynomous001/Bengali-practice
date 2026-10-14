// Class exercises: written answers in Banglish, checked against a model answer.
// The first six sets follow the worksheets used in class. Where the worksheet gave an
// answer it is used as the model; the rest were written for this app and need the
// teacher's review.

export type CwItem = {
  prompt: string;
  /** Meaning or clue shown under the prompt. */
  hint?: string;
  /** The model answer shown after the student has tried. */
  answer: string;
  /** Other answers that are also fine. */
  alt?: string[];
  /** A short reminder of the rule behind the answer. */
  note?: string;
};

export type CwSet = {
  id: string;
  title: string;
  blurb: string;
  /** "What to do" shown above every question. */
  inst: string;
  items: CwItem[];
};

export const CLASSWORK: CwSet[] = [
  {
    id: "pronoun-tense",
    title: "Choose pronoun + tense",
    blurb: "Build a full sentence from a pronoun, a verb and a tense.",
    inst: "Write one full sentence in Banglish. Use the pronoun, the verb and the tense in the brackets, plus any time clue given.",
    items: [
      { prompt: "ami + khaowa + Present Simple", answer: "Ami khai." },
      { prompt: "tumi + khaowa + Present Continuous", answer: "Tumi khachho." },
      { prompt: "she + khaowa + Present Perfect", answer: "She kheyeche.", note: "se, tini and apni each take their own ending: kheyeche (se), kheyechen (tini, apni)." },
      { prompt: "apni + jawa + Present Simple", answer: "Apni jan." },
      { prompt: "tini + dekha + Present Perfect", answer: "Tini dekhechen." },
      { prompt: "ami + kora + Present Perfect Continuous + duto bochor dhore", hint: "I have been doing it for two years.", answer: "Ami duto bochor dhore korchi.", alt: ["Ami du bochor dhore korchi."], note: "Bengali uses the present continuous with dhore (for) for this meaning." },
      { prompt: "tumi + shikha + Present Perfect Continuous + ek bochor dhore", answer: "Tumi ek bochor dhore shikhcho." },
      { prompt: "she + jawa + Present Continuous", answer: "She jachhe." },
      { prompt: "apni + kotha bola + Present Perfect", answer: "Apni kotha bolechhen." },
      { prompt: "tini + pora + Present Perfect Continuous + tin ghonta dhore", answer: "Tini tin ghonta dhore porchhen." },
    ],
  },
  {
    id: "fix-pronoun-verb",
    title: "Fix the mistake: pronoun and verb",
    blurb: "Each sentence has one mistake in the pronoun or the verb form.",
    inst: "Each sentence has exactly one mistake. Write the whole sentence again, corrected. The meaning in brackets tells you what was intended.",
    items: [
      { prompt: "Ami khao.", answer: "Ami khai.", note: "ami goes with khai; khao belongs to tumi." },
      { prompt: "Tumi kori.", answer: "Tumi koro.", note: "tumi goes with koro; kori belongs to ami." },
      { prompt: "She jacchi.", answer: "She jachhe.", alt: ["Ami jachhi."], note: "jachhi belongs to ami. Fix the verb (se jachhe) or the pronoun (ami jachhi)." },
      { prompt: "Apni kore.", answer: "Apni koren.", note: "apni and tini take -en." },
      { prompt: "Tini kheyechi.", answer: "Tini kheyechen.", note: "-chi is only for ami." },
      { prompt: "Ami kal jacchi.", hint: "I went yesterday.", answer: "Ami kal gechilam.", note: "kal for yesterday needs the simple past or past perfect, not the present continuous." },
      { prompt: "She roj kheyechhe.", hint: "She eats every day.", answer: "She roj khay.", note: "A habit (roj, every day) is the present simple." },
      { prompt: "Tumi ekhon koreche.", hint: "You are doing it now.", answer: "Tumi ekhon korcho.", note: "ekhon (now) points to the present continuous. koreche is for se." },
      { prompt: "Ami roj kheyechi.", hint: "I eat every day.", answer: "Ami roj khai." },
      { prompt: "She ekhon-e jacchi.", hint: "He/She has gone now.", answer: "She ekhon-e geche.", note: "Present perfect of jawa for se is geche." },
    ],
  },
  {
    id: "fix-tense",
    title: "Fix the mistake: mixed tenses",
    blurb: "Find the tense error, correct it and name the tense you meant.",
    inst: "Check the sentence against the meaning in brackets. If there is an error, write the corrected sentence and name the tense. If the sentence is already right, write \"correct\" and name the tense.",
    items: [
      { prompt: "Tumi protidin Bangla shekho.", hint: "You learn Bengali every day (a habit).", answer: "Correct. Present Simple.", note: "shekho is the tumi form of the present simple." },
      { prompt: "Ami ekhon boi porchi.", hint: "I am reading a book right now.", answer: "Correct. Present Continuous." },
      { prompt: "Tini ki nasta korchhen?", hint: "Is she having breakfast?", answer: "Correct. Present Continuous." },
      { prompt: "She gotokal amake phone korechilo.", hint: "She called me yesterday.", answer: "She gotokal amake phone korlo.", note: "A single finished action yesterday is the simple past. korechilo is the past perfect (had called)." },
      { prompt: "Apni tin ghonta dhore gari chalchhen.", hint: "You have been driving for three hours, and you still are.", answer: "Correct. Present Perfect Continuous.", note: "Bengali uses the present continuous plus dhore." },
      { prompt: "Tumi gotokal raat-e ki khacchile?", hint: "What were you eating last night?", answer: "Correct. Past Continuous." },
      { prompt: "Tini bari pouchhanor age ranna korechilen.", hint: "She had cooked before reaching home.", answer: "Correct. Past Perfect." },
      { prompt: "Ami dui bochor dhore gaan shikhchilam.", hint: "(before I started college) I had been learning songs for two years.", answer: "Correct. Past Perfect Continuous.", note: "dhore plus the past continuous, with a later past event as the reference point." },
    ],
  },
  {
    id: "complex-translation",
    title: "Translation: complex situations",
    blurb: "Longer English sentences with time clues. Read the clues before you pick the tense.",
    inst: "Translate the English sentence into Banglish. The sentences pack in time clues on purpose: read them first, then choose the tense. There can be more than one good answer.",
    items: [
      { prompt: "By the time I called her, she had already left for the market.", hint: "Clues: jakhan (when), takhan (then), itimodhye (already).", answer: "Ami jakhan phone korechilam, takhan se itimodhye bazare chole giyechilen.", note: "had already left is the past perfect: chole giyechilen." },
      { prompt: "I've been working on this project for three months, and I still haven't finished it.", answer: "Ami tin mas dhore ei project-e kaj korchi ebong ekhono ses korte parini.", alt: ["Ami tin mas dhore ei project-e kaj korchi ebong ekhono ses korini."] },
      { prompt: "He was cooking dinner when the electricity went out last night.", answer: "Gotokal rate jakhan electricity chole gelo, takhan se rater khabar ranna korchilo.", alt: ["Gotokal rate jakhan electricity chole giyechilo, takhan se rater khabar ranna korchilo."] },
      { prompt: "Every morning before going to work, she drinks a cup of tea.", answer: "Protidin sokale kaje jawar age se ek cup cha khay.", alt: ["Protidin sokale kaje jawar age se ek cup cha pan kore."] },
      { prompt: "We had been waiting for an hour before the train finally arrived.", answer: "Train ta ses porjonto ashar age amra ek ghonta dhore opekkha korchilam.", alt: ["Train ta finally ashar age amra ek ghonta dhore opekkha korchilam."] },
      { prompt: "I don't know if he has eaten yet. He was still asleep when I left.", answer: "Ami jani na se ekhono kheyeche kina. Ami jakhan beriyechilam, takhan se ghumochchhilo.", alt: ["Ami jani na se ekhono kheyeche kina. Se ghumiye chilo jakhan ami beriye gechilam."] },
      { prompt: "She has been learning English for two years now, and she's getting better every day.", answer: "Se dui bochor dhore English shikhchhe ebong se protidin aro bhalo korchhe.", alt: ["Se du bochor dhore English shikhchhe ebong protidin bhalo hochchhe."] },
      { prompt: "By next month I will have been living in this city for five years.", answer: "Porer mas-e ei shohore amar panch bochor hoye jabe.", alt: ["Porer mas porle ami ei shohore panch bochor dhore thakbo."] },
    ],
  },
  {
    id: "transformation",
    title: "Tense transformation",
    blurb: "Rewrite a sentence in a different tense.",
    inst: "Rewrite the sentence in the tense given in the brackets. Keep the meaning as close as you can, and add any extra words the bracket asks for.",
    items: [
      { prompt: "Ami bhat khai.", hint: "Present Continuous", answer: "Ami bhat khachchhi." },
      { prompt: "Tumi office-e giyechile.", hint: "Past Continuous", answer: "Tumi office-e jachhile." },
      { prompt: "She gaan shikhchhe.", hint: "Present Perfect", answer: "She gaan shikhechhe." },
      { prompt: "Tini kaj korchilen.", hint: "Past Perfect, add an \"age\" clause", answer: "Ami pouchhanor age tini kaj korechilen.", alt: ["Tini bari jawar age kaj korechilen."] },
      { prompt: "Ami ranna korchi.", hint: "Present Perfect Continuous, add \"koto khon dhore\"", answer: "Ami koto khon dhore ranna korchi?", alt: ["Ami ek ghonta dhore ranna korchi."], note: "koto khon dhore asks how long; ek ghonta dhore says how long." },
      { prompt: "Tumi boi porecho.", hint: "Simple Past", answer: "Tumi boi porle." },
      { prompt: "Tini office jachhilen.", hint: "Present Continuous", answer: "Tini office jachchhen." },
      { prompt: "Ami dui ghonta dhore opekkha korchilam.", hint: "Present Perfect Continuous", answer: "Ami dui ghonta dhore opekkha korchi." },
    ],
  },
  {
    id: "combination",
    title: "Sentence combination",
    blurb: "Join two actions into one sentence with age, dhore or jokhon.",
    inst: "Join the two actions into one Banglish sentence. Use the connector (age = before, dhore = for, jokhon = when) and the tense named in the brackets.",
    items: [
      { prompt: "[She reached home] + [I had already cooked dinner]", hint: "Past Perfect, connector: age", answer: "Se bari pouchhanor age-i ami ranna korechilam.", alt: ["Se bari pouchhanor age ami ranna kore rekhechilam."] },
      { prompt: "[He is studying] + [it's been two hours]", hint: "Present Perfect Continuous, connector: dhore", answer: "Se dui ghonta dhore porchhe." },
      { prompt: "[The phone rang] + [I was taking a bath]", hint: "Past Continuous, connector: jokhon", answer: "Jokhon phone bajlo, tokhon ami snan korchilam." },
      { prompt: "[I finish my work] + [I will rest]", hint: "Present habit: use \"kaj shesh hole...\"", answer: "Kaj shesh hole ami bishram nebo.", alt: ["Kaj shesh hole ami bishram nei."] },
      { prompt: "[She has been in Kolkata] + [it's been five years]", hint: "Present Perfect Continuous, connector: dhore", answer: "Se panch bochor dhore Kolkata-y achhe." },
      { prompt: "[We reached the station] + [the train had already left]", hint: "Past Perfect, connector: age", answer: "Amra station-e pouchhanor age-i train chole giyechilo." },
      { prompt: "[He was sleeping] + [the guests arrived]", hint: "Past Continuous + Simple Past, connector: jokhon", answer: "Jokhon atithira elo, tokhon se ghumochchhilo." },
      { prompt: "[I am learning Bengali] + [I moved here two years ago]", hint: "Present Perfect Continuous, connector: dhore", answer: "Ami dui bochor dhore Bangla shikhchhi, karon ami dui bochor age ekhane esechhi.", alt: ["Ami dui bochor dhore ekhane thakchhi ebong Bangla shikhchhi."] },
    ],
  },
  {
    id: "bochon-ling",
    title: "Number and gender practice",
    blurb: "Make plurals, fix mistakes, choose the right gender word and translate.",
    inst: "Follow the instruction in each question and write your answer in Banglish. Remember: a counted noun stays singular, people take -ra, things take -gulo, and adjectives do not change for gender.",
    items: [
      { prompt: "Make plural: chhele", hint: "boy", answer: "chhelera", note: "People: add -ra." },
      { prompt: "Make plural: meye", hint: "girl", answer: "meyera", note: "People: add -ra." },
      { prompt: "Make plural: tumi", hint: "you", answer: "tomra", note: "Pronouns change completely." },
      { prompt: "Make plural: boi (things)", hint: "book", answer: "boigulo", note: "Things: add -gulo." },
      { prompt: "Make plural: se", hint: "he / she", answer: "tara", note: "Pronouns change completely." },
      { prompt: "Make plural: bondhu", hint: "friend", answer: "bondhura", note: "People: add -ra." },
      { prompt: "Fix the mistake: \"Dui ta boigulo amar achhe.\"", hint: "I have two books.", answer: "Duto boi amar achhe.", note: "After a number the noun stays singular, with no -gulo. And the counter is written duto, not dui ta." },
      { prompt: "Is this right? \"Chhelera boi porchhe.\" Say why.", hint: "The boys are reading a book.", answer: "Right. Chhelera is the correct plural for people (-ra), the noun boi stays plain, and the verb porchhe is the same for one boy or many.", note: "The verb never changes for number." },
      { prompt: "Choose: \"Meyeti khub (bhalo / bhali)?\"", hint: "The girl is very good.", answer: "Meyeti khub bhalo.", note: "Adjectives do not change for gender. Bhalo is used for girls and boys. (Bhali is not used.)" },
      { prompt: "Give the feminine of: chhatro, shikkhok", answer: "chhatri, shikkhika", note: "-tro becomes -tri, and -ok becomes -ika." },
      { prompt: "Translate: She went to the market. / He went to the market.", answer: "Se bajare gelo.", note: "Se means both he and she, and the verb is the same." },
      { prompt: "Translate: Those girls are going to school.", answer: "Oi meyera school-e jachchhe.", alt: ["Oi meyera skule jachchhe."], note: "Meyera: people take -ra. Jachchhe is the same for one girl or many." },
      { prompt: "Translate: I have three books.", answer: "Amar tinte boi achhe.", note: "After a number: no -gulo, and use the counter -ta/-te for things." },
      { prompt: "Translate: My sister is a teacher. My brother is a doctor.", answer: "Amar bon shikkhika. Amar bhai daktar.", note: "Shikkhika is the feminine of shikkhok; daktar works for both." },
    ],
  },
];

export const getClasswork = (id: string) => CLASSWORK.find((s) => s.id === id);
