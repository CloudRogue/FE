"use client";

import { useEffect, useState } from "react";

interface UseProgressOptions {
  interval?: number;
  step?: number;
}

export const useProgress = (
  isLoading: boolean,
  options: UseProgressOptions = {},
) => {
  const { interval = 200, step = 5 } = options;
  const [value, setValue] = useState(0);

  const finish = !isLoading && value > 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      timer = setInterval(() => {
        setValue((prev) => {
          const startValue = prev >= 100 || !isLoading ? 0 : prev;
          if (startValue >= 90) return startValue + 0.1; // 90%부터는 천천히 증가
          if (startValue >= 60) return startValue + 1; // 60%부터는 조금 느리게
          return startValue + step; // 설정한 step 만큼 증가
        });
      }, interval);
    } else if (finish) {
      timer = setTimeout(() => {
        setValue((prev) => (prev > 0 && prev < 100 ? 100 : prev));
      }, 0);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
        clearTimeout(timer);
      }
    };
  }, [isLoading, interval, step, finish]);

  return value;
};
