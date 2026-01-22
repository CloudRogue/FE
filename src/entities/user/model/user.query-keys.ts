export const USER_QUERY_KEYS = {
  all: ["user"] as const,
  profile: () => [...USER_QUERY_KEYS.all, "profile"] as const,
  detail: () => [...USER_QUERY_KEYS.all, "detail"] as const,
};
