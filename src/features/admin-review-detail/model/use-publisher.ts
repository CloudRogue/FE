import { useAdminFormStore } from "@/src/features/admin-review-detail";
import { useMemo } from "react";

export function usePublisher() {
  const publisher = useAdminFormStore(
    (state) => state.formData.basicInfo.publisher,
  );

  return useMemo(
    () => ({
      isLH: publisher?.includes("LH") ?? false,
      isSH: publisher?.includes("SH") ?? false,
      isGH: publisher?.includes("GH") ?? false,
      current: publisher,
    }),
    [publisher],
  );
}
