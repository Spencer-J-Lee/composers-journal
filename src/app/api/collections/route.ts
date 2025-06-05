import { DEFAULT_ERROR_MSG, ERROR_MESSAGES } from "@/constants/messages";
import { dbCreateCollection, dbGetCollections } from "@/db/queries/collections";
import { getUserSS } from "@/db/supabase/server";
import { collectionSchema } from "@/models/Collection/schema";
import { respondWithError, respondWithUnauthorized } from "@/utils/api/errors";

export const GET = async () => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  try {
    const collections = await dbGetCollections(user.id);

    return new Response(JSON.stringify(collections), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.FETCH.COLLECTIONS,
      devMsg: ERROR_MESSAGES.DEV.FETCH.COLLECTIONS,
      err,
    });
  }
};

export const POST = async (req: Request) => {
  const user = await getUserSS();
  if (!user) {
    return respondWithUnauthorized();
  }

  try {
    const body = await req.json();

    const schema = collectionSchema.pick({
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

    const collection = await dbCreateCollection({
      ownerId: user.id,
      name: res.data?.name,
      status: res.data?.status,
    });

    return new Response(JSON.stringify(collection), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return respondWithError({
      status: 500,
      userMsg: ERROR_MESSAGES.USER.CREATE.COLLECTION,
      devMsg: ERROR_MESSAGES.DEV.CREATE.COLLECTION,
      err,
    });
  }
};
