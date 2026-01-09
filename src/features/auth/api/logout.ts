import { z } from "zod";
import { Api } from "@/src/shared/api/api";
import { useUserStore } from "@/src/entities/user";

export async function logoutAction(): Promise<void> {
  await Api.post("/api/auth/logout", z.object({}), {});
  useUserStore.getState().clearUser();
}
