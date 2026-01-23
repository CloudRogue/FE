import BottomNav from "@/src/shared/layout/bottom-nav";
import Header from "@/src/shared/layout/header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1 min-h-[calc(100dvh-9rem)] bg-gray-bg">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
