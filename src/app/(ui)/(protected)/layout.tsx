import { redirect } from "next/navigation";

import { getUserSS } from "@/db/supabase/server/helpers";
import { routes } from "@/constants/routes";

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
