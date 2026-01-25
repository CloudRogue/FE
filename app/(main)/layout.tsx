import BottomNav from "@/src/shared/layout/bottom-nav";
import Header from "@/src/shared/layout/header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col min-h-[calc(100dvh-9rem)] bg-gray-bg">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
