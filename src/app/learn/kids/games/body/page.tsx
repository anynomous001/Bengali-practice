import { BODY_COMMANDS, BODY_ORDER, BODY_PARTS, resolveRo } from "@/data/kids-games";
import { requireAccess } from "@/lib/access";
import BodyCheck from "../../wizard/BodyCheck";

export default async function Page() {
  await requireAccess();
  return (
    <main className="wide" data-seg="kids">
      <BodyCheck parts={resolveRo(BODY_PARTS)} order={BODY_ORDER} commands={resolveRo(BODY_COMMANDS)} />
    </main>
  );
}
