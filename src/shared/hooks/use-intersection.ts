import { useEffect, useRef } from "react";

type Options = {
  rootMargin?: string;
  threshold?: number;
};

export function useIntersection(
  onIntersect: () => void | boolean,
  options?: Options,
) {
  const ref = useRef<HTMLDivElement | null>(null);

  const optionsRef = useRef<Options>({
    rootMargin: "600px 0px",
    threshold: 0.01,
    ...options,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;

      const result = onIntersect();

      if (result === false) {
        observer.disconnect();
      }
    }, optionsRef.current);

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [onIntersect]);

  return ref;
}
