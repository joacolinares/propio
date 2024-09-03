"use client";
import React from "react";
import Header from "@/app/components/generals/Header";
import { useSearchParams } from "next/navigation";
import UnStake from "./components/UnStake";
import Claim from "./components/Claim";
import {
  DataOperationsClaim,
  DataOperationsUnStake,
} from "./components/moskData";
import { useTranslations } from "next-intl";

interface Props {
  dataClaim: DataOperationsClaim[];
  dataUnStake: DataOperationsUnStake[];
}

const Operations = ({ dataClaim, dataUnStake }: Props) => {
  const search = useSearchParams().get("type");
  const t = useTranslations();

  return (
    <div>
      <Header text={t("Operations")} />

      {search === "claim" ? (
        <Claim dataClaim={dataClaim} />
      ) : (
        <UnStake dataUnStake={dataUnStake} />
      )}
    </div>
  );
};

export default Operations;
