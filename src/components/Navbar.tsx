"use client";

import { ROUTES } from "@/routes/routes";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  const [show, setShow] = useState(true);
  const [minify, setMinify] = useState(false);
  const prevPos = useRef(0);

  const handleScroll = () => {
    const currPos = window.scrollY;
    const nextShow = currPos < prevPos.current || currPos < 80;
    setShow(nextShow);
    prevPos.current = currPos;

    if (nextShow === false) {
      setMinify(true);
    } else if (currPos === 0) {
      setMinify(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed left-0 top-0 w-screen px-5 transition-transform lg:px-11",
        {
          "-translate-y-full": !show,
          "shadow-navbar py-3 lg:py-2": minify,
          "py-5": !minify,
        },
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
