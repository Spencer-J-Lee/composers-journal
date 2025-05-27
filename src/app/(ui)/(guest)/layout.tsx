import { redirect } from "next/navigation";

import { getUserSS } from "@/db/supabase/server/helpers";
import { routes } from "@/constants/routes";

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
