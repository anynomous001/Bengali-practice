// One price, two currencies. The price is set in US dollars (PRICE_USD). Students in India are shown the same price in
// rupees, converted at the current exchange rate, so nobody has to maintain a second number.

export const priceUsd = () => Number(process.env.PRICE_USD ?? 50);
export type Currency = "USD" | "INR";
export const parseCurrency = (v: unknown): Currency => (v === "INR" ? "INR" : "USD");

// Used only when the live rate cannot be fetched. Set USD_INR_RATE in Vercel to change it.
const FALLBACK_RATE = Number(process.env.USD_INR_RATE) || 90;

/** Rupees per US dollar from the European Central Bank's published rates, cached for six hours. */
export async function usdInrRate(): Promise<{ rate: number; live: boolean }> {
  try {
    const res = await fetch("https://api.frankfurter.dev/v1/latest?base=USD&symbols=INR", { next: { revalidate: 6 * 3600 }, signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const rate = Number(((await res.json()) as { rates?: { INR?: number } }).rates?.INR);
      if (rate > 50 && rate < 200) return { rate, live: true }; // ignore nonsense
    }
  } catch {
    /* use the fallback below */
  }
  return { rate: FALLBACK_RATE, live: false };
}

/** The price in rupees: PRICE_INR if you fix it by hand, otherwise the dollar price at today's rate, rounded to the nearest 10. */
export async function priceInr(): Promise<{ amount: number; rate: number; fixed: boolean }> {
  const fixed = Number(process.env.PRICE_INR) || 0;
  const { rate } = await usdInrRate();
  return fixed ? { amount: fixed, rate: fixed / priceUsd(), fixed: true } : { amount: Math.round((priceUsd() * rate) / 10) * 10, rate, fixed: false };
}

/** Which currency to show first. Vercel adds the visitor's country to every request. */
export const defaultCurrency = (country: string | null | undefined): Currency => (country?.toUpperCase() === "IN" ? "INR" : "USD");
