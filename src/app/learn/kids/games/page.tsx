import Link from "next/link";
import { requireAccess } from "@/lib/access";
import "../wizard/wizard.css";

const GAMES = [
  { href: "/learn/kids/games/body", pic: "1f9d9", en: "Wizard Body Check", bn: "শরীরের জাদু", line: "Learn your body words and cast body spells" },
  { href: "/learn/kids/games/potion", pic: "1f9ea", en: "Potion Class", bn: "জাদুর শরবত", line: "Roll the colour dice and brew a potion" },
  { href: "/learn/kids/games/creatures", pic: "1f52e", en: "Mystery Wizard", bn: "জাদুর প্রাণী", line: "Guess the creature behind the magic curtain" },
];

export default async function KidsHome() {
  await requireAccess();
  return (
    <main className="wide" data-seg="kids">
      <div className="wiz">
        <Link href="/learn/kids" className="wiz-back">← Kids</Link>
        <h1>🪄 Spell School <small lang="bn">ছোটদের</small></h1>
        <p className="wz-lede">Listen first, act it out, say it later. Each game starts with a Bengali word he hears, and he shows he understood.</p>
        <div className="wz-tiles">
          {GAMES.map((g) => (
            <Link key={g.href} href={g.href} className="wz-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/kids/pic/${g.pic}.svg`} alt="" width={64} height={64} />
              <b>{g.en}</b><span lang="bn">{g.bn}</span><small>{g.line}</small>
            </Link>
          ))}
        </div>
        <div className="wz-note">
          <h2>For teachers and parents</h2>
          <p style={{ margin: 0 }}>Say each word aloud, let the child answer with his body (pointing, acting, fetching), then click. Switching off English, romanization and then showing words at all (Listening mode) makes each game harder step by step. Stars are kept for each game; ten stars ends a round.</p>
        </div>
      </div>
    </main>
  );
}
