export type RouteType = "public" | "authed" | "guestOnly";
interface Route {
  pathname: string;
  type: RouteType;
}

export const ROUTES: Record<string, Route> = {
  HOME: {
    pathname: "/",
    type: "public",
  },

  LOGIN: {
    pathname: "/login",
    type: "guestOnly",
  },
  REGISTER: {
    pathname: "/register",
    type: "guestOnly",
  },

  SEARCH: {
    pathname: "/search",
    type: "authed",
  },
  VERIFY_EMAIL: {
    pathname: "/verify-email",
    type: "authed",
  },
  PROFILE: {
    pathname: "/user/profile",
    type: "authed",
  },
} as const;
