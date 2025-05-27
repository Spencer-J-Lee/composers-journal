import { redirect } from "next/navigation";

import { routes } from "@/constants/routes";
import { getUserSS } from "@/db/supabase/server/helpers";

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
