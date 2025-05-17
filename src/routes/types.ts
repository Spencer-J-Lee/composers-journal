export type RouteOptions = {
  query?: Record<string, string | string[]>;
  fragment?: string;
};

export type RouteType = "public" | "authed" | "guestOnly";

export type AuthRule = {
  matcher: RegExp;
  type: RouteType;
};
