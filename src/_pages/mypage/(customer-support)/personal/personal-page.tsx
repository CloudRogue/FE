import Card from "@/src/shared/ui/card";

export default function PersonalPage() {
  return (
    <div className="p-4 pb-20 min-h-screen bg-gray-50">
      <Card>
        <h1 className="sr-only">개인정보 처리 방침</h1>
        <div className="space-y-6 text-caption2 text-gray-700">
          {/* 제1조 */}
          <section>
            <h2 className="text-caption1 font-bold mb-1">제1조(목적)</h2>
            <p>
              집착(이하 ‘회사'라고 함)는 회사가 제공하고자 하는 서비스(이하
              ‘회사 서비스’)를 이용하는 개인(이하 ‘이용자’ 또는 ‘개인’)의
              정보(이하 ‘개인정보’)를 보호하기 위해, 개인정보보호법, 정보통신망
              이용촉진 및 정보보호 등에 관한 법률(이하 '정보통신망법') 등 관련
              법령을 준수하고, 서비스 이용자의 개인정보 보호 관련한 고충을
              신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
              개인정보처리방침(이하 ‘본 방침’)을 수립합니다.
            </p>
          </section>

          {/* 제2조 */}
          <section>
            <h2 className="text-caption1 font-bold mb-1">
              제2조(개인정보 처리의 원칙)
            </h2>
            <p>
              개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를
              수집할 수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해
              제3자에게 제공될 수 있습니다. 단, 법령의 규정 등에 의해 적법하게
              강제되는 경우 회사는 수집한 이용자의 개인정보를 사전에 개인의 동의
              없이 제3자에게 제공할 수도 있습니다.
            </p>
          </section>

          {/* 제3조 - 리스트 구조 적용 */}
          <section>
            <h2 className="text-caption1 font-bold mb-1">
              제3조(본 방침의 공개)
            </h2>
            <ul className="list-none">
              <li>
                1. 회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사
                홈페이지 첫 화면 또는 첫 화면과의 연결화면을 통해 본 방침을
                공개하고 있습니다.
              </li>
              <li>
                2. 회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상
                등을 활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록 합니다.
              </li>
            </ul>
          </section>

          {/* 제4조 */}
          <section>
            <h2 className="text-caption1 font-bold mb-1">
              제4조(본 방침의 변경)
            </h2>
            <ul className="list-none ">
              <li>
                1. 본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사
                서비스의 정책이나 내용의 변경에 따라 개정될 수 있습니다.
              </li>
              <li>
                2. 회사는 제1항에 따라 본 방침을 개정하는 경우 다음 각 호 하나
                이상의 방법으로 공지합니다.
                <ul className="list-none pl-4 mt-1text-gray-500">
                  <li>
                    가. 인터넷 홈페이지의 공지사항란 또는 별도의 창을 통하여
                    공지
                  </li>
                  <li>
                    나. 전자우편 또는 이와 비슷한 방법으로 이용자에게 공지
                  </li>
                </ul>
              </li>
              <li>
                3. 시행일로부터 최소 7일 이전에 공지합니다. 다만, 중요한 변경이
                있을 경우에는 최소 30일 전에 공지합니다.
              </li>
            </ul>
          </section>

          {/* 제5조 ~ 제7조 (핵심 정보 수집) */}
          <section>
            <h2 className="text-caption1 font-bold mb-1">
              제5조~제7조(수집 정보 및 항목)
            </h2>
            <ul className="list-none">
              <li>
                <strong>• 회원가입 정보:</strong> 이메일 주소, 이름 및 닉네임
              </li>
              <li>
                <strong>• 서비스 이용 정보:</strong> 서비스 이용기록 및 쿠키
              </li>
              <li>
                <strong>• 자격 진단 정보:</strong> 나이, 거주지역, 가구원 수,
                월평균 소득 정보, 자산 정보, 청약통장 가입 정보, 장애 여부 등
              </li>
              <li>
                <strong>• 민감정보:</strong> 장애 여부 (주거 약자 지원 정책 매칭
                목적으로만 활용)
              </li>
            </ul>
          </section>

          {/* 제8조 ~ 제11조 (수집 방법 및 보유 기간) */}
          <section>
            <h2 className="text-caption1 font-bold mb-1">
              제8조~제11조(수집 및 보유 기간)
            </h2>
            <p className="mb-2">
              회사는 목적 달성 시까지 정보를 보유하며, 법령에 따라 다음 기간
              동안 보관합니다.
            </p>
            <ul className="list-none pl-4 border-l-2 border-gray-100">
              <li>• 계약 또는 청약철회 기록: 5년</li>
              <li>• 소비자 불만 또는 분쟁처리 기록: 3년</li>
              <li>• 웹사이트 로그 기록: 3개월</li>
            </ul>
          </section>

          {/* 제12조 ~ 제21조 (파기 및 보안) */}
          <section>
            <h2 className="text-caption1 font-bold mb-1">
              제12조~제21조(파기 및 보안 조치)
            </h2>
            <p>
              회사는 이용자의 개인정보를 지체 없이 파기하며, 해킹 방지 및
              비밀번호 일방향 암호화 등 기술적·관리적 보호대책을 강구하고
              있습니다.
            </p>
          </section>

          {/* 제22조 ~ 제26조 (이용자 권리 및 구제) */}
          <section>
            <h2 className="text-caption1 font-bold mb-1">
              제22조~제26조(권리 및 구제방법)
            </h2>
            <p className="mb-2">
              이용자는 개인정보 유출 시 통지받을 권리가 있으며, 다음 기관을 통해
              상담할 수 있습니다.
            </p>
            <ul className="list-none space-y-1">
              <li>• 개인정보분쟁조정위원회: 1833-6972</li>
              <li>• 개인정보침해신고센터: 118</li>
            </ul>
          </section>

          {/* 제27조 및 부칙 */}
          <section>
            <h2 className="text-caption1 font-bold mb-1">
              제27조(자동화된 결정에 대한 권리)
            </h2>
            <p>
              회원은 AI를 통한 자동화된 자격 진단 결과에 대해 설명 요구 및
              이의제기를 할 수 있습니다. 본 결과는 참고용이며 법적 효력은
              없습니다.
            </p>
          </section>

          <section className="pt-4 border-t border-gray-100">
            <h2 className="text-caption1 font-bold mb-1">부칙</h2>
            <p>제1조 본 방침은 2026.01.28.부터 시행됩니다.</p>
          </section>
        </div>
      </Card>
    </div>
  );
}
