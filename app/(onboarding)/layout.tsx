import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <main className="container mx-auto ">{children}</main>
    </div>
  );
}
