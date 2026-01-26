import type {
  NotificationSetting,
  ReminderSetting,
} from "@/src/entities/notification/model/notification.types.ts";

export const notificationQueries = {
  kakao: {
    queryKey: ["notification", "kakao"] as const,
    queryFn: async (): Promise<NotificationSetting> => {
      const res = await fetch("/mypage/notification-settings/kakao");
      return res.json();
    },
  },
  email: {
    queryKey: ["notification", "email"] as const,
    queryFn: async (): Promise<NotificationSetting> => {
      const res = await fetch("/mypage/notification-settings/email");
      return res.json();
    },
  },
  reminder: {
    queryKey: ["notification", "reminder"] as const,
    queryFn: async (): Promise<ReminderSetting> => {
      const res = await fetch(
        "/mypage/notification-settings/reminder-settings",
      );
      return res.json();
    },
  },
};
