export type RouteType = "public" | "authed" | "guestOnly";

interface AuthRule {
  matcher: RegExp;
  type: RouteType;
}
export const authRules: AuthRule[] = [
  {
    matcher: /^\/$/,
    type: "public",
  },

  {
    matcher: /^\/login$/,
    type: "guestOnly",
  },
  {
    matcher: /^\/register$/,
    type: "guestOnly",
  },

  {
    matcher: /^\/verify-email$/,
    type: "authed",
  },
  {
    matcher: /^\/profile$/,
    type: "authed",
  },
  {
    matcher: /^\/search$/,
    type: "authed",
  },
  {
    matcher: /^\/entries\/[0-9]+$/,
    type: "authed",
  },
  {
    matcher: /^\/entries\/[0-9]+\/edit$/,
    type: "authed",
  },
  {
    matcher: /^\/entries\/create$/,
    type: "authed",
  },
  {
    matcher: /^\/tags$/,
    type: "authed",
  },
] as const;

class Routes {
  constructor() {}

  private entries() {
    return "/entries";
  }

  home() {
    return "/";
  }
  login() {
    return "/login";
  }
  register() {
    return "/register";
  }
  search() {
    return "/search";
  }
  verifyEmail() {
    return "/verify-email";
  }
  profile() {
    return "/profile";
  }
  entry(entryId: number) {
    return `${routes.entries()}/${entryId}`;
  }
  entryEdit(entryId: number) {
    return `${routes.entries()}/${entryId}/edit`;
  }
  entryCreate() {
    return `${routes.entries}/create`;
  }
  tags() {
    return "/tags";
  }
}

export const routes = new Routes();
