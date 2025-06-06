"use client";

import { useEffect, useState } from "react";
import {
  faBook,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

import { Collapsible } from "@/components/Collapsible";
import { routes } from "@/constants/routes";
import { Collection } from "@/models/Collection";
import { apiGetCollections } from "@/services/collections/get";

import { IconButton } from "../../IconButton";
import { SidebarLinkButton } from "../SidebarLinkButton";

export const CollectionsAccordionMenu = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    apiGetCollections().then((data) => {
      setCollections(data);
    });
  }, []);

  return (
    <div>
      <div className="flex">
        <SidebarLinkButton
          href={routes.collections()}
          faIcon={faBook}
          className="flex-1"
        >
          Collections
        </SidebarLinkButton>
        {collections.length > 0 && (
          <IconButton
            faIcon={show ? faChevronUp : faChevronDown}
            onClick={() => setShow((prev) => !prev)}
          />
        )}
      </div>

      {collections.length > 0 && (
        <Collapsible show={show}>
          <div className="flex pt-1.5">
            <div className="bg-text-muted ml-5 mr-1.5 w-0.5 rounded-full" />

            <ul className="flex-1 space-y-1.5">
              {collections.map((collection) => (
                <li key={collection.name}>
                  <SidebarLinkButton href={routes.collection(collection.id)}>
                    {collection.name}
                  </SidebarLinkButton>
                </li>
              ))}
            </ul>
          </div>
        </Collapsible>
      )}
    </div>
  );
};
