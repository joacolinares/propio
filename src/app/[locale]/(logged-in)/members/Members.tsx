"use client";
import React from "react";
import CurrentPlan from "./components/CurrentPlan";
import { usePathname } from "next/navigation";
import SelectMember from "./selectMember/page";
import Header from "@/app/components/generals/Header";
import {
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
  metamaskWallet,
  smartWallet,
  trustWallet,
  rainbowWallet,
  zerionWallet,
  phantomWallet,
  ThirdwebProvider
} from '@thirdweb-dev/react'

import { useTranslations } from "next-intl";
import { DataCurrentPlan } from "./components/moskData";

type Props = {
  dataListCurrents: DataCurrentPlan[];
};

const Members = ({ dataListCurrents }: Props) => {
  const pathname = usePathname();
  const t = useTranslations();

  const smartWalletConfig = {
    factoryAddress: '0x15C8D84d83D02BBDe62018105955f896652f2AAd',
    gasless: false // true si queres que la app cubra los gastos de gas. Debe estar fondeado en dashboard de thirdweb
  };
  const cocayWallet = smartWallet(
    embeddedWallet({ recommended: true }),
    smartWalletConfig
  );
  cocayWallet.meta.name = "Defily Wallet";


  return (

      <div>
        {pathname === "/members/selectMember" ? (
          <SelectMember />
        ) : (
          <div className="pb-[32px]">
            <Header text={t("Membership")} />
            <CurrentPlan dataListCurrents={dataListCurrents} />
          </div>
        )}
      </div>
  );
};

export default Members;
