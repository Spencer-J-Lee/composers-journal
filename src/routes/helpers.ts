import { ROUTES } from "./routes";

const findRoute = (pathname: string) => {
  return Object.values(ROUTES).find((route) => route.pathname === pathname);
};

export const isAuthedRoute = (pathname: string) => {
  const route = findRoute(pathname);
  return route && route.type === "authed";
};

export const isGuestOnlyRoute = (pathname: string) => {
  const route = findRoute(pathname);
  return route && route.type === "guestOnly";
};
