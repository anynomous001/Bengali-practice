// A small rule-based Bengali to Roman converter in the app's plain "Banglish" style (kemon achhen, bhalo, shikkha).
// It is the fallback for Bengali text that has no hand-written romanization. It is client-safe: no lesson data in here.

const CONS: Record<string, string> = {
  ক: "k", খ: "kh", গ: "g", ঘ: "gh", ঙ: "ng", চ: "ch", ছ: "chh", জ: "j", ঝ: "jh", ঞ: "n", ট: "t", ঠ: "th", ড: "d", ঢ: "dh", ণ: "n",
  ত: "t", থ: "th", দ: "d", ধ: "dh", ন: "n", প: "p", ফ: "ph", ব: "b", ভ: "bh", ম: "m", য: "j", র: "r", ল: "l", শ: "sh", ষ: "sh", স: "sh", হ: "h",
  ড়: "r", ঢ়: "rh", য়: "y", ৎ: "t",
};
const VOWELS: Record<string, string> = { অ: "o", আ: "a", ই: "i", ঈ: "i", উ: "u", ঊ: "u", ঋ: "ri", এ: "e", ঐ: "oi", ও: "o", ঔ: "ou" };
const SIGNS: Record<string, string> = { "া": "a", "ি": "i", "ী": "i", "ু": "u", "ূ": "u", "ৃ": "ri", "ে": "e", "ৈ": "oi", "ো": "o", "ৌ": "ou" };
const DIGITS = "০১২৩৪৫৬৭৮৯";
const HALANT = "্";
const NUKTA = "়";

export const hasBengali = (s: string) => /[ঀ-৿]/.test(s);

type Unit = { c: string; vowel: string | null; halant: boolean; cluster: boolean; rcl?: boolean };

/** Converts one run of Bengali (no spaces) to Roman. */
function word(w: string): string {
  // normalise decomposed nukta forms
  w = w.replace(/ড়/g, "ড়").replace(/ঢ়/g, "ঢ়").replace(/য়/g, "য়").replace(/ড়/g, "ড়").replace(/ঢ়/g, "ঢ়").replace(/য়/g, "য়");
  const chars = Array.from(w.replace(/ৰ/g, "র").normalize("NFC")); // precomposed ড় ঢ় য় become consonant + nukta; ো and ৌ stay whole
  const out: string[] = [];
  // Build syllable-ish units: a consonant (or cluster) plus its vowel.
  const units: Unit[] = [];
  let i = 0;
  let pendingCluster = false;
  while (i < chars.length) {
    const ch = chars[i];
    if (CONS[ch]) {
      let roman = CONS[ch];
      let cluster = false;
      i++;
      if (chars[i] === NUKTA) { roman = ch === "ড" ? "r" : ch === "ঢ" ? "rh" : ch === "য" ? "y" : roman; i++; }
      const startsCluster = chars[i] === HALANT && !!chars[i + 1] && !!CONS[chars[i + 1]];
      if (ch === "স" && startsCluster && "তথটঠকখপফ".includes(chars[i + 2] ?? "")) roman = "s"; // stri, skul, steshon (but স্বামী = shami)
      const startedWithR = ch === "র";
      if (pendingCluster) { cluster = true; pendingCluster = false; }
      // conjunct: consonant + halant + consonant ...
      while (chars[i] === HALANT && i + 1 < chars.length && CONS[chars[i + 1]]) {
        const next = chars[i + 1];
        if (next === "য") { // য-ফলা doubles the previous sound (সত্য = shotto); at the start of a word it is "y" (byatha)
          roman = units.length === 0 ? roman + "y" : (roman.length > 1 && roman.endsWith("h") && roman !== "sh" ? roman[0] + roman : roman + roman);
        } else if (next === "ব") { /* ব-ফলা is usually silent: jor, shoshur */ }
        else if (roman === "k" && next === "ষ") { roman = "kkh"; }
        else if (roman === "g" && next === "ঞ") { roman = "gg"; }
        else if (roman === "ng" && next === "গ") { /* ঙ্গ: singara */ }
        else roman += CONS[next];
        cluster = true;
        i += 2;
      }
      const sign = chars[i] && SIGNS[chars[i]];
      if (sign) { units.push({ c: roman, vowel: sign, halant: false, cluster }); i++; }
      else if (chars[i] === HALANT) { units.push({ c: roman, vowel: "", halant: true, cluster }); i++; } // trailing halant: no vowel
      else units.push({ c: roman, vowel: null, halant: false, cluster, rcl: startedWithR && cluster });
    } else if (VOWELS[ch]) { units.push({ c: "", vowel: VOWELS[ch], halant: false, cluster: false }); i++; }
    else if (ch === "ং") { units.push({ c: "ng", vowel: "", halant: true, cluster: false }); i++; }
    else if (ch === "ঁ") { units.push({ c: "n", vowel: "", halant: true, cluster: false }); i++; }
    else if (ch === "ঃ") {
      const nx = chars[i + 1];
      if (nx && CONS[nx]) { pendingCluster = true; const d = CONS[nx]; units.push({ c: d[0] === "k" || d[0] === "g" || d[0] === "p" || d[0] === "t" || d[0] === "d" || d[0] === "b" || d[0] === "c" || d[0] === "j" || d[0] === "s" || d[0] === "m" || d[0] === "n" || d[0] === "r" || d[0] === "l" ? d[0] : "h", vowel: "", halant: true, cluster: false }); }
      else units.push({ c: "h", vowel: "", halant: true, cluster: false });
      i++;
    }
    else if (ch === "র" ) { i++; }
    else if (DIGITS.includes(ch)) { units.push({ c: String(DIGITS.indexOf(ch)), vowel: "", halant: true, cluster: false }); i++; }
    else if (ch === "।") { units.push({ c: ".", vowel: "", halant: true, cluster: false }); i++; }
    else if (ch === "‌" || ch === "‍" || ch === NUKTA) i++;
    else { units.push({ c: ch, vowel: "", halant: true, cluster: false }); i++; }
  }
  // Decide each inherent vowel.
  const hasVowel = (u: Unit | undefined) => !!u && (u.vowel !== null && u.vowel !== "");
  for (let k = 0; k < units.length; k++) {
    const u = units[k];
    let v = u.vowel;
    if (v === null) {
      const last = k === units.length - 1;
      const prev = units[k - 1];
      const next = units[k + 1];
      const prevHasVowel = k > 0 && (hasVowel(prev) || (prev.vowel === null && !prev.halant)); // earlier syllable already has its vowel
      const nextStartsSyllable = !!next && !next.halant && next.c !== "" ;
      const nextVowelOnly = !!next && next.c === "" && next.vowel;
      if (k === 0 && u.c === "by" && !last) v = "a"; // byatha
      else if (last) v = u.cluster && !u.rcl ? "o" : "";                 // a final single consonant has no vowel: kolom, but bhokto
      else if (nextVowelOnly) v = "o";
      else if (k > 0 && prevHasVowel && nextStartsSyllable && !(k + 1 === units.length - 1 && next.vowel === null && !next.cluster)) v = ""; // dekhlen, amra, korchhi
      else v = "o";
    }
    out.push(u.c + v);
  }
  return out.join("");
}

