import { useEffect,useRef, useState } from "react";

export const useCountdown = () => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startCountdown = (seconds: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setCount(seconds);

    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
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
