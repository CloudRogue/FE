import type { MyPageEligibilityAnswer } from "@/src/entities/mypage-eligibility";

import cn from "@/src/shared/lib/cn";

import Input from "@/src/shared/ui/input";
import Select from "@/src/shared/ui/select";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
} from "@/src/shared/ui/dropdown";

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

  const CONTROL_WRAP = "w-[160px] flex justify-end";

  const fieldBoxClass = cn(
    "w-full",
    "h-[28px]",
    "px-4",
    "rounded-md",
    "border border-gray-100",
    "bg-gray-white",
    "shadow-button",
    "text-body2",
    "text-center",
    "focus:outline-none",
  );

  function getBooleanLabels(): [string, string] {
    if (Array.isArray(options) && options.length === 2) {
      return [options[0], options[1]];
    }
    return ["아니오", "예"];
  }

  function getMultiDisplay(selected: string[]) {
    if (selected.length === 0) return "선택";
    const text = selected.join(", ");
    if (text.length > 10) return `${selected.length}개 선택`;
    return text;
  }

  return (
    <li
      className={cn(
        "grid",
        "grid-cols-[auto_1fr]",
        "items-center",
        "gap-x-6",
        "gap-y-2",
        "py-2",
      )}
    >
      <span className="text-h5 font-semibold text-gray-black">{title}</span>

      <div className="flex justify-end">
        {type === "TEXT_INPUT" && (
          <div className={CONTROL_WRAP}>
            <Input
              type="text"
              value={typeof value === "string" ? value : ""}
              onChange={(e) => onChange(e.target.value)}
              className={fieldBoxClass}
            />
          </div>
        )}

        {type === "NUMBER_INPUT" && (
          <div className={CONTROL_WRAP}>
            <Input
              type="number"
              value={typeof value === "number" ? value : ""}
              onChange={(e) => {
                const next = e.target.value;
                if (next === "") return;
                onChange(Number(next));
              }}
              className={fieldBoxClass}
            />
          </div>
        )}

        {type === "DATE" && (
          <div className={CONTROL_WRAP}>
            <Input
              type="date"
              value={typeof value === "string" ? value : ""}
              onChange={(e) => onChange(e.target.value)}
              className={fieldBoxClass}
            />
          </div>
        )}

        {type === "BOOLEAN" && (
          <div className={CONTROL_WRAP}>
            <div
              className={cn(
                fieldBoxClass,
                "p-0",
                "flex items-center justify-center",
              )}
            >
              {(() => {
                const [falseLabel, trueLabel] = getBooleanLabels();
                const selectedLabel =
                  typeof value === "boolean"
                    ? value
                      ? trueLabel
                      : falseLabel
                    : falseLabel;

                return (
                  <Select
                    value={selectedLabel}
                    onChange={(e) => onChange(e.target.value === trueLabel)}
                    className={cn(
                      "h-full w-full",
                      "bg-transparent",
                      "border-0",
                      "text-center",
                      "appearance-none",
                      "focus:outline-none",
                    )}
                  >
                    <option value={falseLabel}>{falseLabel}</option>
                    <option value={trueLabel}>{trueLabel}</option>
                  </Select>
                );
              })()}
            </div>
          </div>
        )}

        {type === "SELECT_SINGLE" && (
          <div className={CONTROL_WRAP}>
            <div className={cn(fieldBoxClass, "p-0", "flex items-center")}>
              <Select
                value={typeof value === "string" ? value : ""}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                  "h-full w-full",
                  "bg-transparent",
                  "border-0",
                  "text-center",
                  "focus:outline-none",
                )}
              >
                {(options ?? []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        )}
        {type === "SELECT_MULTI" && (
          <div className={CONTROL_WRAP}>
            {(() => {
              const current = Array.isArray(value) ? value : [];
              const opts = options ?? [];

              return (
                <div className="w-40">
                  <Dropdown>
                    <DropdownTrigger>
                      <button
                        type="button"
                        className={cn(
                          fieldBoxClass,
                          "w-40 min-w-40",
                          "px-3",
                          "flex items-center justify-center gap-2",
                        )}
                      >
                        <span className="truncate">
                          {getMultiDisplay(current)}
                        </span>
                        <span className="text-gray-400">▾</span>
                      </button>
                    </DropdownTrigger>

                    <DropdownContent className={cn("w-40", "border-0")}>
                      {opts.map((opt) => {
                        const selected = current.includes(opt);

                        return (
                          <button
                            key={opt}
                            type="button"
                            role="menuitem"
                            className={cn(
                              "flex w-full items-center justify-between",
                              "px-2 py-1.5 text-sm",
                              "outline-none",
                              "hover:bg-transparent focus:bg-transparent",
                            )}
                            onClick={(e) => {
                              e.stopPropagation();

                              if (selected) {
                                onChange(current.filter((v) => v !== opt));
                                return;
                              }
                              onChange([...current, opt]);
                            }}
                          >
                            <span className="truncate">{opt}</span>
                            {selected && <span>✓</span>}
                          </button>
                        );
                      })}
                    </DropdownContent>
                  </Dropdown>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </li>
  );
}
