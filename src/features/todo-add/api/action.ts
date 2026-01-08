"use server";

import { AnnouncementDetail } from "@/src/entities/announcement-detail";
import { TodoCreateResponseSchema } from "@/src/features/todo-add";
import { Api } from "@/src/shared/api/api";

export async function postAddTodo(payload: {
  announcementId: AnnouncementDetail["announcementId"] | null;
  title: string;
  dueDate: string | null;
}) {
  return await Api.post("/todos", TodoCreateResponseSchema, payload);
}
