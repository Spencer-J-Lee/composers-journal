"use client";

import { useMemo } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { AlertType } from "./types";

type AlertProps = {
  message: string;
  type: AlertType;
  show: boolean;
  className?: string;
  onClose: () => void;
};

/**
 * @deprecated Use the custom Toast from sonner for alerts
 */
export const Alert = ({
  message,
  type,
  show,
  className,
  onClose,
}: AlertProps) => {
  const bgClassName = useMemo(() => {
    switch (type) {
      case "positive":
        return "bg-positive";
      case "negative":
        return "bg-negative";
    }
  }, [type]);

  return (
    show && (
      <div
        className={clsx(
          "text-text flex w-full justify-between gap-x-4 overflow-hidden rounded p-3 py-2.5 text-sm font-bold",
          bgClassName,
          className,
        )}
      >
        {message}

        <button
          onClick={onClose}
          className="-m-3 -mt-3.5 flex items-center justify-center p-3 hover:brightness-90"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>
      </div>
    )
  );
};
