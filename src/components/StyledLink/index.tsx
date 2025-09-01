import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import Link from "next/link";

import { styledLinkClassName } from "./styles";

type StyledLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  external?: boolean;
};

export const StyledLink = ({
  href,
  className,
  children,
  external,
  ...props
}: StyledLinkProps) => {
  const finalClassName = clsx(styledLinkClassName, className);

  if (external) {
    return (
      <a
        href={String(href)}
        className={finalClassName}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={finalClassName} {...props}>
      {children}
    </Link>
  );
};
