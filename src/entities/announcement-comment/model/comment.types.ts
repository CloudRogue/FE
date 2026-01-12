import { z } from "zod";

// 댓글 유형 및 필터 상태 Enum
export const CommentKindSchema = z.enum(["QUESTION", "ANSWER"]);
export const ContentFilterSchema = z.enum([
  "NONE",
  "PROFANITY",
  "SEXUAL",
  "PERSONAL_INFO",
  "SPAM",
]);

// 작성자 정보
export const CommentAuthorSchema = z.object({
  userId: z.string(),
});

// 개별 댓글 아이템 스키마
export const CommentItemSchema = z.object({
  id: z.number(),
  announcementId: z.number(),
  parentId: z.number(),
  kind: CommentKindSchema,
  content: z.string(),
  contentFilter: ContentFilterSchema,
  likeCount: z.number(),
  reportCount: z.number(),
  deleted: z.boolean(),
  deletedAt: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  author: CommentAuthorSchema,
});

// 메타 정보
export const PageMetaSchema = z.object({
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

// 댓글 목록 전체 응답 스키마
export const CommentListResponseSchema = z.object({
  items: z.array(CommentItemSchema),
  meta: PageMetaSchema,
});

export type CommentItem = z.infer<typeof CommentItemSchema>;
export type CommentListResponse = z.infer<typeof CommentListResponseSchema>;
