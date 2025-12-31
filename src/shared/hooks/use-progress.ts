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
          if (prev >= 90) return prev + 0.1; // 90%부터는 천천히 증가
          if (prev >= 60) return prev + 1; // 60%부터는 조금 느리게
          return prev + step; // 설정한 step 만큼 증가
        });
      }, interval);
    } else if (finish) {
      timer = setTimeout(() => {
        setValue((prev) => {
          if (prev === 100) return 0;
          return 100;
        });
      }, 0);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [isLoading, interval, step, finish]);

  return value;
};
