import { COMMANDS } from "@/data/commands-game";
import { requireAccess } from "@/lib/access";
import CommandMatch from "../../wizard/CommandMatch";

export default async function Page() {
  await requireAccess();
  const commands = COMMANDS.map((c) => ({ id: c.id, bn: c.bn, ro: c.ro, en: c.en, alt: c.alt, image: c.image ?? `/assets/commands/${c.id}.webp`, audio: c.audio ?? `/assets/audio/${c.id}.mp3` }));
  return (
    <main className="wide" data-seg="kids">
      <CommandMatch commands={commands} />
    </main>
  );
}
