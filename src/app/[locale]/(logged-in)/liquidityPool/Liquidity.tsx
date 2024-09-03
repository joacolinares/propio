"use client";
import React from "react";
import Header from "@/app/components/generals/Header";
import { usePathname, useSearchParams } from "next/navigation";
import ShowAddLiquidity from "./components/ShowAddLiquidity";
import MyLiquidity from "./components/MyLiquidity";
import {
  ProfitHistoryMyLiquidity,
  InfoMembership,
} from "./components/moskData";
import { useTranslations } from "next-intl";

interface Props {
  dataMyLiquidity: ProfitHistoryMyLiquidity[];
  infoMembership: InfoMembership[];
}

const Liquidity = ({ dataMyLiquidity, infoMembership }: Props) => {
  const pathname = usePathname();
  const t = useTranslations();
  const search = useSearchParams().get("type");

  return (
    <div>
      <Header text={t("Liquidity Pool")} />

      {search === "addLiquidity" ? (
        <ShowAddLiquidity />
      ) : (
        <MyLiquidity
          dataMyLiquidity={dataMyLiquidity}
          infoMembership={infoMembership}
        />
      )}
    </div>
  );
};

export default Liquidity;
