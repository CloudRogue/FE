export default function HeroCard() {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
      <h1 className="text-xl font-bold">
        나에게 딱 맞는 주택 공고
        <br />
        1분 만에 찾기
      </h1>
      <p className="text-sm text-gray-500">
        복잡한 주거 지원 정책, 이제 간단하게 확인하세요.
      </p>
      <button className="w-full rounded-xl bg-black py-3 text-white font-medium">
        집착 시작하기
      </button>
    </section>
  );
}
