/** Lists lesson ids in src/data/paths.ts that do not exist in the curriculum. Run: npm run check:paths */
import { GOALS } from "../src/data/paths";
import { isLessonId } from "../src/data/curriculum";

let bad = 0, total = 0;
for (const g of GOALS) for (const s of g.stages) for (const st of s.steps) {
  total++;
  if (!isLessonId(st.id)) { bad++; console.log(`missing: ${g.id} / ${s.title} / ${st.id}`); }
}
console.log(`${GOALS.length} goals, ${total} steps, ${bad} missing`);
process.exit(bad ? 1 : 0);
