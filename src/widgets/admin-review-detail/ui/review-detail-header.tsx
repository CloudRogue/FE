import Link from "next/link";

interface ReviewDetailHeaderProps {
  title: string;
  announcementId: string;
  applyUrl: string;
}

export function ReviewDetailHeader({
  title,
  announcementId,
  applyUrl,
}: ReviewDetailHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <Link
            href={applyUrl}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            원문 보기
          </Link>
        </div>
        <p className="text-slate-400 text-sm">공고 ID: ${announcementId}</p>
      </div>
    </div>
  );
}
