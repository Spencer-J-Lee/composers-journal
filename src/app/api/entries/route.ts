import { NextRequest } from "next/server";

import { ERROR_MESSAGES } from "@/constants/messages";
import { dbCreateEntry, dbGetEntries } from "@/db/queries/entries";
import { getUserSS } from "@/db/supabase/server";
import { entrySchema } from "@/models/Entry/schema";
import { Status } from "@/models/types/status";
import { limitSchema } from "@/schemas/limitSchema";
import { respondWithError, respondWithUnauthorized } from "@/utils/api/errors";

import {
  getQueryInt,
  getQueryValue,
} from "../../../services/utils/searchParamsGetters";

export const GET = async (req: NextRequest) => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  try {
    const { searchParams } = new URL(req.url);

    const params = {
      status: getQueryValue<Status>(searchParams, "status"),
      notebookId: getQueryInt(searchParams, "notebookId"),
      limit: getQueryInt(searchParams, "limit"),
    };

    const schema = entrySchema
      .pick({
        status: true,
        notebookId: true,
      })
      .merge(limitSchema)
      .partial({
        status: true,
        notebookId: true,
        limit: true,
      });
    const safeParams = schema.safeParse(params);

    const entries = await dbGetEntries({
      ownerId: user.id,
      ...safeParams,
    });

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
      notebookId: true,
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
      notebookId: res.data?.notebookId,
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
