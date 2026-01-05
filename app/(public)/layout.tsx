import BottomNav from "@/src/shared/layout/bottom-nav";
import Header from "@/src/shared/layout/header";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header variant="authenticated" />
      <main className="container mx-auto px-4 py-8 flex-1 flex">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
