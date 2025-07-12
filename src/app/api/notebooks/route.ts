import { NextRequest } from "next/server";

import { ERROR_MESSAGES } from "@/constants/messages";
import { dbCreateNotebook } from "@/db/queries/notebooks/create";
import { dbDeleteNotebooks } from "@/db/queries/notebooks/delete";
import { dbGetNotebooks } from "@/db/queries/notebooks/get";
import { dbUpdateNotebooks } from "@/db/queries/notebooks/update";
import { notebooks as notebooksTable } from "@/db/schema";
import { getUserSS } from "@/db/supabase/server/helpers";
import { notebookSchema } from "@/models/Notebook/schema";
import { commonApiParamsSchema } from "@/schemas/commonApiParamsSchema";
import { idsOptionalSchema, idsSchema } from "@/schemas/idsSchema";
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
    const schema = notebookSchema
      .pick({
        name: true,
        status: true,
      })
      .partial({
        name: true,
        status: true,
      })
      .merge(commonApiParamsSchema)
      .merge(idsOptionalSchema);

    const safeParams = schema.safeParse(payload);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const { orderBy, ...rest } = safeParams.data;
    const notebooks = await dbGetNotebooks({
      ownerId: user.id,
      orderBy: orderBy as OrderBy<typeof notebooksTable>,
      ...rest,
    });

    return new Response(JSON.stringify(notebooks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.FETCH.NOTEBOOKS,
      devMsg: ERROR_MESSAGES.DEV.FETCH.NOTEBOOKS,
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

    const schema = notebookSchema.pick({
      name: true,
      status: true,
    });
    const safeParams = schema.safeParse(body);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const notebook = await dbCreateNotebook({
      ownerId: user.id,
      ...safeParams.data,
    });

    return new Response(JSON.stringify(notebook), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.CREATE.NOTEBOOK,
      devMsg: ERROR_MESSAGES.DEV.CREATE.NOTEBOOK,
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

    const schema = notebookSchema
      .pick({
        name: true,
        status: true,
      })
      .partial({ name: true, status: true })
      .merge(idsSchema);

    const safeParams = schema.safeParse(body);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const notebooks = await dbUpdateNotebooks({
      ...safeParams.data,
    });

    return new Response(JSON.stringify(notebooks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.UPDATE.NOTEBOOKS,
      devMsg: ERROR_MESSAGES.DEV.UPDATE.NOTEBOOKS,
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

    const safeParams = idsSchema.safeParse(body);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    await dbDeleteNotebooks(safeParams.data);

    return new Response(null, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.DELETE.NOTEBOOK,
      devMsg: ERROR_MESSAGES.DEV.DELETE.NOTEBOOK,
      err,
    });
  }
};
