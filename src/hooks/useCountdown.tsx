import { useEffect, useRef, useState } from "react";

export const useCountdown = () => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => clear();
  }, []);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startCountdown = (seconds: number) => {
    if (seconds <= 0) {
      return;
    }

    clear();
    setCount(seconds);

    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clear();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  return {
    count,
    startCountdown,
  };
};