/** Converts any text: Bengali runs become Roman, everything else is kept. */
export function bnToRoman(text: string): string {
  return text.replace(/[ঀ-৿‌‍]+/g, (run) => word(run));
}

// ---------------------------------------------------------------- Sanskrit in Bengali script
// Mantras are chanted the Sanskrit way: every inherent vowel is pronounced (namah, not nomoh), ব is v, and য is y.
const SK_CONS: Record<string, string> = {
  ক: "k", খ: "kh", গ: "g", ঘ: "gh", ঙ: "n", চ: "c", ছ: "chh", জ: "j", ঝ: "jh", ঞ: "n", ট: "t", ঠ: "th", ড: "d", ঢ: "dh", ণ: "n",
  ত: "t", থ: "th", দ: "d", ধ: "dh", ন: "n", প: "p", ফ: "ph", ব: "v", ভ: "bh", ম: "m", য: "y", র: "r", ল: "l", শ: "sh", ষ: "sh", স: "s", হ: "h", ৎ: "t",
};
const SK_VOWELS: Record<string, string> = { অ: "a", আ: "a", ই: "i", ঈ: "i", উ: "u", ঊ: "u", ঋ: "ri", এ: "e", ঐ: "ai", ও: "o", ঔ: "au" };
const SK_SIGNS: Record<string, string> = { "া": "a", "ি": "i", "ী": "i", "ু": "u", "ূ": "u", "ৃ": "ri", "ে": "e", "ৈ": "ai", "ো": "o", "ৌ": "au" };

function skWord(w: string): string {
  const c = Array.from(w.replace(/ৰ/g, "র").replace(/বৃহস্পতি/g, "বরিহস্পতি").normalize("NFC"));
  let out = "";
  for (let i = 0; i < c.length; i++) {
    const ch = c[i];
    if (SK_CONS[ch]) {
      let base = SK_CONS[ch];
      if (c[i + 1] === NUKTA) { base = ch === "ড" ? "r" : ch === "ঢ" ? "rh" : ch === "য" ? "y" : base; i++; }
      if (ch === "ব" && c[i + 1] === HALANT && c[i + 2] === "র") base = "b"; // brahma
      if (ch === "ক" && c[i + 1] === HALANT && c[i + 2] === "ষ") { base = "ksh"; i += 2; }
      else if (ch === "জ" && c[i + 1] === HALANT && c[i + 2] === "ঞ") { base = "jn"; i += 2; }
      if (c[i + 1] === HALANT) { out += base; i++; }
      else if (c[i + 1] && SK_SIGNS[c[i + 1]]) { out += base + SK_SIGNS[c[i + 1]]; i++; }
      else out += base + "a";
    } else if (SK_VOWELS[ch]) out += SK_VOWELS[ch];
    else if (ch === "ং" || ch === "ঁ") out += "m";
    else if (ch === "ঃ") out += "h";
    else if (DIGITS.includes(ch)) out += String(DIGITS.indexOf(ch));
    else if (ch === "ঽ") out += "'";
    else if (ch !== "‌" && ch !== "‍") out += ch;
  }
  return out;
}

/** Roman spelling for Sanskrit text written in Bengali script, as it is chanted. */
export function sanskritRoman(text: string): string {
  return text.replace(/[ঀ-৿‌‍]+/g, (run) => skWord(run)).replace(/।/g, "|").replace(/॥/g, "||");
}
