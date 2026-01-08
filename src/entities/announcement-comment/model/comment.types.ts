import { z } from "zod";

// 댓글 작성자 정보
export const CommentAuthorSchema = z.object({
  userId: z.string(),
});

// 개별 댓글 상세 정보
export const CommentSchema = z.object({
  id: z.number().int(), // 댓글 PK <int64>
  announcementId: z.string(), // 공고 ID (string 형식 예시 반영)
  parentId: z.number().int(), // 부모 댓글 PK (0이면 질문, 0보다 크면 답변)
  kind: z.enum(["QUESTION", "ANSWER"]), // 댓글 유형 (질문/답변)
  content: z.string(), // 댓글 내용 (필터링 시 마스킹 처리됨)
  contentFilter: z.enum([
    "NONE",
    "PROFANITY",
    "SEXUAL",
    "PERSONAL_INFO",
    "SPAM",
  ]), // 콘텐츠 필터링 상태
  likeCount: z.number().int(), // 좋아요 수
  reportCount: z.number().int(), // 누적 신고 수
  deleted: z.boolean(), // 소프트 삭제 여부
  deletedAt: z.string().datetime().nullable(), // 삭제 시각 (삭제되지 않았다면 null)
  createdAt: z.string().datetime(), // 생성 시각
  updatedAt: z.string().datetime().nullable(), // 수정 시각 (수정 없으면 null)
  author: CommentAuthorSchema, // 작성자 정보
});

// 댓글 목록 조회 쿼리 파라미터
export const CommentListQuerySchema = z.object({
  page: z.number().int().min(0).default(0), // 0부터 시작하는 페이지 번호
  size: z.number().int().min(1).max(50).default(20), // 페이지 크기
  sort: z.enum(["LATEST", "POPULAR"]).default("LATEST"), // 정렬 기준
});

// 댓글 목록 API 응답 (PageMeta 포함)
export const CommentListResponseSchema = z.object({
  items: z.array(CommentSchema),
  meta: z.object({
    page: z.number().int(), // 현재 페이지 번호
    size: z.number().int(), // 페이지 크기
    totalElements: z.number().int(), // 전체 아이템 수
    totalPages: z.number().int(), // 전체 페이지 수
  }),
});

export type Comment = z.infer<typeof CommentSchema>;
export type CommentAuthor = z.infer<typeof CommentAuthorSchema>;
export type CommentListQuery = z.infer<typeof CommentListQuerySchema>;
export type CommentListResponse = z.infer<typeof CommentListResponseSchema>;
export type CommentKind = z.infer<typeof CommentSchema>["kind"];
