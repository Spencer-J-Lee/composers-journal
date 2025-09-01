import { AUTH_FLOW_ROUTES, AuthFlowRoute } from "./types";

export const heroTextData: Record<
  AuthFlowRoute,
  { title: string; subtitle: string }
> = {
  [AUTH_FLOW_ROUTES.LOGIN]: {
    title: "Welcome back!",
    subtitle: "Sign in to access your notebooks and entries",
  },
  [AUTH_FLOW_ROUTES.REGISTER]: {
    title: "Create your account",
    subtitle: "Start organizing your thoughts and ideas in one place",
  },
  [AUTH_FLOW_ROUTES.FORGOT_PASSWORD]: {
    title: "Forgot your password?",
    subtitle: "Enter your email and we'll send you instructions to reset it",
  },
};
