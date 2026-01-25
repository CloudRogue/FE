import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationQueries } from "@/src/entities/notification/api/notification.query";

export const useUpdateNotification = (type: "kakao" | "email") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enabled: boolean) => {
      await fetch(`/mypage/notification-settings/${type}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueries[type].queryKey,
      });
    },
  });
};

export const useUpdateReminder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      sendAtHour: number | null;
      daysBefore: number | null;
    }) => {
      const response = await fetch(
        "/mypage/notification-settings/reminder-settings",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        },
      );

      if (!response.ok) throw new Error("Failed to update reminder");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueries.reminder.queryKey,
      });
    },
  });
};
