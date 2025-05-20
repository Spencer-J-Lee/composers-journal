"use client";

import { useMemo } from "react";

import { GSISetup } from "./GSISetup";

type GSIButtonProps = {
  variant?: "white" | "blue" | "black";
};

export const GSIButton = ({ variant = "white" }: GSIButtonProps) => {
  const dataTheme = useMemo(() => {
    switch (variant) {
      case "white":
        return "outline";
      case "blue":
        return "filled_blue";
      case "black":
        return "filled_black";
    }
  }, [variant]);

  return (
    <>
      <GSISetup />
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme={dataTheme}
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      />
    </>
  );
};
