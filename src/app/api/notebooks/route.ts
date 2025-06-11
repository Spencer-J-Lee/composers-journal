import { NextRequest } from "next/server";
import { z } from "zod";

import { ERROR_MESSAGES } from "@/constants/messages";
import {
  dbCreateNotebook,
  dbGetNotebooks,
  dbUpdateNotebook,
} from "@/db/queries/notebooks";
import { dbDeleteNotebooks } from "@/db/queries/notebooks/delete";
import { getUserSS } from "@/db/supabase/server";
import { notebookSchema } from "@/models/Notebook/schema";
import { Status } from "@/models/types/status";
import { limitSchema } from "@/schemas/limitSchema";
import {
  getQueryInt,
  getQueryString,
  getQueryValue,
} from "@/services/utils/searchParamsGetters";
import {
  respondWithError,
  respondWithInvalidInfoError,
  respondWithUnauthorized,
} from "@/utils/api/errors";

export const GET = async (req: NextRequest) => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  try {
    const { searchParams } = new URL(req.url);
    const params = {
      name: getQueryString(searchParams, "name"),
      status: getQueryValue<Status>(searchParams, "status"),
      limit: getQueryInt(searchParams, "limit"),
    };

    const schema = notebookSchema
      .pick({
        name: true,
        status: true,
      })
      .merge(limitSchema)
      .partial({
        name: true,
        status: true,
        limit: true,
      });
    const safeParams = schema.safeParse(params);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const notebooks = await dbGetNotebooks({
      ownerId: user.id,
      ...safeParams.data,
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
      name: safeParams.data?.name,
      status: safeParams.data?.status,
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
        id: true,
        name: true,
        status: true,
      })
      .partial({ name: true, status: true });
    const safeParams = schema.safeParse(body);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const notebook = await dbUpdateNotebook({
      id: safeParams.data?.id,
      name: safeParams.data?.name,
      status: safeParams.data?.status,
    });

    return new Response(JSON.stringify(notebook), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.UPDATE.NOTEBOOK,
      devMsg: ERROR_MESSAGES.DEV.UPDATE.NOTEBOOK,
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

    const schema = z.object({
      ids: z.array(z.number()),
    });
    const safeParams = schema.safeParse(body);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    await dbDeleteNotebooks({
      ids: safeParams.data?.ids,
    });

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
