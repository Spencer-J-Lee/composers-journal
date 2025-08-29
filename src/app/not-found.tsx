import { getUserSS } from "@/db/supabase/server/helpers";
import { GuestNotFoundContent } from "@/modules/notFound/GuestNotFoundContent";
import { ProtectedNotFoundContent } from "@/modules/notFound/ProtectedNotFoundContent";

const NotFound = async () => {
  const user = await getUserSS();
  return user ? <ProtectedNotFoundContent /> : <GuestNotFoundContent />;
};

export default NotFound;
