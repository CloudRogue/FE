import type { CommentItem } from "@/src/entities/announcement-comment";
import Button from "@/src/shared/ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/src/shared/ui/dropdown";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface CommentCardProps {
  comment: CommentItem;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function CommentCard({ comment, onEdit, onDelete }: CommentCardProps) {
  const maskedId = `${comment.author.userId.slice(0, 2)}****`;
  const formattedDate = comment.createdAt.split("T")[0].replaceAll("-", ".");

  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <span className="text-sm font-bold text-gray-600">{maskedId}</span>
        <Dropdown>
          <DropdownTrigger>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
              <MoreHorizontal size={18} />
            </button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem
              onClick={() => onEdit?.(comment.id)}
              className="flex items-center gap-2"
            >
              <Pencil size={14} />
              <span>수정하기</span>
            </DropdownItem>
            <DropdownItem
              onClick={() => onDelete?.(comment.id)}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 size={14} />
              <span>삭제하기</span>
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>

      <span className="text-xs text-gray-400">{formattedDate}</span>

      <p className="text-[15px] text-gray-800 leading-relaxed break-all">
        {comment.content}
      </p>

      {/* NOTE: 와이어프레임 없음 */}
      <div className="flex justify-end">
        <Button>답글</Button>
        <Button>답글 달기</Button>
      </div>
    </div>
  );
}
