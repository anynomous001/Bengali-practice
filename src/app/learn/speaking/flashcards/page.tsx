import FlashcardsView from "../../FlashcardsView";

export default async function Page({ searchParams }: { searchParams: Promise<{ deck?: string }> }) {
  return <FlashcardsView segment="speaking" deckId={(await searchParams).deck} />;
}
