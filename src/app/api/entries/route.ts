import { NextRequest } from "next/server";

import { ERROR_MESSAGES } from "@/constants/messages";
import { dbCreateEntry, dbGetEntries } from "@/db/queries/entries";
import { getUserSS } from "@/db/supabase/server";
import { entrySchema } from "@/models/Entry/schema";
import { respondWithError, respondWithUnauthorized } from "@/utils/api/errors";

export const GET = async () => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  try {
    const entries = await dbGetEntries(user.id);

    return new Response(JSON.stringify(entries), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.FETCH.ENTRIES,
      devMsg: ERROR_MESSAGES.DEV.FETCH.ENTRIES,
      err,
    });
  }
};

export const POST = async (req: NextRequest) => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  try {
    const body = await req.json();

    const schema = entrySchema.pick({
      title: true,
      description: true,
      status: true,
    });
    const res = schema.safeParse(body);

    if (!res.success) {
      const fieldErrs = res.error.flatten().fieldErrors;

      return respondWithError({
        status: 400,
        userMsg: ERROR_MESSAGES.USER.INVALID_INFO,
        devMsg: ERROR_MESSAGES.DEV.INVALID_INFO,
        err: fieldErrs,
        resData: { fields: fieldErrs },
      });
    }

    const entry = await dbCreateEntry({
      ownerId: user.id,
      title: res.data?.title,
      description: res.data?.description,
      status: res.data?.status,
    });

    return new Response(JSON.stringify(entry), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.CREATE.ENTRY,
      devMsg: ERROR_MESSAGES.DEV.CREATE.ENTRY,
      err,
    });
  }
};
