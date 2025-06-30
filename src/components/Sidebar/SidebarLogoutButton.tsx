import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

import { ERROR_MESSAGES } from "@/constants/messages";
import { routes } from "@/constants/routes";
import { createClientCS } from "@/db/supabase/client";
import { showErrorToast } from "@/utils/client/toasts";

import { IconButton } from "../iconButtons/IconButton";

export const SidebarLogoutButton = () => {
  const supabase = createClientCS();
  const router = useRouter();

  return (
    <IconButton
      faIcon={faRightFromBracket}
      textVariant="negative"
      onClick={async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
          console.error(error);
          showErrorToast(ERROR_MESSAGES.USER.TRY_AGAIN_LATER);
        } else {
          router.push(routes.login());
        }
      }}
    >
      Log Out
    </IconButton>
  );
};
