import { z } from "zod";
import { Api } from "@/src/shared/api/api";

export async function logoutAction(): Promise<void> {
  await Api.post("/api/auth/logout", z.object({}), {});
}
