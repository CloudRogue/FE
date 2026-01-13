"use client";

import { Loader2 } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh w-full bg-white">
      <Loader2
        width={50}
        height={50}
        className="animate-spin text-gray-300"
        strokeWidth={2}
        style={{ animationDuration: "1s" }}
      />
    </div>
  );
}
