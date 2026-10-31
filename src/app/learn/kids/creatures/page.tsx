import { CREATURES, resolveRo } from "@/data/kids-games";
import { requireAccess } from "@/lib/access";
import MysteryWizard from "../wizard/MysteryWizard";

export default async function Page() {
  await requireAccess();
  return (
    <main className="wide" data-seg="kids">
      <MysteryWizard creatures={resolveRo(CREATURES)} />
    </main>
  );
}
