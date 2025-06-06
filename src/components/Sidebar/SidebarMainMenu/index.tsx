import {
  faMagnifyingGlass,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import { routes } from "@/constants/routes";

import { CollectionsAccordionMenu } from "./CollectionsAccordionMenu";
import { SidebarLinkButton } from "../SidebarLinkButton";
import { SidebarMenuContainer } from "../SidebarMenuContainer";

export const SidebarMainMenu = () => {
  return (
    <SidebarMenuContainer className="flex-1 overflow-y-auto overscroll-contain">
      <li>
        <CollectionsAccordionMenu />
      </li>
      <li>
        <SidebarLinkButton href={routes.search()} faIcon={faMagnifyingGlass}>
          Search
        </SidebarLinkButton>
      </li>
      <li>
        <SidebarLinkButton href={routes.trash()} faIcon={faTrashCan}>
          Trash
        </SidebarLinkButton>
      </li>
    </SidebarMenuContainer>
  );
};
