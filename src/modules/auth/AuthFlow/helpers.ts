import { AUTH_FLOW_ROUTES, AuthFlowRoute } from "./types";

export const isAuthFlowRoute = (route: string): route is AuthFlowRoute => {
  return (Object.values(AUTH_FLOW_ROUTES) as string[]).includes(route);
};
