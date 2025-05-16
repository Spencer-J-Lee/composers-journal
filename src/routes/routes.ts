export type RouteType = "public" | "authed" | "guestOnly";

interface AuthRule {
  matcher: RegExp;
  type: RouteType;
}
export const authRules: AuthRule[] = [
  {
    matcher: /^\//,
    type: "public",
  },
  {
    matcher: /^\/login/,
    type: "guestOnly",
  },
  {
    matcher: /^\/register/,
    type: "guestOnly",
  },
  {
    matcher: /^\/search/,
    type: "authed",
  },
  {
    matcher: /^\/verify-email/,
    type: "authed",
  },
  {
    matcher: /^\/profile/,
    type: "authed",
  },
  {
    matcher: /^\/entries/,
    type: "authed",
  },
  {
    matcher: /^\/tags/,
    type: "authed",
  },
] as const;

export const routes = {
  home: () => {
    return "/";
  },
  login: () => {
    return "/login";
  },
  search: () => {
    return "/search";
  },
  verifyEmail: () => {
    return "/verify-email";
  },
  profile: () => {
    return "/profile";
  },
  entries: () => {
    return "/entries";
  },
  entry: (entryId: number) => {
    return `${routes.entries()}/${entryId}`;
  },
  tags: () => {
    return "/tags";
  },
} as const;
