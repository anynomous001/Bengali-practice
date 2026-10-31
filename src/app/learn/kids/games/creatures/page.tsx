import { existsSync } from "node:fs";
import { join } from "node:path";
import { CREATURES, resolveRo } from "@/data/kids-games";
import { requireAccess } from "@/lib/access";
import MysteryWizard from "../../wizard/MysteryWizard";

export default async function Page() {
  await requireAccess();
  return (
    <main className="wide" data-seg="kids">
      <MysteryWizard creatures={resolveRo(CREATURES).map((c) => { const f = `/kids/photo/animals-${c.key}.webp`; return existsSync(join(process.cwd(), "public", f)) ? { ...c, photo: f } : c; })} />
    </main>
  );
}
