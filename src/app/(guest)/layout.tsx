import { redirect } from "next/navigation";

import { getUserSS } from "@/lib/db/supabase/server/helpers";
import { routes } from "@/routes/routes";

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
