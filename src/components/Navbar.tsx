"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ASSET_PATHS } from "@/constants/assetPaths";
import { ELEMENT_IDS } from "@/constants/elementIds";
import { routes } from "@/constants/routes";
import { createClientCS, getUserCS } from "@/db/supabase/client";

import { AnchorButton } from "./buttons/AnchorButton";
import { Button } from "./buttons/Button";

export const Navbar = () => {
  const supabase = createClientCS();
  const router = useRouter();

  return (
    <header
      id={ELEMENT_IDS.NAVBAR}
      className={clsx(
        "z-navbar bg-background sticky left-0 right-0 top-0 h-[--navbar-height] px-5 py-3 shadow-sm transition-transform lg:px-11",
      )}
    >
      <nav className="flex items-center justify-between gap-x-10">
        <Link href={routes.home()} className="-m-2 block p-2">
          <Image
            src={ASSET_PATHS.LOGO_WHITE}
            alt="Composer's Toolkit logo"
            width={220}
            height={40}
            style={{ objectFit: "cover" }}
          />
        </Link>

        <div className="flex justify-between gap-x-4">
          <AnchorButton href={routes.entryCreate()} variant="positive">
            Create
          </AnchorButton>
          {/* TODO: remove test code */}
          <Button
            onClick={async () => {
              const user = await getUserCS();
              console.log(`user:`, user);
            }}
          >
            Log User
          </Button>
          <Link href={routes.profile()} className="-m-2 block p-2">
            <Image
              src="/assets/empty-profile.png"
              alt="User's profile picture"
              width={32}
              height={32}
              style={{ objectFit: "cover" }}
            />
          </Link>
          {/* TODO: remove test code */}
          <Button
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) {
                console.error(`error:`, error);
              } else {
                router.push(routes.login());
              }
            }}
          >
            Log Out
          </Button>
        </div>
      </nav>
    </header>
  );
};
