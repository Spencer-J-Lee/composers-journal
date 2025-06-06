import { redirect } from "next/navigation";

import { Navbar } from "@/components/Navbar";
import { DEFAULT_PROTECTED_ROUTE } from "@/constants/routes/constants";
import { getUserSS } from "@/db/supabase/server/helpers";

const GuestLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getUserSS();

  if (user) {
    redirect(DEFAULT_PROTECTED_ROUTE);
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default GuestLayout;
