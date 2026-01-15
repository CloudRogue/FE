// 서류 리스트 박스
interface PreviewDocumentListProps {
  label: string;
  items: string[];
}

export function PreviewDocumentList({
  label,
  items,
}: PreviewDocumentListProps) {
  if (items.length === 0) return null;
  return (
    <div className="bg-[#F8FAFF] p-5 rounded-xl border border-blue-50">
      <span className="text-[13px] font-bold text-slate-400 block mb-2">
        {label}:
      </span>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-[13px] text-slate-600 font-medium">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
