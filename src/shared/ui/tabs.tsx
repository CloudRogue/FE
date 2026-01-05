"use client";

import cn from "@/src/shared/lib/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext } from "react";

interface TabsContextProps {
  activeTab: string;
  changeTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(
      "Tabs 하위 컴포넌트는 Tabs 컨테이너 안에서 사용되어야 합니다.",
    );
  }
  return context;
};

// tab container
interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
  searchParamKey?: string;
}

export const TabsRoot = ({
  defaultValue,
  children,
  className,
  searchParamKey = "tab",
}: TabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get(searchParamKey) || defaultValue;

  const changeTab = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(searchParamKey, value);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams, searchParamKey],
  );
  return (
    <TabsContext value={{ activeTab, changeTab }}>
      <div className={cn("flex flex-col", className)}>{children}</div>
    </TabsContext>
  );
};

// tab list
interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <div
      role="tablist"
      className={cn("inline-flex items-center justify-center", className)}
    >
      {children}
    </div>
  );
};

// tab button triger
interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsTrigger = ({
  value,
  children,
  className,
}: TabsTriggerProps) => {
  const { activeTab, changeTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => changeTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-white text-black shadow-sm"
          : "hover:bg-gray-200/50 hover:text-black",
        className,
      )}
    >
      {children}
    </button>
  );
};

// tab content
interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}
export const TabsContent = ({
  value,
  children,
  className,
}: TabsContentProps) => {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn(
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      {children}
    </div>
  );
};
