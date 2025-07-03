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
    divider: "p",
  };

export const typographyStyles: Record<TypographyVariant, string> = {
  h1: "text-4xl font-bold leading-tight tracking-tight text-text",
  h2: "text-3xl font-semibold leading-snug tracking-tight text-text",
  h3: "text-2xl font-semibold leading-snug text-text",
  h4: "text-xl font-medium leading-snug text-text",
  h5: "text-lg font-medium leading-normal text-text",
  h6: "text-base font-medium leading-normal text-text",
  subtitle: "text-sm font-medium text-text-muted",
  body: "text-base font-normal text-text",
  bodySmall: "text-sm font-normal text-text",
  divider: "text-sm font-medium italic text-text-muted-divider",
};
