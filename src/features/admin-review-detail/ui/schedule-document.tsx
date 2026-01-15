// 서류 종류 업로드 컴포넌트
"use clinet";

import {
  DetailField,
  ResultDocument,
} from "@/src/features/admin-review-detail";
import Button from "@/src/shared/ui/button";
import Select from "@/src/shared/ui/select";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface ScheduleDocumentProps {
  title: string;
  documents: (string | ResultDocument)[];
  onAdd: (name: string) => void;
  onRemove: (idx: number) => void;
  hasTargetSelect?: boolean;
}

export function ScheduleDocument({
  title,
  documents,
  onAdd,
  onRemove,
  hasTargetSelect = false,
}: ScheduleDocumentProps) {
  const [inputValue, setInputValue] = useState("");
  const [target, setTarget] = useState("공통");

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    onAdd(`${inputValue}-${target}`);
    setInputValue("");
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="flex gap-2 items-end">
        <DetailField
          label={title}
          placeholder="서류명을 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          containerClassName="w-xl"
        />
        {hasTargetSelect && (
          <Select
            className="border-slate-200 font-bold text-slate-700 rounded-xl"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            options={[
              { value: "공통", label: "공통" },
              { value: "대상자만", label: "대상자만" },
            ]}
          />
        )}
        <Button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded-xl shrink-0"
        >
          <Plus size={16} className="mr-1" /> 추가
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {documents.map((doc: string | ResultDocument, idx: number) => (
          <div
            key={idx}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-100 text-blue-700 rounded-lg text-xs font-bold shadow-sm transition-all hover:border-blue-300"
          >
            {typeof doc === "string" ? doc : `${doc.name} (${doc.target})`}
            <Button
              onClick={() => onRemove(idx)}
              className="text-black hover:text-red-500 p-0 h-3.5"
            >
              <X size={14} className="h-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
