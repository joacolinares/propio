"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Commissions from "./components/Commissions";
import History from "./components/History";
import { DataCommissions, DataHistoryMember } from "./components/moskData";
import HeaderPages from "@/app/components/generals/HeaderPages";
import HeaderMember from "./components/HeaderMember";

type Props = {
  dataListCommissions: DataCommissions[];
  dataListHistory: DataHistoryMember[];
};

const Member = ({ dataListCommissions, dataListHistory }: Props) => {
  const t = useTranslations();
  const search = useSearchParams().get("type");

  return (
    <div className="bgGradientPurpleDark">
      <HeaderPages
        text={
          search === "commissions"
            ? t("Commissions")
            : search === "history"
            ? t("History")
            : t("Membership")
        }
      />
      <div className="">
        <HeaderMember />

        {search === "commissions" ? (
          <Commissions dataListCommissions={dataListCommissions} />
        ) : (
          <History dataListHistory={dataListHistory} />
        )}
      </div>
    </div>
  );
};

export default Member;
