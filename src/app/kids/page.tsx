import Link from "next/link";
import { KID_TOPICS } from "@/data/kids";
import { requireAccess } from "@/lib/access";
import TileStars from "./TileStars";
import KidEnglish from "./KidEnglish";

export default async function KidsHome() {
  await requireAccess();
  return (
    <>
      <h1 className="k-title" lang="bn">কী শিখবে?</h1>
      <p className="k-sub">Pick one to play</p>
      <div className="k-tiles">
        {KID_TOPICS.map((t) => (
          <Link key={t.id} href={`/kids/${t.id}`} className={`k-tile tone-${t.tone}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/kids/pic/${t.pic}.svg`} alt="" width={96} height={96} />
            <span className="k-tile-bn" lang="bn">{t.bn}</span>
            <KidEnglish className="k-tile-en">{t.en}</KidEnglish>
            <TileStars topic={t.id} />
          </Link>
        ))}
      </div>
    </>
  );
}
