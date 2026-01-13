import { z } from "zod";

export const PageMetaSchema = z.object({
  page: z.number().int().describe("0부터 시작하는 페이지 번호"),
  size: z.number().int().describe("페이지 크기"),
  totalElements: z.number().int().describe("전체 아이템 수"),
  totalPages: z.number().int().describe("전체 페이지 수"),
});

export const ErrorResponseSchema = z.object({
  code: z.string().describe("에러 코드"),
  message: z.string().describe("에러 메시지"),
  status: z.number().int().describe("HTTP 상태 코드"),
  details: z.record(z.string(), z.unknown()).nullable().optional(),
});

export type PageMeta = z.infer<typeof PageMetaSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
