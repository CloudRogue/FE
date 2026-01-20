import {
  CommentItemSchema,
  CommentListResponseSchema,
} from "@/src/entities/announcement-comment";
import { z } from "zod";

export type CommentItem = z.infer<typeof CommentItemSchema>;
export type CommentListResponse = z.infer<typeof CommentListResponseSchema>;
