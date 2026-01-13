"use client";

import { useState, useEffect } from "react";
import { SearchInput } from "@/src/shared/ui/search-input";
import { useFilterStore } from "@/src/features/filter-announcements";

export function SearchBar() {
  const keyword = useFilterStore((state) => state.appliedFilters.keyword);
  const setFilter = useFilterStore((state) => state.setFilter);
  const [value, setValue] = useState(keyword || "");

  useEffect(() => {
    setValue(keyword || "");
  }, [keyword]);

  const handleSearch = (searchValue: string) => {
    setFilter("keyword", searchValue);
  };

  return (
    <div className="px-4 py-2 bg-white">
      <SearchInput
        placeholder="검색하기"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSearch={handleSearch}
      />
    </div>
  );
}
