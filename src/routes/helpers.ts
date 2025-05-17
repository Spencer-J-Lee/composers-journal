import { authRules } from "./authRules";

export const getRouteType = (pathname: string) => {
  const rule = authRules.find(({ matcher }) => matcher.test(pathname));
  return rule ? rule.type : "public";
};

export const isAuthedRoute = (pathname: string) =>
  getRouteType(pathname) === "authed";

export const isGuestOnlyRoute = (pathname: string) =>
  getRouteType(pathname) === "guestOnly";
