export type Publisher = "LH" | "SH";

export type AdminInboxItem = {
  announcementId: number;
  publisher: Publisher;
  createdAt: string; // ISO-8601
  title: string;
};
