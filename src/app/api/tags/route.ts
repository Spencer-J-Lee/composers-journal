import { NextRequest } from "next/server";

import { ERROR_MESSAGES } from "@/constants/messages";
import { dbGetTags } from "@/db/queries/tags/get";
import { tags as tagsTable } from "@/db/schema";
import { getUserSS } from "@/db/supabase/server/helpers";
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
    const schema = commonApiParamsSchema;

    const safeParams = schema.safeParse(payload);
    if (!safeParams.success) {
      return respondWithInvalidInfoError(safeParams.error);
    }

    const { orderBy, ...rest } = safeParams.data;
    const tags = await dbGetTags({
      ownerId: user.id,
      orderBy: orderBy as OrderBy<typeof tagsTable>,
      ...rest,
    });

    return new Response(JSON.stringify(tags), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.FETCH.TAGS,
      devMsg: ERROR_MESSAGES.DEV.FETCH.TAGS,
      err,
    });
  }
};

// export const POST = async (req: NextRequest) => {
//   const user = await getUserSS();
//   if (!user) {
//     return respondWithUnauthorized();
//   }

//   try {
//     const body = await req.json();

//     const schema = entrySchema.pick({
//       notebookId: true,
//       title: true,
//       description: true,
//       status: true,
//     });
//     const safeParams = schema.safeParse(body);
//     if (!safeParams.success) {
//       return respondWithInvalidInfoError(safeParams.error);
//     }

//     const entry = await dbCreateEntry({
//       ownerId: user.id,
//       ...safeParams.data,
//     });

//     return new Response(JSON.stringify(entry), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     return respondWithError({
//       status: 500,
//       userMsg: ERROR_MESSAGES.USER.CREATE.ENTRY,
//       devMsg: ERROR_MESSAGES.DEV.CREATE.ENTRY,
//       err,
//     });
//   }
// };
