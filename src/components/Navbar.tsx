import { routes } from "@/routes/routes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ELEMENT_IDS } from "./shared/constants/elementIds";

export const Navbar = () => {
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
            src="/assets/logo-white.png"
            // src="/assets/logo-black.png"
            alt="Composer's Toolkit logo"
            width={220}
            height={40}
            style={{ objectFit: "cover" }}
          />
        </Link>

        <div>
          <Link href={routes.home()} className="-m-2 block p-2">
            <Image
              src="/assets/empty-profile.png"
              alt="User's profile picture"
              width={32}
              height={32}
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};
