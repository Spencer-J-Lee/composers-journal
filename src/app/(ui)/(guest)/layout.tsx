import { redirect } from "next/navigation";

import { routes } from "@/constants/routes";
import { getUserSS } from "@/db/supabase/server/helpers";

const GuestLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getUserSS();

  if (user) {
    redirect(routes.search());
  }

  return <>{children}</>;
};

export default GuestLayout;
