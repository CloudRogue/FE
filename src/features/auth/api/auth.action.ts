import { z } from "zod";
import { Api } from "@/src/shared/api/api";
import { useUserStore } from "@/src/entities/user";

export async function logout(): Promise<void> {
  await Api.post("/auth/logout", z.any(), {});
  useUserStore.getState().clearUser();
}
