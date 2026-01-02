import PublicHeader from "./_components/PublicHeader";
import HeroCard from "./_components/HeroCard";
import PolicyCard from "./_components/PolicyCard";
import CtaCard from "./_components/CtaCard";

export default function Page() {
  <main className="mx-auto max-w-md px-4 py-6 space-y-6">
    <PublicHeader />

    <HeroCard />

    <section className="space-y-4">
      <h2 className="text-lg font-semibold">지금 뜨는 주택 공고</h2>

      <PolicyCard />
      <PolicyCard />
    </section>

    <CtaCard />
  </main>;
}
