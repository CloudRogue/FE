export default function Page() {
  return (
    <div>
      <section>비회원/회원 카드? 분기 처리 섹션</section>
      {/* 피그마 내용대로 */}
      <section>비회원 전용 - 주택공고/인기 공고</section>
      <section>회원 전용 - 맞춤공고, 이번주에 핫한 공고</section>
      {/* 문의 내용 - 답장 없음 */}
      <section>비회원 / 회원 - 주택 공고</section>
      <section>공통 - 인기 공고</section>
    </div>
  );
}
