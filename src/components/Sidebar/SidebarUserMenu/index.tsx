import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";

import { routes } from "@/constants/routes";

import { SidebarLinkButton } from "../SidebarLinkButton";
import { SidebarMenuContainer } from "../SidebarMenuContainer";

export const SidebarUserMenu = () => {
  return (
    <SidebarMenuContainer>
      <li>
        <SidebarLinkButton faIcon={faGear} href={routes.settings()}>
          Settings
        </SidebarLinkButton>
      </li>
      <li>
        <SidebarLinkButton faIcon={faUser} href={routes.profile()}>
          Profile
        </SidebarLinkButton>
      </li>
    </SidebarMenuContainer>
  );
};
