import { create } from "zustand";

interface AdminStepperState {
  step: number;
  setStep: (step: number) => void;
}

export const useAdminStepperStore = create<AdminStepperState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
}));
