import { redirect } from "next/navigation";

import { DEFAULT_PROTECTED_ROUTE } from "@/constants/routes/constants";
import { getUserSS } from "@/db/supabase/server";

const HomePage = async () => {
  const user = await getUserSS();

  if (user) {
    redirect(DEFAULT_PROTECTED_ROUTE);
  }

  return <div>logged out home</div>;
};

export default HomePage;
