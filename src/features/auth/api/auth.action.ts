import { z } from "zod";
import { Api } from "@/src/shared/api/api";
import { useUserStore } from "@/src/entities/user";
import { USER_QUERY_KEYS } from "@/src/entities/user/model/user.query-keys";
import { queryClient } from "@/src/shared/lib/query-client";

export async function logout(): Promise<void> {
  await Api.post("/auth/logout", z.void(), undefined);

  useUserStore.getState().logout();

  queryClient.removeQueries({ queryKey: USER_QUERY_KEYS.all });
}
