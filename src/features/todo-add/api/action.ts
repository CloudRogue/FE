"use server";

import { TodoCreateResponseSchema } from "@/src/features/todo-add/model/todo-add.types";
import { Api } from "@/src/shared/api/api";

export async function postAddTodo(payload: {
  announcementId: number | null;
  title: string;
  dueDate: string | null;
}) {
  return await Api.post("/todos", TodoCreateResponseSchema, payload);
}
