"use client";

import { Button, ButtonProps } from "./Button";

type CooldownButtonProps = {
  cooldown: number; // in seconds
} & ButtonProps;

/**
 * TODO: [very low] Add cooldown sliding animation
 */
export const CooldownButton = ({
  children,
  cooldown,
  ...props
}: CooldownButtonProps) => {
  const secondsToClockTime = (cooldown: number) => {
    const mins = Math.floor((cooldown % 3600) / 60);
    const secs = cooldown % 60;

    const formattedMins = String(mins).padStart(1, "0");
    const formattedSecs = String(secs).padStart(2, "0");

    return `${formattedMins}:${formattedSecs}`;
  };

  return (
    <Button {...props} disabled={cooldown > 0}>
      {children}
      {cooldown > 0 && (
        <span className="ml-1 inline-block w-4">{`(${secondsToClockTime(cooldown)})`}</span>
      )}
    </Button>
  );
};
