"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { ASSET_PATHS } from "@/constants/assetPaths";
import { ELEMENT_IDS } from "@/constants/elementIds";
import { routes } from "@/constants/routes";

import { LinkButton } from "./buttons/LinkButton";

export const Navbar = () => {
  return (
    <header
      id={ELEMENT_IDS.NAVBAR}
      className={clsx(
        "z-navbar bg-background sticky left-0 right-0 top-0 h-[var(--navbar-height)] px-5 py-3 shadow-sm transition-transform lg:px-11",
      )}
    >
      <nav className="flex items-center justify-between gap-x-10">
        <Link href={routes.home()} className="-m-2 block p-2">
          <Image
            src={ASSET_PATHS.LOGO_WHITE}
            alt="Composer's Journal logo"
            width={220}
            height={40}
            style={{ objectFit: "cover" }}
          />
        </Link>

        <div className="flex justify-between gap-x-4">
          <LinkButton href={routes.login()}>Login</LinkButton>
        </div>
      </nav>
    </header>
  );
};
