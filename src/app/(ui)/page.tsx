import { redirect } from "next/navigation";

import { routes } from "@/constants/routes";
import { getUserSS } from "@/db/supabase/server";

const HomePage = async () => {
  const user = await getUserSS();

  if (user) {
    redirect(routes.notebook());
  }

  return <div>logged out home</div>;
};

export default HomePage;
