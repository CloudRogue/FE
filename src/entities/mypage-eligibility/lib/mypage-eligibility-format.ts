import type { MyPageEligibilityAnswer } from "@/src/entities/mypage-eligibility";

export function formatMyPageEligibilityValue(
  answer: MyPageEligibilityAnswer,
): string {
  const { type, value } = answer;

  switch (type) {
    case "BOOLEAN":
      return value ? "예" : "아니오";

    case "DATE":
      return value;

    case "NUMBER_INPUT":
      return value.toLocaleString();

    case "SELECT_MULTI":
      return value.join(", ");

    case "SELECT_SINGLE":
    case "TEXT_INPUT":
      return String(value);

    default:
      return "";
  }
}
