import Card from "@/src/shared/ui/card";
import { Toggle } from "@/src/shared/ui/toggle";

export default function AlarmPage() {
  return (
    <div className="p-4">
      <Card className="flex flex-col gap-4">
        {/* 카카오 알림 */}
        <div className="flex justify-between">
          <p className="text-h2">카카오 알림</p>
          <Toggle />
        </div>

        {/* 공고 마감 3일전 */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-h5">공고 마감 3일전</p>
            <p className="text-caption2">알림에 대한 설명</p>
          </div>
          <Toggle />
        </div>

        {/* 알림 A */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-h5">알림 A</p>
            <p className="text-caption2">알림 A에 대한 설명</p>
          </div>
          <Toggle />
        </div>
      </Card>
    </div>
  );
}
