import { NextRequest } from "next/server";
import { z } from "zod";

import { ERROR_MESSAGES } from "@/constants/messages";
import { dbCreateEntryTags } from "@/db/queries/entryTags/create";
import { getUserSS } from "@/db/supabase/server/helpers";
import { entryTagSchema } from "@/models/EntryTag/schema";
import {
  respondWithError,
  respondWithInvalidInfoError,
  respondWithUnauthorized,
} from "@/utils/server/errors";

export const POST = async (req: NextRequest) => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  try {
    const body = await req.json();

    const schema = z.array(
      entryTagSchema.pick({
        entryId: true,
        tagId: true,
      }),
    );
    const safeParams = schema.safeParse(body);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const entryTags = await dbCreateEntryTags(safeParams.data);

    return new Response(JSON.stringify(entryTags), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.CREATE.ENTRY_TAGS,
      devMsg: ERROR_MESSAGES.DEV.CREATE.ENTRY_TAGS,
      err,
    });
  }
};
