interface PreviewRowProps {
  label: string;
  value: string | string[];
  vertical?: boolean;
  badge?: boolean;
}

export function PreviewRow({
  label,
  value,
  vertical = false,
  badge = false,
}: PreviewRowProps) {
  const isEmpty = !value || (Array.isArray(value) && value.length === 0);
  return (
    <li
      className={`flex ${vertical ? "flex-col items-start" : "justify-between items-center"} py-2 text-[15px]`}
    >
      <span className="text-gray-500 shrink-0">{label}</span>
      <div
        className={`${vertical ? "mt-1" : "text-right ml-4"} text-black break-all`}
      >
        {isEmpty ? (
          "-"
        ) : badge && Array.isArray(value) ? (
          <div className="flex flex-wrap gap-2 mt-1">
            {value.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-white text-blue-600 border border-blue-600 rounded-lg text-[13px] font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        ) : Array.isArray(value) ? (
          value.join(", ")
        ) : (
          value
        )}
      </div>
    </li>
  );
}
