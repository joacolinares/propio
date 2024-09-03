"use client";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import { useRouter, redirect } from "next/navigation";

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
  ThirdwebProvider,
  ThirdwebSDK
} from '@thirdweb-dev/react'
import abi from "./abis/abi.json";
import {  Web3Button, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import Image from "next/image";
import CommissionsSVG from "@/assets/icons/membersComitions.svg";
import abiMembers from '@/abis/abiMembers.json'


const MembersHeader = () => {
  const t = useTranslations();
  const [membersBonus, setMembersBonus] = useState(0);
  const [myMembersTeam, setMyMembersTeam] = useState(0);
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalRewards, setTotalRewards] = useState(0)
  const [totalPayedRewards, setTotalPayedRewards] = useState(0)
  const address = useAddress();
  const idAccount = localStorage.getItem('idAccount');
  const loadInfo = async () => { //Carga la informacion de la persona
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT,abiMembers);
    console.log("LOAD INFOOO")

      const rewards = await contract.call("rewards",[idAccount]);
      console.log("rewards",rewards)
      setTotalRewards(parseInt(rewards._hex, 16))
      const totalPayedRewards = await contract.call("totalPayedRewards",[idAccount]);
      console.log("totalPayedRewards",totalPayedRewards)
      setTotalPayedRewards(parseInt(totalPayedRewards._hex, 16))

  };

  useEffect(() => {
    loadInfo();
  }, [address]);


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

      <div className="members-header px-6">
        <div className="container p-2 rounded-[16px] border-solid border-[1.2px] border-[#7A2FF4] relative">
          <Link
            href="/member?type=commissions"
            className="rounded-[5px] absolute top-4 right-4 border border-solid border-white bg-[#ffffff1a] cursor-pointer"
          >
            <Image src={CommissionsSVG} alt="icon" width={24} height={24} />
          </Link>
          <div className="container-totalStaked rounded-[10px] bg-[#7A2FF4] p-6 text-white text-center">
            <p className="text-[24px] font-bold mb-2">
              $ {totalPayedRewards / 1000000}{" "}
            </p>
            <p className="text-[14px]">{t("Total Payed Rewards")}</p>
          </div>
          <div className="container-totalStaked rounded-[10px] bg-[#7A2FF4] p-6 text-white text-center">
            <p className="text-[24px] font-bold mb-2">
              $ {totalRewards / 1000000}{" "}
            </p>
            <p className="text-[14px]">{t("Claim availabled")}</p>

          </div>
          <div className="container-members-estimated mt-2 flex justify-between items-center text-center text-[#7A2FF4] space-x-2">
            <div className="container-MyMembers bg-[#F2F3F8] flex flex-col justify-center items-center rounded-[10px] py-2 px-4 w-2/4 h-[75px]">
              <p className="text-[16px] font-bold mb-1">{myMembersTeam}</p>
              <p className="text-[14px]">{t("My Team")}</p>
            </div>
            <div className="container-totalStaked bg-[#F2F3F8] flex flex-col justify-center items-center rounded-[10px] py-2 px-4 w-2/4 h-[75px]">
              <p className="text-[16px] font-bold mb-1">
                $ {totalVolume / 1000000}
              </p>
              <p className="text-[14px]">{t("Total Volume")}</p>
            </div>
          </div>
        </div>
        <Web3Button
                        contractAddress={process.env.MEMBERS_CONTRACT}
                        contractAbi={abiMembers}
                        action={async (contract: any) => {
                          const idAccount = localStorage.getItem('idAccount');
                          await contract.call("claimMembershipReward", [idAccount]);
                        }}
                        onSuccess={async() => {
                          const sdk = new ThirdwebSDK(137);
                          const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT,abiMembers);
                          console.log("LOAD INFOOO")
                          const rewards = await contract.call("rewards",[idAccount]);
                          console.log("rewards",rewards)
                          setTotalRewards(parseInt(rewards._hex, 16))
                          const totalPayedRewards = await contract.call("totalPayedRewards",[idAccount]);
                          console.log("totalPayedRewards",totalPayedRewards)
                          setTotalPayedRewards(parseInt(totalPayedRewards._hex, 16))
                        }}
                        onError={(error) =>{
                         
                        }}
                        className="buttonPrimary"
                      >
                        {t("Claim Rewards")}
              </Web3Button>
      </div>
  );
};

export default MembersHeader;
