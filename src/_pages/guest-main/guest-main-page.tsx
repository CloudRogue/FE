import CtaCard from "@/src/shared/ui/cta-card/cta-card";
import PolicyCard from "@/src/entities/policy/ui/policy-card";

export default function Page() {
  return (
    <div className="mx-auto max-w-md px-4 py-6 space-y-6">
      <CtaCard
        variant="hero"
        title={"나에게 딱 맞는 주택 공고\n 1분만에 찾기"}
        description="복잡한 주거 지원 정책, 이제 간단하게 확인하세요."
        buttonText="집착 시작하기"
        href="/login" // 임시
      />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">지금 뜨는 주택 공고</h2>

        <PolicyCard
          provider="서울주택도시공사"
          title="2026 청년 매입임대주택"
          date="2026.01.01 ~ 2026.01.15"
        />
        <PolicyCard provider="한국토지주택공사" title="신혼부부 전세임대" />
      </section>

      <CtaCard
        variant="simple"
        description="더 많은 정책을 보고 싶다면?"
        buttonText="집착 시작하기"
        href="/policy" // 임시
      />
    </div>
  );
}
