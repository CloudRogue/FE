"use client";

import * as React from "react";
import { Search } from "lucide-react";
import cn from "@/src/shared/lib/cn";
import Input from "./input";

interface SearchInputProps extends React.ComponentPropsWithoutRef<
  typeof Input
> {
  onSearch?: (value: string) => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSearch) {
        onSearch(e.currentTarget.value);
      }
    };

    return (
      <div
        className={cn(
          "relative flex items-center w-full bg-slate-50 rounded-xl px-4",
          className,
        )}
      >
        <Search className="text-slate-400 mr-2" size={20} />
        <Input
          ref={ref}
          className="w-full py-3 bg-transparent border-none outline-none text-[15px] text-slate-900 placeholder:text-slate-400"
          onKeyDown={handleKeyDown}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
