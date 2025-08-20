"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { ASSET_PATHS } from "@/constants/assetPaths";
import { routes } from "@/constants/routes";

import { SidebarMainMenu } from "./SidebarMainMenu";
import { SidebarUserMenu } from "./SidebarUserMenu";
import { Divider } from "../dividers/Divider";

export const Sidebar = () => {
  return (
    <nav
      className={clsx(
        "bg-surface sticky top-0 flex h-screen w-80 min-w-80 flex-col",
      )}
    >
      <Link
        href={routes.workspace()}
        className="flex items-center justify-center px-5 py-3"
      >
        <Image
          src={ASSET_PATHS.LOGO_WHITE}
          alt="Composer's Journal logo"
          width={180}
          height={29}
          style={{ objectFit: "cover" }}
        />
      </Link>

      <Divider />

      <SidebarMainMenu />

      <Divider />

      <SidebarUserMenu />
    </nav>
  );
};
