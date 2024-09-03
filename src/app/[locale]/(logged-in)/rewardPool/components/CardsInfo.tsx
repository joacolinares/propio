"use client";
import React from "react";
import ReferralIcon from "@/assets/icons/myReferral.svg";
import ClaimedIcon from "@/assets/icons/claimedReward.svg";
import { CardInfoRewardData } from "./moskData";
import Image from "next/image";
import { useTranslations } from "next-intl";

const CardsInfo = ({ cardsInfo }: { cardsInfo: CardInfoRewardData }) => {
  const t = useTranslations();

  return (
    <div className="component-cardsInfo mx-[24px] my-[32px] p-2 rounded-[20px] border-solid border-[1px] border-[#AD98FF]">
      <div className="container-up mb-2 flex items-center justify-evenly">
        <div className="container-referral p-4 rounded-[16px] shadow-sm w-[145px]">
          <div className="container-icon mb-4 mx-auto p-3 w-[48px] h-[48px] rounded-full bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
            <Image src={ReferralIcon} alt="referral" width={24} height={24} />
          </div>
          <h3 className="text-center text-[16px] font-bold mb-2">$ 0</h3>
          <p className="text-center text-[14px]">{t("My Referral Rewards")}</p>
        </div>
        <div className="container-claimed p-4 rounded-[16px] shadow-sm w-[145px]">
          <div className="container-icon  mb-4 mx-auto p-3 w-[48px] h-[48px] rounded-full bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
            <Image src={ClaimedIcon} alt="claimed" width={24} height={24} />
          </div>
          <h3 className="text-center text-[16px] font-bold mb-2">$ 0</h3>
          <p className="text-center text-[14px]">{t("Claimed Rewards")}</p>
        </div>
      </div>

      <div className="container-down flex items-center justify-evenly">
        <div className="container-available p-4 rounded-[16px] shadow-sm w-[145px]">
          <h3 className="text-center text-[16px] font-bold mb-2">$ 0</h3>
          <p className="text-center text-[14px]">{t("Available Rewards")}</p>
        </div>
        <div className="container-claimed p-4 rounded-[16px] shadow-sm w-[145px]">
          <h3 className="text-center text-[16px] font-bold mb-2">$ 0</h3>
          <p className="text-center text-[14px]">{t("Future Rewards")}</p>
        </div>
      </div>
    </div>
  );
};

export default CardsInfo;
