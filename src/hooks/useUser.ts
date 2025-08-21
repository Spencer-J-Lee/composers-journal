import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

import { getUserCS } from "@/db/supabase/client/helpers";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    getUserCS().then((user) => {
      setUser(user);
      setIsPending(false);
    });
  }, []);

  return {
    user,
    isPending,
  };
};
