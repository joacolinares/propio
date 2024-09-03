export interface CardInfoRewardData {
  myReferral: string;
  claimed: string;
  available: string;
  future: string;
}

export interface ReferralUserData {
    id: number;
    fecha: string;
    level: number;
    status: string;
}

export interface CommissionsUserData {
    id: number;
    fecha: string;
    level: number;
    amount: number;
}

export const cardInfoRewardData: CardInfoRewardData = {
  myReferral: "58.00",
  claimed: "87.00",
  available: "258.00",
  future: "2,258.00",
};

export const referralUsersData: ReferralUserData[] = Array.from({ length: 0 }, (_, index) => {
  const status = index % 2 === 0 ? "Active" : "Inactive";
  return {
    id: 2000003232 + index,
    fecha: `10/10/2023`,
    level: 1,
    status,
  };
});

export const commissionsUsersData: CommissionsUserData[] = Array.from({ length: 0 }, (_, index) => {
    return {
      id: 2000003232 + index,
      fecha: `10/10/2023`,
      level: 1,
      amount: 26.54
    };
  });
