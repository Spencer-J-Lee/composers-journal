import { ReactNode } from "react";
import clsx from "clsx";

import { typographyHtmlTags,typographyStyles } from "./constants";
import { TypographyHtmlTag, TypographyVariant } from "./types";

type TypographyProps = {
  children: ReactNode;
  variant: TypographyVariant;
  htmlTag?: TypographyHtmlTag;
  className?: string;
};

export const Typography = ({
  children,
  variant,
  htmlTag,
  className,
}: TypographyProps) => {
  const HtmlTag = htmlTag ?? typographyHtmlTags[variant];

  return (
    <HtmlTag className={clsx(typographyStyles[variant], className)}>
      {children}
    </HtmlTag>
  );
};
