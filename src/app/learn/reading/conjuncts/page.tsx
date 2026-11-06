import Link from "next/link";
import { CONJ_CATEGORIES, CONJUNCTS } from "@/data/conjuncts";
import { requireAccess } from "@/lib/access";
import LessonFrame from "../../LessonFrame";

export default async function Page() {
  await requireAccess();
  return (
    <LessonFrame lessonId="reading/conj-intro">
      <h1>Conjuncts <span lang="bn">যুক্তাক্ষর</span></h1>
      <p className="lede">A conjunct (যুক্তাক্ষর, juktakkhor) is two or more consonants joined together with no vowel between them, written as one shape. Bengali has many, and you meet them in everyday words: <span lang="bn">বন্ধু</span> (friend), <span lang="bn">প্রশ্ন</span> (question), <span lang="bn">বিজ্ঞান</span> (science).</p>

      <h2>How a conjunct is made</h2>
      <p>A small sign called the hasanta (<span lang="bn">্</span>) cancels the vowel of the first consonant and joins it to the next. So <span lang="bn">ক + ষ</span> becomes <span lang="bn">ক্ষ</span>, and <span lang="bn">দ + ধ</span> becomes <span lang="bn">দ্ধ</span>. You read the letters left to right, with one exception: the repha.</p>

      <h2>Four names to get right</h2>
      <ul className="cj-names">
        <li><b>র-ফলা</b> (ro-fola), as in <span lang="bn">প্র, ক্র, গ্র</span>. The র comes <em>after</em> the consonant and looks like a small stroke attached to the foot of the letter.</li>
        <li><b>রেফ</b> (repha), as in <span lang="bn">র্থ, র্ক, র্ম</span>. The র comes <em>before</em> the consonant. It is said first but written last, as a hook on top.</li>
        <li><b>য-ফলা</b> (yo-fola), as in <span lang="bn">ব্য, ধ্য, ন্য</span>. The য comes <em>after</em> the consonant and looks like a vertical tail.</li>
        <li><b>Everything else</b> is a plain stacked conjunct, with no special name: <span lang="bn">ষ্ট, ণ্ড, দ্ধ, স্ত</span>. Two letters, fused.</li>
      </ul>

      <h2>The groups</h2>
      <p>The conjuncts are grouped by how they are built. Go through the groups in order, or jump to the one you need. At the end, the quiz lets you choose which groups to practice.</p>
      <ul className="pv-list">
        {CONJ_CATEGORIES.map((c) => (
          <li key={c.id}><Link href={`/learn/reading/conjuncts/${c.id}`}>
            <b><span lang="bn">{c.bn}</span> · {c.en}</b>
            <small>{CONJUNCTS.filter((x) => x.cat === c.id).length} conjuncts. {c.blurb.split(". ")[0]}.</small>
          </Link></li>
        ))}
      </ul>
      <p><Link href="/learn/reading/conjuncts/thirsty-crow" className="btn ghost">Conjuncts in a story: The Thirsty Crow</Link> <Link href="/learn/reading/conjuncts/quiz" className="btn">Conjunct quiz</Link></p>
    </LessonFrame>
  );
}
