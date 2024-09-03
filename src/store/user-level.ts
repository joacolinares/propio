import { create } from "zustand";

export interface DataMembers {
  level: number | null;
  numberOfMembers: number | null;
  totalStaking: string;
  residual: string;
  membersInfo?: {
    wallet: string;
    nameUser: string;
    sponsor: string;
    totalStaking: string;
    walletInfo: {
      status: string;
      period: string;
      investment: number | null;
      startDate: string;
    }[];
  }[];
}

interface DataMembersActions {
  selectPlan: (userPlan: DataMembers) => void;
}

export const useUserLevelStore = create<DataMembers & DataMembersActions>(
  (set) => ({
    level: null,
    numberOfMembers: null,
    totalStaking: "",
    residual: "",
    membersInfo: [
      {
        wallet: "",
        nameUser: "",
        sponsor: "",
        totalStaking: "",
        walletInfo: [
          {
            status: "",
            period: "",
            investment: null,
            startDate: "",
          },
        ],
      },
    ],
    selectPlan: (value) =>
      set((state) => ({
        ...state,
        ...value,
      })),
  })
);
