import { ERROR_MESSAGES } from "@/constants/messages";
import { getUserSS } from "@/db/supabase/server";
import { getEntriesByUserId } from "@/services/entries";

export async function GET(req: Request) {
  const user = await getUserSS();

  if (!user) {
    console.error(ERROR_MESSAGES.DEV.UNAUTHORIZED);
    return new Response(ERROR_MESSAGES.USER.UNAUTHORIZED, { status: 401 });
  }

  try {
    const entries = await getEntriesByUserId(user.id);

    return new Response(JSON.stringify(entries), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(ERROR_MESSAGES.DEV.FETCH.ENTRIES, err);
    return new Response(ERROR_MESSAGES.USER.INTERNAL_SERVER_ERROR, {
      status: 500,
    });
  }
}
