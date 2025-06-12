import { redirect } from "next/navigation";

import { WorkspacePageWrapper } from "@/components/pageWrappers/WorkspacePageWrapper";
import { Sidebar } from "@/components/Sidebar";
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

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <WorkspacePageWrapper>{children}</WorkspacePageWrapper>
    </div>
  );
};

export default ProtectedLayout;
