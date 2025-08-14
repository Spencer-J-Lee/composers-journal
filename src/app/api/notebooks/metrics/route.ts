import { ERROR_MESSAGES } from "@/constants/messages";
import { dbGetNotebookMetrics } from "@/db/queries/notebooks/get";
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
    const metrics = await dbGetNotebookMetrics({
      ownerId: user.id,
    });

    return new Response(JSON.stringify(metrics), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.FETCH.NOTEBOOK_METRICS,
      devMsg: ERROR_MESSAGES.DEV.FETCH.NOTEBOOK_METRICS,
      err,
    });
  }
};
