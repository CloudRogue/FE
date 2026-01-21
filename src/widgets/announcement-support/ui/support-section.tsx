"use client";

import {
  AnnouncementDetail,
  SupportStatus,
} from "@/src/entities/announcement-detail";
import { useUser } from "@/src/entities/user";
import { postEligibilityCheck } from "@/src/features/announcement-eligibility-check";
import cn from "@/src/shared/lib/cn";
import Card from "@/src/shared/ui/card";
import No from "@/src/shared/ui/icons/eligibility/no1.svg";
import Okay from "@/src/shared/ui/icons/eligibility/okay2.svg";
import Question from "@/src/shared/ui/icons/eligibility/question1.svg";
import {
  SupportContentButtons,
  SupportInfoCard,
} from "@/src/widgets/announcement-support";
import { useQuery } from "@tanstack/react-query";

interface SupportSectionProps {
  announcement: AnnouncementDetail;
}

export function SupportSection({ announcement }: SupportSectionProps) {
  const { user } = useUser(); //isLoggedIn
  const isLoggedIn = false;
  const displayUserName = user?.name || "청년";

  const { data, isLoading, isError } = useQuery({
    // TODO: 쿼리키 상수화 필요
    queryKey: ["eligibilityCheck", announcement.announcementId],
    queryFn: () => postEligibilityCheck(String(announcement.announcementId)),
    enabled: isLoggedIn,
  });

  const currentStatus =
    isLoggedIn && data ? (data.supportStatus as SupportStatus) : "PENDING";

  const config = STATUS_CONFIG[currentStatus];

  if (isLoggedIn && isLoading) return <div>결과를 불러오는 중..</div>;
  if (isError) throw new Error("API 호출 실패");

  return (
    <Card
      as="section"
      className={cn(
        "flex flex-col gap-4 p-4 rounded-md transition-all duration-500",
        config.bgClass,
      )}
    >
      <h3 className="sr-only">지원 자격</h3>

      <div className="flex flex-col gap-2">
        <div>{config.icon}</div>
        <p className="text-h1 text-black">{config.title}</p>
        <p className="text-body1 text-gray-900 whitespace-pre-wrap">
          {currentStatus === "LOGIN_REQUIRED"
            ? config.description
            : `${displayUserName}${config.description}`}
        </p>{" "}
        <p className="text-caption1 text-gray-700 font-light mt-1">
          진단 일시{" "}
          {data?.diagnosedAt
            ? new Date(data.diagnosedAt).toLocaleString("ko-KR")
            : "진단 정보 없음"}
        </p>
      </div>

      <SupportInfoCard result={data ?? null} isLoggedIn={isLoggedIn} />

      <SupportContentButtons
        status={isLoggedIn ? currentStatus : "LOGIN_REQUIRED"}
        todoPayload={{
          announcementId: announcement.announcementId,
          title: announcement.title,
          dueDate: announcement.endDate,
        }}
      />

      <p className="text-gray-400 text-body2">
        위 진단 결과는 입력하신 프로필 정보를 바탕으로 산출되었어요. 실제 심사
        결과는 증빙 서류 및 공급 주체의 기준에 따라 달라질 수 있으니 공고문
        전문을 반드시 확인해주세요.
      </p>
    </Card>
  );
}

interface StatusConfig {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgClass: string;
}

const STATUS_CONFIG: Record<string, StatusConfig> = {
  LOGIN_REQUIRED: {
    icon: <Question />,
    title: "로그인 필요",
    description:
      "복잡한 검색은 이제 그만, 로그인 한 번으로\n조건에 딱 맞는 공고를 한눈에 모아보세요!",
    bgClass: "bg-[linear-gradient(180deg,_#ECEFF1_0%,_#FFF_100%)]",
  },
  ELIGIBLE: {
    icon: <Okay />,
    title: "지원 가능",
    description:
      "님이 지원할 수 있는 공고예요\n놓치지 않게 지금 바로 챙겨보세요!",
    bgClass: "bg-[linear-gradient(180deg,_#EBF9F1_0%,_#FFF_100%)]",
  },
  INELIGIBLE: {
    icon: <No />,
    title: "지원 불가능",
    description:
      "아쉽지만 이번 공고는 신청 대상이 아니에요\n님에게 더 잘 맞는 공고를 확인해 볼까요?",
    bgClass: "bg-[linear-gradient(180deg,_#FFF3F6_0%,_#FFF_100%)]",
  },
  PENDING: {
    icon: <Question />,
    title: "결과 보류",
    description:
      "님에게 꼭 맞는 공고인지 확인하려면\n자격 정보가 조금 더 필요해요",
    bgClass: "bg-[linear-gradient(180deg,_#ECEFF1_0%,_#FFF_100%)]",
  },
} as const;
