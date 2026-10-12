import FlashcardsView from "../../FlashcardsView";

export default async function Page({ searchParams }: { searchParams: Promise<{ deck?: string }> }) {
  return <FlashcardsView segment="writing" deckId={(await searchParams).deck} />;
}
