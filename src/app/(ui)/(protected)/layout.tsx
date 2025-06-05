import { redirect } from "next/navigation";

import { Sidebar } from "@/components/Sidebar";
import { ELEMENT_IDS } from "@/constants/elementIds";
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
      <main
        id={ELEMENT_IDS.MAIN_CONTENT}
        className="bg-background-light flex-1"
      >
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
