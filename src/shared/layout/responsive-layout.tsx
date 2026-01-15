import { ReactNode } from "react";

interface ResponsiveLayoutProps {
  children: ReactNode;
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex justify-center items-center">
      <div
        className="
        w-full max-w-[768px] min-h-screen flex flex-col
        
        justify-end items-center
        
        md:justify-center md:min-h-[1024px]
      "
      >
        {children}
      </div>
    </div>
  );
}
