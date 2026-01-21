// [AI PDF 요약/추출 결과 조회]
export interface KVDigestItem {
  key: string;
  value: string;
}

// 공고 개요/요약 수기 저장
export interface SummaryItem {
  target: string; // 대상
  method: string; // 접수방법
  rentGtn: number; // 임대 보증금
  mtRntchrg: number; // 월 임대료
  regions: string[]; // 지역
  description: string; // 공고 요약 및 유의사항
  contentText: string; //  원문/가공 본문
  kvDigest: KVDigestItem[]; // [AI PDF 요약 결과 조회]
}

// [지원 자격 입력 / 추가 온보딩 질문 생성]
export type RequirementType =
  | "TEXT_INPUT"
  | "NUMBER_INPUT"
  | "SELECT_SINGLE"
  | "SELECT_MULTI"
  | "BOOLEAN";

export interface RequirementItem {
  additionalOnboardingId: string; // 일반 string 허용
  title: string; // 화면에 표시될 제목
  question: string; // 사용자에게 노출될 질문
  description: string; // 질문에 대한 상세 설명
  value: string; // 입력된 값
  type: RequirementType; // 입력 폼 타입
  options?: string[]; // select 타입일 때 선택지 리스트
  isRequired?: boolean; // API에서 내려오는 필수 여부 플래그
  isNew?: boolean; // [추가 온보딩 질문 생성 시 활용]
}

export interface AdminFormData {
  // 공고 기본 정보 [SH 공고 필드 수기 작성]
  basicInfo: {
    title: string; // 공고명
    publisher: string; // 공급 주체
    supplyType: string; // 공급 유형
    originalUrl: string; // 원문 링크
    applyUrl: string; // 신청 링크
  };
  // 공고 개요
  summary: SummaryItem;
  // 필수 지원 자격 조건
  requirements: RequirementItem[]; // [지원 자격 입력]
  // 일정 및 서류 관리 [공고 제출서류/주요 일정 최초 등록]
  schedule: {
    applyStartDate: string; // 접수 시작일
    applyEndDate: string; // 접수 마감일
    requiredDocuments: string[]; // 공고 접수 시 필수 서류 리스트
    documentPublishedAt: string; // 서류 대상자 발표일
    resultDocuments: string[]; // 서류 대상 시 필수 서류 리스트
    finalPublishedAt: string; // 최종 당첨자 및 발표일
  };
}
