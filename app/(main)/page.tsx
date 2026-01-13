// app/(main)/page.tsx
import { HomeBanner } from "@/src/widgets/home-banner";
import { QuickNavigation } from "@/src/widgets/quick-navigation";

export default function MainPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-32">

      <div className="max-w-md mx-auto flex flex-col gap-2">
        <HomeBanner />

        <QuickNavigation />
      </div>

    </div>
  );
}
