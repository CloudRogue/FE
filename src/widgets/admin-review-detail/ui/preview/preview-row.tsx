interface PreviewRowProps {
  label: string;
  value: React.ReactNode;
  vertical?: boolean;
  badge?: boolean;
}

export function PreviewRow({
  label,
  value,
  vertical = false,
  badge = false,
}: PreviewRowProps) {
  const rowValue = value || "-";
  return (
    <li
      className={`flex ${vertical ? "flex-col items-start" : "justify-between items-center"} py-2 text-[15px]`}
    >
      <span className="text-gray-500 shrink-0">{label}</span>
      <div
        className={`${vertical ? "mt-1" : "text-right ml-4"} text-black break-all`}
      >
        {badge ? (
          <span className="flex flex-wrap mt-2 p-2 bg-white text-blue-600 border border-blue-600 rounded-lg text-[13px]">
            rowValue
          </span>
        ) : (
          rowValue
        )}
      </div>
    </li>
  );
}
