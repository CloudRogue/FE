import type { z } from "zod";
import type { bannerResponseSchema } from "./home.schema";

export type BannerData = z.infer<typeof bannerResponseSchema>;
