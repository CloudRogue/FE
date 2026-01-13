import { ROUTES } from "@/src/shared/constants/routes";
import Card from "@/src/shared/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function MypageRecentPage() {
  const title =
    "송파구 위례지구 A1-1블록 국민임대주택 입주자 모집 공고 (추가 및 잔여 공가)";
  const imageUrl = null;

  return (
    <div className="min-h-full bg-slate-50  p-4">
      <Link href={ROUTES.ANNOUNCEMENT_DETAIL(String(1))}>
        <Card className="flex">
          <div className="flex flex-col justify-between flex-1">
            <h3 className="text-[16px] font-bold text-slate-800 leading-snug break-keep line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-slate-400 mt-2">2026.01.13 열람</p>
          </div>
          <div className="relative w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${title} 썸네일`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300">
                No Image
              </div>
            )}
          </div>
        </Card>
      </Link>
    </div>
  );
}
