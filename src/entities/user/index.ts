// api
export {
  useGetProfileDetail,
} from "@/src/entities/user/api/use-user.queries";

export {
  getProfileBasic,
  getProfileDetail,
  upsertProfileDetail,
} from "@/src/entities/user/api/user.action";

// model
export {
  profileBasicSchema,
  profileAnswerSchema,
  profileDetailSchema,
  profileUpdateAnswerSchema,
} from "@/src/entities/user/model/user.schema";

export { useUserStore } from "@/src/entities/user/model/use-user-store";

export type {
  ProfileBasic,
  ProfileDetail,
  ProfileAnswer,
  ProfileUpdateAnswer,
  UserState,
} from "@/src/entities/user/model/user.types";

// lib
export { useUser } from "@/src/entities/user/lib/use-user";
