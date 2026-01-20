// api
export { useAnnouncementComments } from "@/src/entities/announcement-comment/api/queries";

// model
export {
  CommentAuthorSchema,
  CommentItemSchema,
  CommentKindSchema,
  CommentListResponseSchema,
  ContentFilterSchema,
  PageMetaSchema,
  type CommentItem,
  type CommentListResponse,
} from "@/src/entities/announcement-comment/model/comment.types";

// ui
export { CommentCard } from "@/src/entities/announcement-comment/ui/comment-card";
