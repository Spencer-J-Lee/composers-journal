"use client";

import { useState } from "react";
import {
  faBook,
  faChevronDown,
  faChevronUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Collapsible } from "@/components/Collapsible";
import { routes } from "@/constants/routes";
import { useActiveNotebooks } from "@/hooks/cache/notebooks";

import { TreeBranch } from "./TreeBranch";
import { IconButton } from "../../../iconButtons/IconButton";
import { SidebarLinkButton } from "../../SidebarLinkButton";
import { SidebarLinkIconButton } from "../../SidebarLinkIconButton";

export const NotebooksAccordionMenu = () => {
  const { data, isPending } = useActiveNotebooks();
  const [show, setShow] = useState(true);

  // TODO: handle loading UI
  if (isPending) return "Loading...";

  return (
    <div>
      <div className="flex gap-x-1">
        <SidebarLinkButton
          href={routes.notebooks()}
          faIcon={faBook}
          className="flex-1"
        >
          Notebooks
        </SidebarLinkButton>
        <SidebarLinkIconButton href={routes.notebookCreate()} faIcon={faPlus} />
        {!!data?.length && (
          <IconButton
            faIcon={show ? faChevronUp : faChevronDown}
            onClick={() => setShow((prev) => !prev)}
          />
        )}
      </div>

      {!!data?.length && (
        <Collapsible show={show}>
          <ul className="space-y-1.5 pt-1.5">
            {data.map((notebook, i) => (
              <li key={notebook.name} className="flex items-center">
                <TreeBranch
                  variant={i === data.length - 1 ? "bottom" : "middle"}
                  className="-my-2 ml-5"
                  flexChild
                />

                <div className="flex flex-1 gap-x-1">
                  <SidebarLinkButton
                    href={routes.notebook(notebook.id)}
                    className="flex-1"
                  >
                    {notebook.name}
                  </SidebarLinkButton>
                  <SidebarLinkIconButton
                    href={routes.entryCreate(notebook.id)}
                    faIcon={faPlus}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Collapsible>
      )}
    </div>
  );
};
