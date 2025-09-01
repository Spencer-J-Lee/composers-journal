"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { FadeSlide } from "@/components/animations/FadeSlide";

import { heroTextData } from "./constants";
import { ForgotPasswordContent } from "./forgotPassword/ForgotPasswordContent";
import { isAuthFlowRoute } from "./helpers";
import { LoginContent } from "./login/LoginContent";
import { RegisterContent } from "./register/RegisterContent";
import {
  AUTH_FLOW_ROUTES,
  AuthFlowRoute,
  DEFAULT_AUTH_FLOW_ROUTE,
} from "./types";
import { AuthFormWrapper } from "../components/AuthFormWrapper";

type AuthFlowProps = {
  defaultFlowRoute: AuthFlowRoute;
};

export const AuthFlow = ({ defaultFlowRoute }: AuthFlowProps) => {
  const [flow, setFlow] = useState<AuthFlowRoute>(defaultFlowRoute);
  const pathname = usePathname();

  useEffect(() => {
    const route = pathname.slice(1);

    if (isAuthFlowRoute(route)) {
      setFlow(route);
      return;
    }

    // Reset path to default
    window.history.pushState(null, "", DEFAULT_AUTH_FLOW_ROUTE);
    setFlow(DEFAULT_AUTH_FLOW_ROUTE);
  }, [pathname]);

  return (
    <AuthFormWrapper
      title={heroTextData[flow].title}
      subtitle={heroTextData[flow].subtitle}
    >
      {flow === AUTH_FLOW_ROUTES.LOGIN && (
        <FadeSlide>
          <LoginContent />
        </FadeSlide>
      )}
      {flow === AUTH_FLOW_ROUTES.REGISTER && (
        <FadeSlide>
          <RegisterContent />
        </FadeSlide>
      )}
      {flow === AUTH_FLOW_ROUTES.FORGOT_PASSWORD && (
        <FadeSlide>
          <ForgotPasswordContent />
        </FadeSlide>
      )}
    </AuthFormWrapper>
  );
};
