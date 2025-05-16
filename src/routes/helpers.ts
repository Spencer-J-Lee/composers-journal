import { authRules } from "./routes";

export const getRouteType = (pathname: string) => {
  const rule = authRules.find(({ matcher }) => matcher.test(pathname));
  return rule ? rule.type : "public";
};

export const isAuthedRoute = (pathname: string) => {
  return getRouteType(pathname) === "authed";
};

export const isGuestOnlyRoute = (pathname: string) => {
  return getRouteType(pathname) === "guestOnly";
};
