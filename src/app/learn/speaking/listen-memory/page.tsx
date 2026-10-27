import { redirect } from "next/navigation";

// This activity now lives in the Listening section.
export default function Page() {
  redirect("/learn/listening/memory");
}
