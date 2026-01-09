import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "UNKNOWN"]),
  birthDate: z.string(),
  regionSigungu: z.string(),
  householdSize: z.number().int().min(1),
  isHouseholder: z.boolean(),
  householdRole: z.enum(["HOUSEHOLDER", "MEMBER"]),
  incomeDecile: z.number().int().min(1).max(10),
  onboardingCompleted: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUserInfo: (user: User) => void;
  clearUser: () => void;
}
