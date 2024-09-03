"use client";
import React, { useState } from "react";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { useTranslations } from "next-intl";
import RegistrationPayNFT from "@/app/[locale]/purchaseNft/components/RegistrationPayNFT";

const PaymentNftRegistration = () => {
  const t = useTranslations();

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
      <div>
        <HeaderPages text={t("Buy NFT")} />
      </div>
      <div className="min-h-[calc(100vh-100px)] px-6 pb-24 text-white">
        <RegistrationPayNFT />
      </div>
    </div>
  );
};

export default PaymentNftRegistration;
