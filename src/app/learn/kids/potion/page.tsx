import { POTION_COLOURS, POTION_GOAL, resolveRo } from "@/data/kids-games";
import { requireAccess } from "@/lib/access";
import PotionClass from "../wizard/PotionClass";

export default async function Page() {
  await requireAccess();
  return (
    <main className="wide" data-seg="kids">
      <PotionClass colours={resolveRo(POTION_COLOURS)} goal={POTION_GOAL} timers={[20, 30, 45, 0]} />
    </main>
  );
}
