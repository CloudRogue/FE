"use client";

import cn from "@/src/shared/lib/cn";

type Props = {
  title?: string;
  description: string;
  className?: string;
};

export default function RequiredOnboardingNotice({
  title = "안내 사항",
  description,
  className,
}: Props) {
  return (
    <div
      className={cn("mt-3 w-full rounded-md bg-gray-50 px-4 py-3", className)}
    >
      <div className="text-caption2 font-semibold text-gray-400">{title}</div>
      <p className="mt-1 whitespace-pre-line text-caption1 text-gray-700">
        {description}
      </p>
    </div>
  );
}
