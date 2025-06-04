import { redirect } from "next/navigation";

import { Navbar } from "@/components/Navbar";
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

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default GuestLayout;
