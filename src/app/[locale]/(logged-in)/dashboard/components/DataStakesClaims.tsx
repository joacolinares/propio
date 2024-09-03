"use client";
import React, { useEffect, useState } from "react";
import { dataStakesAndClaims, DataStakesAndClaims } from "./moskData";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { ThirdwebSDK } from "@thirdweb-dev/react";
import abiClaim from '@/abis/abiClaim.json';
import { ethers } from "ethers";

const DataStakesClaims = () => {
  const t = useTranslations();
  const dataUser: DataStakesAndClaims = dataStakesAndClaims;
  const [userStakesState, setUserStakesState] = useState<any>(0);
  const idAccount = localStorage.getItem('idAccount');

  useEffect(() => {
    const userStakes = async () => {
      if (idAccount != null) {
        const sdk = new ThirdwebSDK(137);
        const contractClaim = await sdk.getContract(process.env.CLAIM_CONTRACT, abiClaim);
        const userStakes = await contractClaim.call("userStakes", [idAccount]);
        setUserStakesState(ethers.utils.formatUnits(userStakes._hex, 6)); // Convertir a 6 decimales
      }
    };
    userStakes();
  }, [idAccount]);

  return (
    <div className="container-dataStakesClaims">
      <div className="flex justify-between items-center h-full gradientPurpleLight">
        <div className="container-aviable flex flex-col items-center justify-between w-2/4">
          <div className="flex flex-col items-center">
            <span>{t("Available to Claim")}</span>
            <p>$ {dataUser.aviableToClaim}</p>
          </div>
          <Link
            href={"/operations?type=claim"}
            className="w-full cursor-pointer text-[10px] bg-[#ffffff1a] text-white font-bold py-1 px-2 rounded-[6px]"
          >
            {t("Click to Claim")}
          </Link>
        </div>
        <div className="container-claims flex flex-col items-center w-2/4">
          <span>{t("Claims")}</span>
          <p>$ {dataUser.claims}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 gradientPurpleLight">
        <div className="container-active-stakes">
          <div>
            <span>{t("Active Stakes")}</span>
            <p>$ {parseInt(userStakesState)}</p>
          </div>
        </div>
        <div className="container-stakes-unStakes">
          <div className="container-stakes">
            <span>{t("Stakes")}</span>
            <p>$ {dataUser.stakes}</p>
          </div>
          <div className="container-Unstakes">
            <span>{t("Un-Stakes")}</span>
            <p>$ {dataUser.unStakes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStakesClaims;
