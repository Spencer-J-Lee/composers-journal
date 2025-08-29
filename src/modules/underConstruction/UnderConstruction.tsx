import { getUserSS } from "@/db/supabase/server/helpers";

import { GuestUnderConstructionPage } from "./GuestUnderConstructionPage";
import { ProtectedUnderConstructionPage } from "./ProtectedUnderConstructionPage";

export const UnderConstructionPage = async () => {
  const user = await getUserSS();

  return user ? (
    <ProtectedUnderConstructionPage />
  ) : (
    <GuestUnderConstructionPage />
  );
};
