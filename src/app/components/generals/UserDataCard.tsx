"use client";
import { MembersInfo } from "@/app/[locale]/(logged-in)/myTeam/components/moskData";
import TrianguloSVG from "@/assets/icons/TrianguloColor";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import DirectVolSVG from "@/assets/icons/directVol.svg";
import GlobalVolSVG from "@/assets/icons/globalVol.svg";
import TrianguloSvg from "@/assets/icons/TrianguloColor";
import UserImg from "@/assets/imgs/userGL.png";
import { TypeAccount, RankingAccount } from "../../[locale]/(logged-in)/myTeam/components/moskData";

interface Props {
  membersInfo: MembersInfo;
  typeAccount: TypeAccount;
  rankingAccount: RankingAccount;
  isMe?: boolean;
  width?: string;
  hasReferals?: boolean;
  setDataUserListState?: (info: MembersInfo) => void;
}

const UserDataCard = ({
  membersInfo,
  typeAccount,
  rankingAccount,
  isMe = false,
  width = "w-[100%]",
  hasReferals = false,
  setDataUserListState,
}: Props) => {
  const t = useTranslations();

  const getTypeAccount = (type: TypeAccount) => {
    const objectBaseType: Record<TypeAccount, string> = {
      "Cuenta Propia": "#00A338",
      "Cuenta de Referido": "#FB6A00",
      "Cuenta de Traspaso": "#004BC6",
    };

    return objectBaseType[type];
  };

  const getRankingAccount = (ranking: RankingAccount) => {
    const objectBaseRanking: Record<RankingAccount, string> = {
      Jade: "#9B9B9B",
      Sapphire: "#7573A6",
      Ruby: "#9B111E",
      Emerald: "#00FFBF",
      Diamond: "#C8E5EB",
      "Blue Diamond": "#70D1F4",
      "Black Diamond": "#000000",
      "Crown Diamond": "#FFD700",
    };

    return objectBaseRanking[ranking];
  };

  return (
    <>
      <div className={`rounded-[10px] flex mb-2 ${width} h-[86px]`}>
        <div className={`rounded-s-[10px] w-[30px] relative`} style={{ backgroundColor: getRankingAccount(rankingAccount) }}>
          <div className="w-[32px] h-[32px] absolute top-1/2 -right-1/2 transform -translate-y-1/2">
            <Image src={UserImg} alt="StartsImg" className=" w-full h-full" />
          </div>
          <div className="rounded-tl-[10px] overflow-hidden">
            <TrianguloSVG fill={getTypeAccount(typeAccount)} />
          </div>
          {hasReferals ? (
            <div
              className="border border-black border-solid bg-gray-300 text-white absolute top-[71px] left-[-8px] z-0 h-[22px] w-[22px] rounded-full flex justify-center items-center text-lg cursor-pointer"
              onClick={() => setDataUserListState?.(membersInfo)}
            >
              +
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="bg-[#ffffff1a] w-2/6 p-2 ps-5 flex flex-col justify-center items-start border-e border-solid border-[#A9AEB4]">
          <div className=" ">
            <h1 className="text-white text-[10px] font-bold mb-1">{membersInfo.nameUser}</h1>
            <p className="text-white text-center text-[8px] font-bold py-[2px] px-1 rounded-[20px] bg-[#ffffff1a]">MainAccount</p>
            <p className="text-[#A9AEB4] text-[8px] mt-1">{membersInfo.plan}</p>
          </div>
          <div className=" ">
            <div className="text-white text-[8px] font-bold  mt-1">
              {isMe ? (
                <span>{t("Me")}</span>
              ) : (
                <>
                  <span>{t("Level")} </span>
                  <span>{membersInfo.level}</span>
                </>
              )}
            </div>
            <div className="text-[#A9AEB4] text-[8px] mt-1">
              <span>{t("Sponsor")}: </span>
              <span>{membersInfo.sponsor}</span>
            </div>
          </div>
        </div>

        <div className="py-2 px-6 bg-[#ffffff1a] w-4/6 rounded-e-[10px] flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div className="mr-2 flex items-center ">
              <Image src={DirectVolSVG} alt="DirectVolSVG" />
              <p className="text-white text-[8px] ml-1 mr-2">{t("DIRECTS VOL")}</p>
              <p className="text-[#7A2FF4] text-[8px] font-bold flex items-center justify-center w-[16px] h-[16px] rounded-full bg-white">
                {membersInfo.numberDirects}
              </p>
            </div>

            <div className="">
              <p className="text-[9px] font-bold text-white ml-2">${membersInfo.directsVol}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="mr-2 flex items-center ">
              <Image src={GlobalVolSVG} alt="GlobalVolSVG" />
              <p className="text-white text-[8px] ml-1 mr-2">{t("GLOBAL VOL")}</p>
              <p className="text-[#7A2FF4] text-[8px] font-bold flex items-center justify-center w-[16px] h-[16px] rounded-full bg-white">
                {membersInfo.numberGlobal}
              </p>
            </div>
            <div className="">
              <p className="text-[9px] font-bold text-white ml-2">${membersInfo.globalVol}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDataCard;
