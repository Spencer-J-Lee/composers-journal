import { ERROR_MESSAGES } from "@/constants/messages";
import { dbGetEntryMetrics } from "@/db/queries/entries/get";
import { getUserSS } from "@/db/supabase/server/helpers";
import {
  respondWithError,
  respondWithUnauthorized,
} from "@/utils/server/errors";

export const GET = async () => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  try {
    const metrics = await dbGetEntryMetrics({
      ownerId: user.id,
    });

    return new Response(JSON.stringify(metrics), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.FETCH.ENTRY_METRICS,
      devMsg: ERROR_MESSAGES.DEV.FETCH.ENTRY_METRICS,
      err,
    });
  }
};
