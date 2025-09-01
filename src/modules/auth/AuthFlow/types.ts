export const AUTH_FLOW_ROUTES = {
  LOGIN: "login",
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot-password",
} as const;
export const DEFAULT_AUTH_FLOW_ROUTE = AUTH_FLOW_ROUTES.LOGIN;

export type AuthFlowRoute =
  (typeof AUTH_FLOW_ROUTES)[keyof typeof AUTH_FLOW_ROUTES];
