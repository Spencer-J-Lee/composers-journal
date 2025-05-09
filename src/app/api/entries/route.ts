import { getEntriesByUserId } from "@/lib/api/entries";

export async function GET(req: Request) {
  const entries = await getEntriesByUserId(1); // TODO Replace with real user ID logic

  return new Response(JSON.stringify(entries), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
