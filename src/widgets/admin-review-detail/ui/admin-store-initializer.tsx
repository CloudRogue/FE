"use client";

import { useAdminFormStore } from "@/src/features/admin-review-detail";
import { useRef } from "react";

export function AdminStoreInitializer({
  data,
  pool,
}: {
  data: any;
  pool: any;
}) {
  const isInitialized = useRef(false);

  if (!isInitialized.current) {
    useAdminFormStore.getState().initStore(data, pool);
    isInitialized.current = true;
  }

  return null;
}
