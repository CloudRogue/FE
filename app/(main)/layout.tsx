import BottomNav from "@/src/shared/layout/bottom-nav";
import Header from "@/src/shared/layout/header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
