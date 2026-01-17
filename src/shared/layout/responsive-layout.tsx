import { ReactNode } from "react";

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div
        className="
          mx-auto w-full flex flex-col min-h-screen
          max-w-[393px]
          md:max-w-[1200px]
          bg-white shadow-sm 
        "
      >
        {children}
      </div>
    </div>
  );
}
