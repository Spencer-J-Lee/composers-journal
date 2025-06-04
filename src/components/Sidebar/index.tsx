"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";

import { routes } from "@/constants/routes";

import { LinkButton } from "../buttons/LinkButton";

type SidebarProps = {};

export const Sidebar = ({}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "bg-surface sticky top-0 h-screen w-72 min-w-72 overflow-y-auto overflow-x-hidden px-5 py-5 shadow-sm",
        // "bg-surface sticky top-[calc(var(--navbar-height)_-_1px)] h-[calc(100vh_-_var(--navbar-height))] w-72 min-w-72 overflow-y-auto overflow-x-hidden px-5 py-5 shadow-sm",
      )}
    >
      <div className="flex flex-col justify-between gap-y-2">
        {/* TODO: replace these with sidebar buttons */}
        <LinkButton
          variant={pathname === routes.collections() ? "positive" : "default"}
          href={routes.collections()}
        >
          Collections
        </LinkButton>
        <LinkButton
          variant={pathname === routes.search() ? "positive" : "default"}
          href={routes.search()}
        >
          Search
        </LinkButton>
        <LinkButton
          variant={pathname === routes.trash() ? "positive" : "default"}
          href={routes.trash()}
        >
          Trash
        </LinkButton>
        <LinkButton
          variant={pathname === routes.profile() ? "positive" : "default"}
          href={routes.profile()}
        >
          Profile
        </LinkButton>
      </div>
    </aside>
  );
};
