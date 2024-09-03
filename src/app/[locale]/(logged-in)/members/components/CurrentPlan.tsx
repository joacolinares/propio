"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useUserPlanStore } from "@/store/user-plan";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useRouter } from "next/navigation";
import { useAddress } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { DataCurrentPlan } from "./moskData";
import Countdown from "../../../../components/generals/Countdown";
import { ethers } from "ethers";
import abiMembers from '@/abis/abiMembers.json'

type Props = {
  dataListCurrents: DataCurrentPlan[];
};

const CurrentPlan = ({ dataListCurrents }: Props) => {
  const t = useTranslations();
  const { updatePlan, ...plan } = useUserPlanStore();
  const router = useRouter();
  const [membresiaActual, setMembresiaActual] = useState({data: [],status: false});
  const address = useAddress();
  const wallet = localStorage.getItem("wallet");
  const idAccount = localStorage.getItem("idAccount");

  const loadInfo = async () => {
    let arrayTemporal = [];
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.MEMBERS_CONTRACT, abiMembers);

    if (address != undefined) {
      let i = 0;
      let membershipOfUsers, memberships;

      const convertTimestamp = (utcSeconds: number): Date => {
        const d = new Date(0);
        d.setUTCSeconds(utcSeconds);
        console.log(d);
        return d;
      };
      console.log("a")
      try {
        while (true) {
          membershipOfUsers = await contract.call("membershipOfUsers", [idAccount, i]);
          console.log(membershipOfUsers)
          memberships = await contract.call("memberships", [parseInt(membershipOfUsers.memberId, 16)]);
          const date = convertTimestamp(membershipOfUsers.time);
          const date2 = convertTimestamp(membershipOfUsers.time);
          console.log(date.toLocaleDateString())
          const dateMasAño = date2.setFullYear(date2.getFullYear() + 1);
          const dateMasAñoConvertido = new Date(dateMasAño);
          const state = dateMasAñoConvertido > new Date();

          console.log(membershipOfUsers.expire)

          const dateExp = convertTimestamp(membershipOfUsers.expire);
          const dateExpConvert = new Date(dateExp);

          if (dateExpConvert > new Date()) {
            arrayTemporal.push({
              title: memberships.membershipTitle,
              maxStake: ethers.utils.formatUnits(memberships.maxInv._hex, 6),
              currentStake: ethers.utils.formatUnits(membershipOfUsers.staked._hex, 6),
              remaining: parseFloat(ethers.utils.formatUnits(memberships.maxInv._hex, 6)) - parseFloat(ethers.utils.formatUnits(membershipOfUsers.staked._hex, 6)),
              fechaCompa: date.toLocaleDateString(),
              tiempoLimite: dateExpConvert,
              state: state,
              amount: ethers.utils.formatUnits(memberships.membershipAmount._hex, 6),
            });
          }
          i++;
        }
      } catch (error) {
        console.error(error);
      }
      console.log(arrayTemporal)
      setMembresiaActual({
        data: arrayTemporal,
        status: true,
      });
    }
  };

  const buttonStake = (id: number, index:number) => {
    console.log("membership", id);
    router.push(`/liquidityPool?type=addLiquidity&indexMember=${index}`);
  };

  useEffect(() => {
    loadInfo();
  }, [address]);

  return (
    <div className="px-[24px] pb-[98px] grid grid-cols-2 gap-x-4">
      {dataListCurrents.length === 0 ? (
        <h1 className="text-[#1E0E39] font-bold text-[18px] text-center w-full col-span-2 mt-8">
          {t("You currently have no plans")}
        </h1>
      ) : (
        membresiaActual.data.map((data, index) => (
          <div
            className="container py-[16px] px-[10px] rounded-[16px] bg-white shadow-md mt-[32px] border border-solid border-[#AD98FF]"
            key={index}
          >
            <div>
              <h1
                className={`${
                  data.title === "Zero" || data.title === "Zero Plus"
                    ? "text-black"
                    : "text-[#7A2FF4]"
                } text-[18px] font-bold text-center`}
              >
                {data.title.replace(/'/g, "")}
              </h1>
              <p className="text-black text-[10px] text-center mt-1">
                $ {parseFloat(data.amount)}
              </p>
            </div>
            <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center ">
              <p className="text-black  text-[10px]">{t("Max Stake")}</p>
              <div className={`container-check rounded-[10px] p-1`}>
                <span className="text-[10px] text-black ">
                  ${parseFloat(data.maxStake)}
                </span>
              </div>
            </div>
            <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center  ">
              <p className="text-black  text-[10px]">
                {t("Current Stake")}
              </p>
              <div className={`container-check rounded-[10px] p-1`}>
                <span className="text-[10px] text-black">
                  ${parseFloat(data.currentStake)}
                </span>
              </div>
            </div>
            <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center  ">
              <p className="text-black  text-[10px]">{t("Remaining")}</p>
              <div className={`container-check rounded-[10px] p-1`}>
                <span className="text-[10px] text-black">
                  $ {data.remaining}
                </span>
              </div>
            </div>
            <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center  ">
              <p className="text-black  text-[10px]">{t("Start date")}</p>
              <div className={`container-check rounded-[10px] p-1`}>
                <span className="text-[10px] text-black">
                  {data.fechaCompa}
                </span>
              </div>
            </div>
            <div className="rounded-[10px] bg-[#F2F3F8] flex justify-between items-center  ">
              <p className="text-black  text-[10px]">{t("Expiry Date")}</p>
              <div className={`container-check rounded-[10px] p-1`}>
                <span className="text-[10px] text-black">
                {data.tiempoLimite.toLocaleDateString()}
                </span>
              </div>
            </div>
            <Countdown dateEnd={data.tiempoLimite} />
            <div className="mt-2">
              <button
                className={`${
                  data.state
                    ? "text-[#AD98FF] border-[1.5px] border-solid border-[#AD98FF] cursor-pointer"
                    : "text-black border-[1.5px] border-solid border-[#A9AEB4] cursor-not-allowed "
                } w-full text-[10px]  font-bold px-4 py-2 rounded-[6px] `}
                onClick={() => {
                  data.state ? buttonStake(data.id,index) : null;
                }}
              >
                {t("Stake")}
              </button>
            </div>
          </div>
        ))
      )}

      <div className="col-span-2 mt-8">
        <ButtonPrimary
          text={t("Buy New Membership")}
          onClickFn={() =>{
            localStorage.removeItem('nftSelected');
            localStorage.removeItem('nftInfo');
            router.push(`/members/selectMember?idAccount=${idAccount}&wallet=${wallet}&buyNewMember=true`)
          }}
        />
      </div>
    </div>
  );
};

export default CurrentPlan;
