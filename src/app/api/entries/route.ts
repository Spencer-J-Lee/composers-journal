import { ERROR_MESSAGES } from "@/constants/messages";
import { getSessionSS } from "@/lib/db/supabase/server";
import { getEntriesByUserId } from "@/lib/services/entries";

export async function GET(req: Request) {
  const session = await getSessionSS();

  if (!session) {
    return new Response(ERROR_MESSAGES.UNAUTHORIZED, { status: 401 });
  }

  try {
    const entries = await getEntriesByUserId(session.user.id);

    return new Response(JSON.stringify(entries), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to fetch entries:", err);
    return new Response(ERROR_MESSAGES.INTERNAL_SERVER_ERROR, { status: 500 });
  }
}
