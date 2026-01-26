import QueryProviders from "@/app/_providers/query-providers";
import { AuthInitializer } from "@/app/_providers/auth-initializer"; 
import { ResponsiveLayout } from "@/src/shared/layout/responsive-layout";
import Toast from "@/src/shared/ui/toast";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../src/_app/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "도적단",
  description: "안녕하세요. 도적단의 정부 지원금 털어버려 프로젝트 입니다!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProviders>
          <AuthInitializer>
            <ResponsiveLayout>{children}</ResponsiveLayout>
            <Toast />
          </AuthInitializer>
        </QueryProviders>
      </body>
    </html>
  );
}
