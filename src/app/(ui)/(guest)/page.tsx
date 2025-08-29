import { redirect } from "next/navigation";

import { DEFAULT_PROTECTED_ROUTE } from "@/constants/routes/constants";
import { getUserSS } from "@/db/supabase/server/helpers";
import { UnderConstructionPage } from "@/modules/underConstruction/UnderConstruction";

const HomePage = async () => {
  const user = await getUserSS();

  if (user) {
    redirect(DEFAULT_PROTECTED_ROUTE);
  }

  return <UnderConstructionPage />;
};

export default HomePage;
