// api
export { useAnnouncementComments } from "@/src/entities/announcement-comment/api/queries";

// model
export {
  CommentAuthorSchema,
  CommentListQuerySchema,
  CommentListResponseSchema,
  CommentSchema,
  type Comment,
  type CommentAuthor,
  type CommentKind,
  type CommentListQuery,
  type CommentListResponse,
} from "@/src/entities/announcement-comment/model/comment.types";

// ui
export { CommentCard } from "@/src/entities/announcement-comment/ui/comment-card";
