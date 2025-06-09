import { NextRequest } from "next/server";

import { ERROR_MESSAGES } from "@/constants/messages";
import { dbCreateNotebook, dbGetNotebooks } from "@/db/queries/notebooks";
import { getUserSS } from "@/db/supabase/server";
import { notebookSchema } from "@/models/Notebook/schema";
import { Status } from "@/models/types";
import { respondWithError, respondWithUnauthorized } from "@/utils/api/errors";

export const GET = async (req: NextRequest) => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  try {
    const { searchParams } = new URL(req.url);

    const notebooks = await dbGetNotebooks({
      ownerId: user.id,
      name: searchParams.get("name") ?? undefined,
      status: (searchParams.get("status") as Status) ?? undefined,
      limit: parseInt(searchParams.get("limit") || "") ?? undefined,
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
