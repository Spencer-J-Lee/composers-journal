"use client";

import { useEffect } from "react";

import { Button } from "@/components/buttons/Button";
import { Typography } from "@/components/Typography";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Route-level error boundary. Catches unhandled errors thrown while
 * rendering any page below the root layout and shows a recoverable
 * fallback instead of a blank screen.
 */
const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 p-6 text-center">
      <Typography variant="h2">Something went wrong</Typography>
      <Typography variant="body">
        An unexpected error occurred. Please try again.
      </Typography>

      <div className="mt-4">
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
};

export default ErrorPage;
