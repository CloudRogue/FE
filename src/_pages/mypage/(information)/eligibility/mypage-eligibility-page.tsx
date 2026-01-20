"use client";

import Button from "@/src/shared/ui/button";
import Card from "@/src/shared/ui/card";
import { useState } from "react";

// 분리 필요
type AnswerValue = string | number | boolean | string[];
interface OnboardingAnswer {
  id: number;
  title: string;
  type:
    | "SELECT_SINGLE"
    | "SELECT_MULTI"
    | "DATE"
    | "TEXT_INPUT"
    | "NUMBER_INPUT"
    | "BOOLEAN";
  options: string[] | null;
  value: AnswerValue;
}
interface OnboardingData {
  requiredOnboardingAnswers: OnboardingAnswer[];
  additionalOnboardingAnswers: OnboardingAnswer[];
}

export default function MyPageEligibilityPage() {
  const [data, setData] = useState(MOCK_DATA as OnboardingData);

  const [editStatus, setEditStatus] = useState({
    required: false,
    additional: false,
  });

  const handleInputChange = (
    section: keyof OnboardingData,
    id: number,
    newValue: AnswerValue,
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, value: newValue } : item,
      ),
    }));
  };

  const handleSave = (section: "required" | "additional") => {
    setEditStatus((prev) => ({ ...prev, [section]: false }));
    console.log(`${section} 저장 데이터:`, data);
  };

  return (
    <div className="space-y-6 px-6 pb-12 pt-6">
      {/* 나의 핵심 정보 */}
      <Card padding="large" shadow="sm" className="rounded-3xl border-0">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            나의 핵심 정보
          </h2>
          {/* put이니 feature로 분리 */}
          <Button
            onClick={() =>
              editStatus.required
                ? handleSave("required")
                : setEditStatus((prev) => ({ ...prev, required: true }))
            }
            className="px-0 text-sm font-medium text-blue-600"
          >
            {editStatus.required ? "저장" : "수정"}
          </Button>
        </div>

        {/* get - entities로 list로 분리 */}
        <ul className="space-y-4 text-sm">
          {data.requiredOnboardingAnswers.map((item) => (
            <InfoRow
              key={item.id}
              label={item.title}
              value={item.value}
              isEditing={editStatus.required}
              onChange={(val) =>
                handleInputChange("requiredOnboardingAnswers", item.id, val)
              }
            />
          ))}
        </ul>
      </Card>

      {/* 추가 정보 */}
      <Card padding="large" shadow="sm" className="rounded-3xl border-0">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">추가 정보</h2>
          {/* put이니 feature로 분리 */}
          <Button
            onClick={() =>
              editStatus.additional
                ? handleSave("additional")
                : setEditStatus((prev) => ({ ...prev, additional: true }))
            }
            className="px-0 text-sm font-medium text-blue-600"
          >
            {editStatus.additional ? "저장" : "수정"}
          </Button>
        </div>

        <ul className="space-y-4 text-sm">
          {/* get - entities로 list로 분리 */}
          {data.additionalOnboardingAnswers.map((item) => (
            <InfoRow
              key={item.id}
              label={item.title}
              value={item.value}
              isEditing={editStatus.additional}
              onChange={(val) =>
                handleInputChange("additionalOnboardingAnswers", item.id, val)
              }
            />
          ))}
        </ul>
      </Card>
    </div>
  );
}

// get에서 사용하니 같은 entities로 이동
interface InfoRowProps {
  label: string;
  value: AnswerValue;
  isEditing: boolean;
  onChange: (val: AnswerValue) => void;
}

function InfoRow({ label, value, isEditing, onChange }: InfoRowProps) {
  const renderValue = () => {
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "boolean") return value ? "예" : "아니오";
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
  };

  return (
    <li className="flex items-center justify-between gap-4 h-8">
      <span className="text-slate-600 shrink-0">{label}</span>
      {isEditing ? (
        <input
          type="text"
          value={Array.isArray(value) ? value.join(", ") : String(value)}
          onChange={handleChange}
          className="min-w-40 md:min-w-50 border-b border-gray-400 text-right text-slate-900 focus:outline-none"
          autoFocus
        />
      ) : (
        <span className="text-right text-slate-900">{value}</span>
      )}
    </li>
  );
}

// api 연동 이후 제거 필요
const MOCK_DATA = {
  requiredOnboardingAnswers: [
    {
      id: 100001,
      title: "성별",
      type: "SELECT_SINGLE",
      options: ["MALE", "FEMALE", "OTHER", "UNKNOWN"],
      value: "MALE",
    },
    {
      id: 100002,
      title: "생년월일",
      type: "DATE",
      options: null,
      value: "1999-01-01",
    },
    {
      id: 100003,
      title: "거주지역(시군구)",
      type: "TEXT_INPUT",
      options: null,
      value: "서울특별시 마포구",
    },
    {
      id: 100004,
      title: "결혼 여부",
      type: "BOOLEAN",
      options: null,
      value: false,
    },
    {
      id: 100005,
      title: "무주택 여부",
      type: "BOOLEAN",
      options: null,
      value: true,
    },
    {
      id: 100006,
      title: "세대 내 역할",
      type: "SELECT_SINGLE",
      options: ["HOUSEHOLDER", "MEMBER"],
      value: "HOUSEHOLDER",
    },
    {
      id: 100007,
      title: "가구원 수",
      type: "NUMBER_INPUT",
      options: null,
      value: 1,
    },
    {
      id: 100008,
      title: "가구 총 월 수입(원)",
      type: "NUMBER_INPUT",
      options: null,
      value: 4000000,
    },
  ],
  additionalOnboardingAnswers: [
    {
      id: 900001,
      title: "청약통장 정보 입력해주세요",
      type: "BOOLEAN",
      options: null,
      value: true,
    },
    {
      id: 900005,
      title: "복수 선택 질문",
      type: "SELECT_MULTI",
      options: ["옵션A", "옵션B", "옵션C"],
      value: ["옵션A", "옵션C"],
    },
  ],
};
