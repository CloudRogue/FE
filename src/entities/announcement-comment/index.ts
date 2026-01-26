// api
export { useAnnouncementComments } from "@/src/entities/announcement-comment/api/announcement-comment.action";

// model
export {
  CommentAuthorSchema,
  CommentItemSchema,
  CommentKindSchema,
  CommentListResponseSchema,
  ContentFilterSchema,
  PageMetaSchema,
} from "@/src/entities/announcement-comment/model/announcement-comment.schema";
export {
  type CommentItem,
  type CommentListResponse,
} from "@/src/entities/announcement-comment/model/announcement-comment.types";

// ui
export { CommentCard } from "@/src/entities/announcement-comment/ui/comment-card";
