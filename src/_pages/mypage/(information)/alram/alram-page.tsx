"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationQueries } from "@/src/entities/notification/api/notification.query";
import {
  useUpdateNotification,
  useUpdateReminder,
} from "@/src/features/manage-notification/model/use-update-settings";
import Card from "@/src/shared/ui/card";
import { Toggle } from "@/src/shared/ui/toggle";
import cn from "@/src/shared/lib/cn";

interface SettingRowProps {
  title: string;
  description?: string;
  active: boolean;
  onToggle: (val: boolean) => void;
  isDisabled: boolean;
}

const SettingRow = ({
  title,
  description,
  active,
  onToggle,
  isDisabled,
}: SettingRowProps) => (
  <div
    className={cn(
      "flex justify-between items-start gap-4 py-2 w-full",
      isDisabled && "opacity-60 transition-opacity",
    )}
  >
    <div className="flex flex-col gap-1 flex-1 min-w-0">
      <p className="text-h5 text-gray-900 break-words">{title}</p>
      {description && (
        <p className="text-caption2 text-gray-500 whitespace-pre-wrap break-words">
          {description}
        </p>
      )}
    </div>
    <div className="flex-shrink-0 pt-1">
      <Toggle active={active} onActiveChange={onToggle} disabled={isDisabled} />
    </div>
  </div>
);

export default function AlarmPage() {
  const { data: kakao, isLoading: isKakaoLoading } = useQuery(
    notificationQueries.kakao,
  );
  const { data: email, isLoading: isEmailLoading } = useQuery(
    notificationQueries.email,
  );
  const { data: reminder, isLoading: isReminderLoading } = useQuery(
    notificationQueries.reminder,
  );

  const { mutate: updateKakao, isPending: isKakaoUpdating } =
    useUpdateNotification("kakao");
  const { mutate: updateEmail, isPending: isEmailUpdating } =
    useUpdateNotification("email");
  const { mutate: updateReminder, isPending: isReminderUpdating } =
    useUpdateReminder();

  return (
    <div className="p-4 flex flex-col gap-6 max-w-2xl mx-auto w-full">
      <section className="flex flex-col gap-3 w-full">
   
        <Card className="flex flex-col gap-5 p-5 w-full">
          <SettingRow
            title="카카오 알림톡"
            description="카카오톡을 통해 공고 소식 및 주요 알림을 받습니다."
            active={kakao?.enabled ?? false}
            onToggle={updateKakao}
            isDisabled={isKakaoLoading || isKakaoUpdating}
          />

          <div className="h-[1px] bg-gray-50 w-full" />

          <SettingRow
            title="이메일 알림"
            description="등록된 계정 이메일로 주요 정보를 받아봅니다."
            active={email?.enabled ?? false}
            onToggle={updateEmail}
            isDisabled={isEmailLoading || isEmailUpdating}
          />

          <div className="h-[1px] bg-gray-50 w-full" />

          <SettingRow
            title={`공고 마감 ${reminder?.daysBefore ?? 3}일 전 리마인더`}
            description={`${reminder?.sendAtHour ?? 9}시에 마감 임박 공고 요약을 보냅니다.`}
            active={reminder?.enabled ?? false}
            onToggle={(checked) => {
              updateReminder({
                daysBefore: checked ? (reminder?.daysBefore ?? 3) : null,
                sendAtHour: checked ? (reminder?.sendAtHour ?? 9) : null,
              });
            }}
            isDisabled={isReminderLoading || isReminderUpdating}
          />
        </Card>
      </section>
    </div>
  );
}
