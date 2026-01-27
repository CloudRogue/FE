"use client";

import {
  AnnouncementSearch,
  AnnouncementSearchCard,
  getAnnouncementSearch,
} from "@/src/entities/announcement-search";
import { ROUTES } from "@/src/shared/constants/routes";
import { useDebounce } from "@/src/shared/hooks/use-debounce";
import { HeaderLeft } from "@/src/shared/layout/hedaer-components";
import Input from "@/src/shared/ui/input";
import { AnnouncementCardSkeleton } from "@/src/widgets/announcement-card";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AnnouncementsSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const isSearchValid = debouncedSearchTerm.length >= 3;

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["announcements", "search", debouncedSearchTerm],
    queryFn: () => getAnnouncementSearch(debouncedSearchTerm),
    enabled: isSearchValid,
  });

  const searchResults = Array.isArray(data)
    ? data
    : ((data as any)?.data ?? []);
  const totalCount = searchResults.length;

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center w-full h-16 p-4 bg-white gap-2">
        <HeaderLeft
          type="SEARCH"
          onBack={() => router.push(ROUTES.ANNOUNCEMENT)}
        />

        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none"
            size={20}
          />
          <Input
            className="w-full h-11 bg-gray-50 border-none rounded-xl pl-11 pr-4 text-base placeholder:text-gray-300 focus:ring-1 focus:ring-gray-200 outline-none"
            placeholder="검색어를 입력해주세요"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="p-4 space-y-4">
        <h1 className="text-h2">
          {debouncedSearchTerm ? (
            <>
              <span>'{debouncedSearchTerm}'</span>
              <span> 검색 결과 </span>
            </>
          ) : (
            "검색 결과 "
          )}
          <span>({totalCount}건)</span>
        </h1>
        <div className="flex flex-col gap-3">
          {isLoading && isSearchValid ? (
            Array.from({ length: 3 }).map((_, i) => (
              <AnnouncementCardSkeleton key={`skeleton-${i}`} />
            ))
          ) : (
            <>
              {/* 3글자 미만 입력 시 */}
              {searchTerm.length > 0 && searchTerm.length < 3 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
                  <AlertCircle size={40} className="text-slate-200" />
                  <p className="text-body1 font-medium text-slate-500">
                    최소 3글자 이상 입력해 주세요.
                  </p>
                  <p className="text-caption1">
                    더 정확한 검색 결과를 위해 글자가 더 필요해요.
                  </p>
                </div>
              )}

              {/* 검색 결과 리스트 */}
              {isSearchValid &&
                searchResults.map((item: AnnouncementSearch) => (
                  <Link
                    key={item.announcementId}
                    href={ROUTES.ANNOUNCEMENT_DETAIL(
                      String(item.announcementId),
                    )}
                  >
                    <AnnouncementSearchCard {...item} />
                  </Link>
                ))}
              {/* 검색 결과가 없을 때 (3글자 이상 입력했지만 결과 0건) */}
              {isSearchValid && isFetched && totalCount === 0 && (
                <div className="py-20 text-center text-slate-400">
                  <p className="text-body1">검색 결과가 없습니다.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
