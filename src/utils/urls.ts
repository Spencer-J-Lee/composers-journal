export const getRedirectUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_SITE_URL}${path}`;
