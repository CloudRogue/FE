import { z } from "zod";

const GenderValues = ["MALE", "FEMALE", "OTHER", "UNKNOWN"] as const;
const HouseholdRoleValues = ["HOUSEHOLDER", "MEMBER"] as const;

export const onboardingSchema = z.object({
  name: z.string().min(1, "이름은 필수입니다"),

  gender: z.enum(GenderValues, {
    message: "성별은 필수입니다",
  }),

  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "생년월일 형식이 올바르지 않습니다"),

  regionSigungu: z.string().min(1, "거주 지역은 필수입니다"),

  householdSize: z.number().int().min(1, "가구원 수는 1명 이상이어야 합니다"),

  householdRole: z.enum(HouseholdRoleValues, {
    message: "세대 내 역할은 필수입니다",
  }),

  incomeDecile: z
    .number()
    .int()
    .min(1, "소득분위는 1 이상이어야 합니다")
    .max(10, "소득분위는 10 이하여야 합니다"),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

export type OnboardingDraft = {
  name?: string;

  gender?: "male" | "female";

  birthYear?: string;
  birthMonth?: string;
  birthDay?: string;

  regionCity?: string;
  regionDistrict?: string;

  householdSize?: number;
  householdRole?: "householder" | "member";

  monthlyIncome?: number;
  incomeDecile?: number;
};
