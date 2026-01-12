import BottomNav from "@/src/shared/layout/bottom-nav";
import Header from "@/src/shared/layout/header";
import { ReactNode } from "react";

// TODO: pathname 토대로 분기처리 필요
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* TODO: 게스트 - unauthenticated, 회원 authenticated */}
      <Header variant="unauthenticated" />
      <main /*className="container mx-auto px-4 py-8 flex-1 flex"*/>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
