export default function PolicyCard() {
  return (
    <article className="flex gap-4 rounded-xl bg-white p-4 shadow-sm">
      <div className="flex-1 space-y-1">
        <span className="text-xs text-gray-400">공급주체</span>
        <h3 className="font-medium">주거 정책 타이틀</h3>
        <p className="text-sm text-gray-500">2000.00.00 ~ 2000.00.00</p>
      </div>

      <div className="h-16 w-16 rounded-md bg-gray-200" />
    </article>
  );
}
