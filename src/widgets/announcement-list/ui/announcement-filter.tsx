"use client";

import Button from "@/src/shared/ui/button";
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/shared/ui/tabs";
import { useFilterStore } from "@/src/features/filter-announcements";
import { RegionFilter } from "@/src/features/filter-announcements/ui/region-filter";
import { PublisherFilter } from "@/src/features/filter-announcements/ui/publisher-filter";
import { HousingTypeFilter } from "@/src/features/filter-announcements/ui/housing-type-filter";
import styles from "./announcement-filter.module.css";

export function AnnouncementFilter() {
  const { applyFilters, resetFilters } = useFilterStore();

  return (
    <TabsRoot defaultValue="region" className={styles.container}>
      {/* 1. 상단 탭 헤더 */}
      <TabsList className={styles.tabHeader}>
        <TabsTrigger value="region">희망 지역</TabsTrigger>
        <TabsTrigger value="publisher">공급 주체</TabsTrigger>
        <TabsTrigger value="housingType">주택 유형</TabsTrigger>
      </TabsList>

      {/* 2. 중앙 컨텐츠 */}
      <div className={styles.content}>
        <TabsContent value="region">
          <RegionFilter />
        </TabsContent>

        <TabsContent value="publisher">
          <PublisherFilter />
        </TabsContent>

        <TabsContent value="housingType">
          <HousingTypeFilter />
        </TabsContent>
      </div>

      {/* 3. 하단 액션 버튼 */}
      <div className={styles.footer}>
        <Button variant="ghost" size="lg" onClick={resetFilters}>
          초기화
        </Button>

        <Button variant="default" size="lg" onClick={applyFilters}>
          결과 적용
        </Button>
      </div>
    </TabsRoot>
  );
}
