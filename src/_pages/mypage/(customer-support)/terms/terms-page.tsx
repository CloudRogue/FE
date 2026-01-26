import Card from "@/src/shared/ui/card";

export default function TermsPage() {
  return (
    <div className="p-4">
      <Card>
        <h1 className="sr-only">서비스 이용 약관</h1>
        <div className="space-y-4 text-caption2">
          <section>
            <h2 className="text-caption1">제1조 (목적)</h2>
            <p>
              본 약관은 &apos;도적단&apos;(이하 &apos;회사&apos;)이
              웹사이트(이하 &apos;웹&apos;)를 통해 제공하는 청년 주거 정책 매칭
              서비스 &apos;집착(Zip-Chak)&apos;(이하 &apos;서비스&apos;)의
              이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임 사항을
              규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-caption1">제2조 (용어의 정의)</h2>
            <ul className="list-none pl-4">
              <li>
                1. &quot;서비스&quot;라 함은 회사가 운영하는 웹사이트를 통해
                접속하여 이용할 수 있는 주거 공고 통합 조회, AI 기반 공고 요약,
                자격 자가 진단, 카카오 알림톡 서비스 등을 의미합니다.
              </li>
              <li>
                2. &quot;회원&quot;라 함은 본 약관에 동의하고 카카오 계정 소셜
                로그인을 통해 인증을 완료하여 웹 서비스를 이용하는 사용자를
                말합니다.
              </li>
              <li>
                3. &quot;온보딩 데이터&quot;라 함은 자격 진단을 위해 회원이
                웹사이트 내 입력 폼에 직접 입력한 개인정보 및 자산 관련 데이터를
                의미합니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-caption1">제3조 (약관의 효력 및 변경)</h2>
            <ul className="list-none pl-4">
              <li>
                1. 본 서비스는 포트폴리오 전시 및 기술 검증을 위한 데모(Demo)
                목적의 웹 서비스입니다.
              </li>
              <li>
                2. 회사는 서비스 내의 모든 기능을 회원에게 무료로 제공하며, 이에
                따라 서비스의 중단, 변경, 데이터 오류에 대해 어떠한 금전적 배상
                책임도 지지 않습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-caption1">제4조 (서비스의 내용)</h2>
            <p>
              회사는 LH, SH, 각 지자체 등 공공기관의 데이터를 수집하여 다음
              기능을 제공합니다.
            </p>
            <ul className="list-none mt-2 pl-4">
              <li>- 맞춤형 공고 추천 및 AI 요약 정보</li>
              <li>- 회원 입력 기반 자격 자가 진단</li>
              <li>- 관심 공고 일정 관리(Todo) 및 알림 서비스</li>
              <li>
                본 서비스는 데모 서비스로서 운영 상황에 따라 예고 없이 기능이
                수정되거나 서비스가 종료될 수 있습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-caption1">
              제5조 (회원의 의무 및 데이터 정확성)
            </h2>
            <ul className="list-none pl-4">
              <li>
                1. 회원은 자격 진단의 정확성을 위해 온보딩 데이터를 실제 사실과
                부합하게 입력해야 합니다.
              </li>
              <li>
                2. 회원이 입력한 정보의 오류로 인해 발생한 오진단 결과 및 그로
                인한 불이익에 대한 책임은 전적으로 회원 본인에게 있습니다.
              </li>
            </ul>
          </section>

          <section className="bg-gray-50 p-3 rounded-sm">
            <h2 className="text-caption1 mb-2 ">
              제6조 (책임의 제한 및 면책 - 핵심 조항)
            </h2>
            <ul className="list-none text-gray-800">
              <li>
                1. <span className="font-bold">[정보의 정확성 비보장]</span>{" "}
                회사가 제공하는 모든 공고 데이터 및 자격 진단 결과는 외부 API와
                AI 요약 기술을 거쳐 가공된 추정치로 참고 자료입니다. 회사는
                데이터의 최신성, 정확성, 적법성을 100% 보장하지 않습니다. 법적
                효력이 전혀 없습니다.
              </li>
              <li>
                2. <span className="font-bold">[법적 효력 부재]</span>{" "}
                &apos;자격 자가 진단&apos; 결과는 실제 청약 신청 자격을 확정
                짓는 법적 근거가 될 수 없습니다. 실제 신청 시에는 반드시 해당
                기관(LH, SH 등)의 원문 공고를 확인해야 합니다.
              </li>
              <li>
                3. <span className="font-bold">[보상 정책 부재]</span> 회사는
                무료 서비스 이용과 관련하여 회원에게 발생한 어떠한 손해(청약
                신청 누락, 오진단으로 인한 기회비용 발생, 브라우저 오류 등)에
                대해서도 보상이나 손해배상 책임을 지지 않습니다.
              </li>
              <li>
                4. <span className="font-bold">[원문 확인 의무]</span> 모든
                최종적인 청약 자격 판단 및 신청은 해당 기관의 공식 웹사이트 원문
                공고를 기준으로 회원이 직접 수행해야 합니다.
              </li>
              <li>
                5. <span className="font-bold">[서비스 중단]</span> 회사는
                시스템 점검, 서버 오류, 데이터 제공처의 사정 등에 따른 서비스
                중단에 대해 책임을 지지 않습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-caption1">
              제7조 (서비스의 종료 및 데이터 파기)
            </h2>
            <ul className="list-none pl-4">
              <li>
                1. 본 웹 서비스는 한시적으로 운영되는 프로젝트로, 전시 기간 종료
                시 별도의 통지 없이 서비스가 중단될 수 있습니다.
              </li>
              <li>
                2. 서비스 종료와 동시에 수집된 회원의 온보딩 데이터 및
                개인정보는 DB에서 영구 삭제됩니다. 단, 포트폴리오 성과 지표
                산출을 위한 익명화된 통계 데이터(개인 식별 불가)는 예외로
                합니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-caption1">
              제8조 (웹 서비스 제공 및 기술적 특성)
            </h2>
            <ul className="list-none pl-4">
              <li>
                1. 회사는 안정적인 웹 서비스 제공을 위해 노력하나, 이용자의
                브라우저 환경, 네트워크 설정, 캐시(Cache) 상태에 따라 서비스
                이용에 차이가 발생할 수 있습니다.
              </li>
              <li>
                2. 회사는 서비스 품질 개선을 위해 웹사이트 상의 쿠키(Cookie)
                또는 로컬 스토리지(Local Storage)를 활용할 수 있으며, 이는
                개인정보 처리방침에 따릅니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-caption1">제9조 (분쟁 해결 및 관할법원)</h2>
            <ul className="list-none pl-4">
              <li>
                1. 본 약관의 해석 및 회사와 회원 간의 분쟁에 대해서는 대한민국
                법령을 적용합니다.
              </li>
              <li>
                2. 서비스 이용과 관련하여 발생한 분쟁에 대한 소송은 회사의
                소재지를 관할하는 법원을 관할법원으로 합니다.
              </li>
            </ul>
          </section>

          <section className="pt-4 border-t border-gray-100">
            <h2 className="text-caption1 ">제10조 (부칙)</h2>
            <p>본 방침은 2026.01.28.부터 시행됩니다.</p>
            <p>문의처: ghfnsgldl@gmail.com</p>
          </section>
        </div>
      </Card>
    </div>
  );
}
