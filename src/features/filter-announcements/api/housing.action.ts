import { Api } from "@/src/shared/api/api";
import { z } from "zod";


export const PublisherFiltersSchema = z.object({
  publishers: z.array(z.enum(["LH", "SH"])),
});

export const getPublisherFilters = () =>
  Api.get("/announcements/filters/publishers", PublisherFiltersSchema);
