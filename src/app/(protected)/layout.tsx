import { redirect } from "next/navigation";

import { getUserSS } from "@/lib/db/supabase/server/helpers";
import { routes } from "@/routes/routes";

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getUserSS();

  if (!user) {
    redirect(routes.login());
  }

  return <>{children}</>;
};

export default ProtectedLayout;
