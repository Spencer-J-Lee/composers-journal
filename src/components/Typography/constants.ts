import { TypographyHtmlTag, TypographyVariant } from "./types";

export const typographyHtmlTags: Record<TypographyVariant, TypographyHtmlTag> =
  {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    subtitle: "p",
    body: "p",
    bodySmall: "small",
  };

export const typographyStyles: Record<TypographyVariant, string> = {
  h1: "text-4xl font-bold leading-tight tracking-tight",
  h2: "text-3xl font-semibold leading-snug tracking-tight",
  h3: "text-2xl font-semibold leading-snug",
  h4: "text-xl font-medium leading-snug",
  h5: "text-lg font-medium leading-normal",
  h6: "text-base font-medium leading-normal",
  subtitle: "text-sm font-medium text-muted-foreground",
  body: "text-base font-normal text-foreground",
  bodySmall: "text-sm font-normal text-foreground",
};
