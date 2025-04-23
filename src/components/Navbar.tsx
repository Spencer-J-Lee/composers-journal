import { ROUTES } from "@/routes/routes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header
      className={clsx(
        "border-border fixed left-0 top-0 w-screen border-b px-5 py-3 transition-transform lg:px-11",
      )}
    >
      <nav className="flex items-center justify-between gap-x-10">
        <Link href={ROUTES.HOME} className="-m-2 block p-2">
          <Image
            src="/assets/logo-white.png"
            alt="Composer's Toolkit logo"
            width={220}
            height={40}
            style={{ objectFit: "cover" }}
          />
        </Link>

        <div>
          <Link href={ROUTES.HOME} className="-m-2 block p-2">
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
