"use client";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import React from "react";

const RewardHeader = () => {
  const t = useTranslations();
  const copyReferralLink = () => {
    const idAccount = localStorage.getItem("idAccount");
    const baseURL = 'dapp.defily.ai';
    const referralLink = `${baseURL}/?referral=${idAccount}`;
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="reward-header px-4 py-6 rounded-[16px] border border-solid border-[#AD98FF] text-white">
      <h1 className="font-bold text-[28px] mb-6">
        {t("Grow together with your friends")!}
      </h1>
      <div className="container-btn-reward">
        <ButtonPrimary
          text={t("Copy your Referral Link")!}
          onClickFn={copyReferralLink}
        />
      </div>
      <p className="text-[12px] mt-2 leading-5">
        {t("Get from 2 to 4 of commissions from your referrals")}
      </p>
    </div>
  );
};

export default RewardHeader;
