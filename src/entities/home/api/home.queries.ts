import { useQuery } from "@tanstack/react-query";
import { getHomeBanner } from "@/src/entities/home/api/home.action";

export const HOME_QUERY_KEYS = {
  all: ["home"] as const,
  banner: () => [...HOME_QUERY_KEYS.all, "banner"] as const,
};

export const useGetHomeBanner = () => {
  return useQuery({
    queryKey: HOME_QUERY_KEYS.banner(),
    queryFn: getHomeBanner,
  });
};
