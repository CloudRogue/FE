export type AnnoucemetStatus =
  | "접수전"
  | "접수중"
  | "발표대기"
  | "예정"
  | string;

export interface Announcement {
  id: number;
  status: AnnoucemetStatus;
  statusColor: "red" | "blue" | "gray";
  tags: string[];
  startDate: string;
  endDate: string;
  imageUrl?: string;
  isLiked: boolean;
}
