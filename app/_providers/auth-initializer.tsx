"use client";

import { useUser } from "@/src/entities/user/lib/use-user";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  useUser();
  return <>{children}</>;
}
