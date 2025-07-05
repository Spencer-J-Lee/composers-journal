import { NextRequest } from "next/server";

import { ERROR_MESSAGES } from "@/constants/messages";
import { dbCreateEntry } from "@/db/queries/entries/create";
import { dbGetEntries } from "@/db/queries/entries/get";
import { dbUpdateEntry } from "@/db/queries/entries/update";
import { entries as entriesTable } from "@/db/schema";
import { getUserSS } from "@/db/supabase/server/helpers";
import { entrySchema } from "@/models/Entry/schema";
import { commonApiParamsSchema } from "@/schemas/commonApiParamsSchema";
import { OrderBy } from "@/types/query";
import {
  respondWithError,
  respondWithInvalidInfoError,
  respondWithInvalidJsonError,
  respondWithMissingPayloadError,
  respondWithUnauthorized,
} from "@/utils/server/errors";

export const GET = async (req: NextRequest) => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  const payloadStr = req.nextUrl.searchParams.get("payload");
  if (!payloadStr) {
    return respondWithMissingPayloadError();
  }

  let payload;
  try {
    payload = JSON.parse(payloadStr);
  } catch (e) {
    return respondWithInvalidJsonError(e);
  }

  try {
    const schema = entrySchema
      .pick({
        status: true,
        notebookId: true,
      })
      .partial({
        status: true,
        notebookId: true,
      })
      .merge(commonApiParamsSchema);

    const safeParams = schema.safeParse(payload);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const { orderBy, ...rest } = safeParams.data;
    const entries = await dbGetEntries({
      ownerId: user.id,
      orderBy: orderBy as OrderBy<typeof entriesTable>,
      ...rest,
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
    const safeParams = schema.safeParse(body);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const entry = await dbCreateEntry({
      ownerId: user.id,
      ...safeParams.data,
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

export const PATCH = async (req: NextRequest) => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  try {
    const body = await req.json();

    const schema = entrySchema
      .pick({
        id: true,
        title: true,
        description: true,
        status: true,
        notebookId: true,
      })
      .partial({
        title: true,
        description: true,
        status: true,
        notebookId: true,
      });
    const safeParams = schema.safeParse(body);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const entry = await dbUpdateEntry(safeParams.data);

    return new Response(JSON.stringify(entry), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.UPDATE.ENTRY,
      devMsg: ERROR_MESSAGES.DEV.UPDATE.ENTRY,
      err,
    });
  }
};
