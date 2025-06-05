import { routes } from "@/constants/routes";
import { getUserSS } from "@/db/supabase/server";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const user = await getUserSS();

  if (user) {
    redirect(routes.notebook());
  }

  return <div>logged out home</div>;
};

export default HomePage;
