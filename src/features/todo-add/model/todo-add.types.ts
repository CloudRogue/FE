import {
  TodoCreateRequestSchema,
  TodoCreateResponseSchema,
} from "@/src/features/todo-add";
import { z } from "zod";

export type TodoCreateRequest = z.infer<typeof TodoCreateRequestSchema>;
export type TodoCreateResponse = z.infer<typeof TodoCreateResponseSchema>;
