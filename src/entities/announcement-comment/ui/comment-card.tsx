import { Comment } from "../model/comment.types";

export function CommentCard({ comment }: { comment: Comment }) {
  const maskedId = `${comment.author.userId.slice(0, 2)}****`;
  const formattedDate = comment.createdAt.split("T")[0].replaceAll("-", ".");

  return (
    <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-bold text-gray-600">{maskedId}</span>
        <span className="text-xs text-gray-400">{formattedDate}</span>
      </div>
      <p className="text-[15px] text-gray-800 leading-relaxed break-all">
        {comment.content}
      </p>
    </div>
  );
}
