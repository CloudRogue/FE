import type { MyPageEligibilityAnswer } from "@/src/entities/mypage-eligibility";

import Input from "@/src/shared/ui/input";
import Select from "@/src/shared/ui/select";
import Checkbox from "@/src/shared/ui/checkbox";
import Label from "@/src/shared/ui/label";

type AnswerValue = string | number | boolean | string[];

type Props = {
  answer: MyPageEligibilityAnswer;
  value: AnswerValue | undefined;
  onChange: (next: AnswerValue) => void;
};

export default function MyPageEligibilityEditableRow({
  answer,
  value,
  onChange,
}: Props) {
  const { type, title, options } = answer;

  return (
    <li className="flex h-8 items-center justify-between gap-4">
      <span className="shrink-0 text-slate-600">{title}</span>

      <div className="min-w-40 md:min-w-50 flex justify-end">
        {type === "TEXT_INPUT" && (
          <Input
            type="text"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border-b border-gray-400 text-right text-slate-900 focus:outline-none"
          />
        )}

        {type === "NUMBER_INPUT" && (
          <Input
            type="number"
            value={typeof value === "number" ? value : ""}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full border-b border-gray-400 text-right text-slate-900 focus:outline-none"
          />
        )}

        {type === "DATE" && (
          <Input
            type="date"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border-b border-gray-400 text-right text-slate-900 focus:outline-none"
          />
        )}

        {type === "BOOLEAN" &&
          (() => {
            const id = `mypage-eligibility-${answer.id}`;

            return (
              <div className="flex items-center gap-2 text-slate-900">
                <Checkbox
                  id={id}
                  checked={typeof value === "boolean" ? value : false}
                  onChange={(e) => onChange(e.target.checked)}
                />

                <Label htmlFor={id} className="text-sm cursor-pointer">
                  {typeof value === "boolean" && value ? "예" : "아니오"}
                </Label>
              </div>
            );
          })()}

        {type === "SELECT_SINGLE" && (
          <Select
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border-b border-gray-400 bg-transparent text-right text-slate-900 focus:outline-none"
          >
            {(options ?? []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        )}

        {type === "SELECT_MULTI" && (
          <div className="flex flex-wrap justify-end gap-2">
            {(options ?? []).map((opt) => {
              const selected = Array.isArray(value)
                ? value.includes(opt)
                : false;

              const id = `mypage-eligibility-${answer.id}-${opt}`;

              return (
                <div key={opt} className="flex items-center gap-1 text-sm">
                  <Checkbox
                    id={id}
                    checked={selected}
                    onChange={(e) => {
                      const current = Array.isArray(value) ? value : [];
                      if (e.target.checked) {
                        onChange([...current, opt]);
                        return;
                      }
                      onChange(current.filter((v) => v !== opt));
                    }}
                  />

                  <Label htmlFor={id} className="cursor-pointer">
                    {opt}
                  </Label>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </li>
  );
}
