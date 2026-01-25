export type NotificationSetting = {
  enabled: boolean;
};

export type ReminderSetting = {
  enabled: boolean;
  sendAtHour: number | null;
  daysBefore: number | null;
};
