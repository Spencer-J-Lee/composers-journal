import { AuthRule } from "./types";

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
    type: "guestOnly",
  },
  {
    matcher: /^\/verify-email\/callback$/,
    type: "guestOnly",
  },
  {
    matcher: /^\/forgot-password$/,
    type: "guestOnly",
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
