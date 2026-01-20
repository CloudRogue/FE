import { z } from "zod";

// Todo 추가 요청 스키마
export const TodoCreateRequestSchema = z.object({
  announcementId: z.number().nullable(), // 연결할 공고 ID
  title: z.string().min(1, "제목은 필수입니다"), // Todo 제목
  dueDate: z.string().nullable(), // 마감일 (ISO Date)
});

// Todo 추가 응답 스키마
export const TodoCreateResponseSchema = z.object({
  id: z.number(), // 생성된 Todo PK
  createdAt: z.string(), // 생성 시각
  updatedAt: z.string(), // 수정 시각
});
