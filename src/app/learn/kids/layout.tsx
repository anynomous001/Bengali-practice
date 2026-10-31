import { Fredoka } from "next/font/google";

const fredoka = Fredoka({ subsets: ["latin"], display: "swap", variable: "--f-fredoka" });

export default function KidsLayout({ children }: { children: React.ReactNode }) {
  return <div className={fredoka.variable}>{children}</div>;
}
