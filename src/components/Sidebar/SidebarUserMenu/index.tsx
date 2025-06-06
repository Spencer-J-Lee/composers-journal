import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";

import { SidebarLogoutButton } from "@/components/Sidebar/SidebarLogoutButton";
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
      <li className="flex gap-x-1">
        <SidebarLinkButton
          faIcon={faUser}
          href={routes.profile()}
          className="flex-1"
        >
          Profile
        </SidebarLinkButton>
        <SidebarLogoutButton />
      </li>
    </SidebarMenuContainer>
  );
};
