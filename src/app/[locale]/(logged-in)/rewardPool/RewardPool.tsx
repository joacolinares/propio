"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/app/components/generals/Header";
import { useTranslations } from "next-intl";

const RewardPool = () => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <div>
      <Header text={t("Reward Pool")} />
    </div>
  );
};

export default RewardPool;
