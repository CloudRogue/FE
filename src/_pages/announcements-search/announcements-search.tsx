"use client";

import { ROUTES } from "@/src/shared/constants/routes";
import { useDebounce } from "@/src/shared/hooks/use-debounce";
import { HeaderLeft } from "@/src/shared/layout/hedaer-components";
import Input from "@/src/shared/ui/input";
import { AnnouncementCard } from "@/src/widgets/announcement-card";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AnnouncementsSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // TODO: 검색 API 구현 이후 연동 필요
  // const { data, isLoading } = useQuery({
  //   queryKey: ["announcements", "search", debouncedSearchTerm],
  //   queryFn: () = console.log('쿼리 호출'),
  //   enabled: debouncedSearchTerm.length > 0,
  // });
  const totalCount = 10;

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
        <AnnouncementCard
          announcementId={1}
          title={"dkssud"}
          startDate={"2026-01-11"}
          endDate={"2025-01-11"}
          publisher="lg"
          publishedAt={"2025-01-11"}
          status="CLOSED"
          className="mb-4"
        />
      </main>
    </>
  );
}
