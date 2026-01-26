"use client";

import { useUser } from "@/src/entities/user";
import { useFilterStore } from "@/src/features/filter-announcements";
import { LoginRequiredModal } from "@/src/shared/components/login-required-modal";
import cn from "@/src/shared/lib/cn";
import Popover from "@/src/shared/ui/popover";
import { Toggle } from "@/src/shared/ui/toggle";
import { useState } from "react";

export function RecommendationToggle() {
  const { user, isLoggedIn } = useUser();
  const isPersonalized = useFilterStore((state) => state.isPersonalized);
  const setIsPersonalized = useFilterStore((state) => state.setIsPersonalized);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  const isSearchActive = useFilterStore(
    (state) => !!state.appliedFilters.keyword?.trim(),
  );

  const handleToggle = () => {
    if (isSearchActive) return;

    if (!isLoggedIn || !user) {
      setIsLoginPromptOpen(true);
      return;
    }
    setIsPersonalized(!isPersonalized);
  };

  return (
    <Popover
      center
      isOpen={isLoginPromptOpen}
      onClose={() => setIsLoginPromptOpen(false)}
      trigger={
        <div
          className={cn(
            " bg-white transition-all duration-200",
            isSearchActive && "opacity-40 pointer-events-none grayscale",
          )}
        >
          <Toggle
            label="추천 공고만 보기"
            active={isPersonalized}
            onActiveChange={handleToggle}
            disabled={isSearchActive}
            className="w-fit text-body2"
          />
        </div>
      }
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 w-70"
    >
      <LoginRequiredModal onClose={() => setIsLoginPromptOpen(false)} />
    </Popover>
  );
}
