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

    const notebooks = await dbGetNotebooks({
      ownerId: user.id,
      ...safeParams,
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

    const notebook = await dbCreateNotebook({
      ownerId: user.id,
      name: res.data?.name,
      status: res.data?.status,
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

    const result = schema.safeParse(body);

    if (!result.success) {
      return respondWithInvalidInfoError(result.error);
    }

    const notebook = await dbUpdateNotebook({
      id: result.data?.id,
      name: result.data?.name,
      status: result.data?.status,
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
    const result = schema.safeParse(body);

    if (!result.success) {
      return respondWithInvalidInfoError(result.error);
    }

    await dbDeleteNotebooks({
      ids: result.data?.ids,
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
