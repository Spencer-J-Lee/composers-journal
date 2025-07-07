import { NextRequest } from "next/server";

import { ERROR_MESSAGES } from "@/constants/messages";
import { dbCreateSavedItem } from "@/db/queries/savedItems/create";
import { dbDeleteSavedItem } from "@/db/queries/savedItems/delete";
import { getUserSS } from "@/db/supabase/server/helpers";
import { savedItemSchema } from "@/models/SavedItem/schema";
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

    const schema = savedItemSchema.pick({
      entryId: true,
    });
    const safeParams = schema.safeParse(body);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const savedItem = await dbCreateSavedItem({
      ownerId: user.id,
      ...safeParams.data,
    });

    return new Response(JSON.stringify(savedItem), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.CREATE.SAVED_ITEM.ENTRY,
      devMsg: ERROR_MESSAGES.DEV.CREATE.SAVED_ITEM.ENTRY,
      err,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  try {
    const body = await req.json();

    const schema = savedItemSchema.pick({
      entryId: true,
    });
    const safeParams = schema.safeParse(body);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const savedItem = await dbDeleteSavedItem(safeParams.data);

    return new Response(JSON.stringify(savedItem), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.DELETE.SAVED_ITEM.ENTRY,
      devMsg: ERROR_MESSAGES.DEV.DELETE.SAVED_ITEM.ENTRY,
      err,
    });
  }
};
