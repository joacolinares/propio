"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import UserImg from "@/assets/imgs/userGL.png";
import TrianguloSvg from "@/assets/icons/TrianguloColor";
import DirectVolSVG from "@/assets/icons/directVol.svg";
import GlobalVolSVG from "@/assets/icons/globalVol.svg";
import { DataMembers, RankingAccount, TypeAccount } from "./moskData";
import { useTranslations } from "next-intl";
import Countdown from "@/app/components/generals/Countdown";
import AddPlus from "@/assets/icons/add-circle-outline.svg";
import ArrowRight from "@/assets/icons/Arrow-Rigth.svg";

import { MembersInfo, dataListCardMock, dataListCardMock2 } from "./moskData";
import { getRankingAccount, getTypeAccount } from "@/utils/selectColorCardsMember";
import useScroll from "@/hooks/useScroll";

interface Props {
  infoUserLevel: DataMembers[];
}

const TreeView = ({ infoUserLevel }: Props) => {
  const t = useTranslations();
  // const [walletRecortadaFinal, setWalletRecortadaFinal] = useState<string>("");
  let dateEnd = new Date();

  //   // funcion para recortar la wallet
  //   useEffect(() => {
  //     const recortarWallet = (walletRecortada: string) => {
  //       let onePart = null;
  //       let twoPart = null;
  //       if (walletSponsor) {
  //         onePart = walletSponsor.slice(0, 4);
  //         twoPart = walletSponsor.slice(
  //           walletSponsor.length - 4,
  //           walletSponsor.length
  //         );
  //         let walletRecortada = `${onePart}...${twoPart}`;
  //         setWalletRecortadaFinal(walletRecortada);
  //       }
  //     };
  //   }, [walletSponsor]);
  const [dataUserListState, setDataUserListState] = useState(dataListCardMock);
  const [isLoading, setIsLoading] = useState(false);

  function selectedUserAndSeeMore(info: MembersInfo) {
    console.log({ info });
    setIsLoading(true);

    // aqui obtienes el id o wallet del usuario y traes sus datos
    setDataUserListState(dataListCardMock2);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  const { siguientes, anteriores, currentElement } = useScroll({
    VIEW_ELEMENTS: dataUserListState.directReferent.length === 1 ? 1 : 2,
    numberOfElement: dataUserListState.directReferent.length,
    idElement: "ScrollTreeView",
  });

  return (
    <div className="mt-4 px-6 flex flex-col items-center justify-center">
      <ReferrerParent dateEnd={dateEnd} rankingAccount="Diamond" typeAccount="Cuenta Propia" membersInfo={dataUserListState.referrer} />
      <CardCurrentmember dateEnd={dateEnd} rankingAccount="Ruby" typeAccount="Cuenta Propia" membersInfo={dataUserListState.userData} />
      {dataUserListState.directReferent.length === 0 ? (
        <></>
      ) : (
        <>
          <div className="border border-solid border-neutral-400 h-[30px] w-[1px] relative mb-[30px]">
            <div
              className={`border border-solid border-neutral-400 border-b-0 absolute h-[30px]  top-[29px] translate-x-[-50%]
                ${dataUserListState.directReferent.length > 1 ? "w-[150px]" : "w-[0px]"}
                `}
            ></div>
          </div>
          <div className="flex items-center justify-between">
            {currentElement <= 1 ? (
              <></>
            ) : (
              <div className="w-[22px] h-[25px] rotate-180 cursor-pointer" onClick={() => anteriores(2)}>
                <Image src={ArrowRight} alt="ArrowRight" />
              </div>
            )}

            <div className="flex overflow-x-hidden" id="ScrollTreeView">
              {dataUserListState.directReferent.map((element, index) => (
                <div key={index} className="mx-[4px]">
                  <CardReferreds
                    dateEnd={dateEnd}
                    key={index}
                    rankingAccount="Jade"
                    typeAccount="Cuenta Propia"
                    width={`w-[100%]`}
                    membersInfo={element}
                    hasReferals={element.hasReferred}
                    setDataUserListState={selectedUserAndSeeMore}
                  />
                </div>
              ))}
            </div>
            {currentElement >= dataUserListState.directReferent.length - 1 ? (
              <> </>
            ) : (
              <div className="w-[22px] h-[25px] cursor-pointer" onClick={() => siguientes(2)}>
                <Image src={ArrowRight} alt="ArrowRight" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TreeView;

interface PropsCardOfTheTree {
  membersInfo: MembersInfo;
  typeAccount: TypeAccount;
  rankingAccount: RankingAccount;
  isMe?: boolean;
  width?: string;
  hasReferals?: boolean;
  setDataUserListState?: (info: MembersInfo) => void;
  dateEnd: Date;
}

function CardReferreds({ dateEnd, rankingAccount, typeAccount, membersInfo, width, hasReferals, setDataUserListState }: PropsCardOfTheTree) {
  const t = useTranslations();

  return (
    <div className="relative">
      <div className="bg-[#ffffff14] rounded-[10px] mb-2 w-[130px] relative flex-shrink-0">
        <div className="rounded-t-[10px] relative h-6 w-full" style={{ backgroundColor: getRankingAccount(rankingAccount) }}>
          <div className="w-[32px] h-[32px] absolute -top-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
            <Image src={UserImg} alt="StartsImg" className=" w-full h-full" />
          </div>
          <div className="rounded-[10px] w-12 h-12 absolute top-0 right-0 rotate-90 overflow-hidden">
            <TrianguloSvg fill={getTypeAccount(typeAccount)} />
          </div>
          <div className="px-[2px] rounded-[20px] border-[1px] border-solid border-white bg-[#7A2FF4] flex justify-center absolute top-8 right-1/2 transform translate-x-1/2">
            <p className="text-[8px] font-bold text-white">
              ORG <b>01</b>
            </p>
          </div>
        </div>

        <div className="pt-6 px-3 pb-4 flex flex-col justify-center text-center ">
          <div className="flex flex-col justify-center">
            <h1 className="text-white text-[12px] font-bold ">{membersInfo.nameUser}</h1>
            <p className="text-white text-[8px] font-bold py-[2px] px-1 rounded-[20px] bg-[#ffffff1a] my-1">MainAccount</p>
            <p className="text-[#A9AEB4] text-[8px]">PROFESSIONAL</p>
          </div>

          <div className="my-2 flex item-center justify-between">
            <div className="flex items-center justify-center">
              <Image src={DirectVolSVG} alt="DirectVolSVG" />

              <p className="text-[#7A2FF4] ml-1 text-[8px] font-bold my-1 flex items-center justify-center w-[16px] h-[16px] rounded-full bg-white">
                3
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Image src={GlobalVolSVG} alt="GlobalVolSVG" />

              <p className="text-[#7A2FF4] ml-1 text-[8px] font-bold my-1 flex items-center justify-center w-[16px] h-[16px] rounded-full bg-white">
                9
              </p>
            </div>
          </div>
          <p className="text-[9px] font-bold text-white">$5,000.00</p>
          <div className="mt-2">
            <Countdown dateEnd={dateEnd} bgColor="bg-[#ffffff1a]" />
          </div>
        </div>
      </div>
      {hasReferals ? (
        <div
          className="relative top-[-22px] left-[50%]  translate-x-[-50%] z-0 w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
          onClick={() => setDataUserListState?.(membersInfo)}
        >
          <Image src={AddPlus} alt="PlusSVG" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function CardCurrentmember({ dateEnd, rankingAccount, typeAccount, membersInfo }: PropsCardOfTheTree) {
  const t = useTranslations();

  return (
    <>
      <div className="bg-[#ffffff14] w-11/12  rounded-[10px]">
        <div className="rounded-t-[10px] relative h-6 w-full" style={{ backgroundColor: getRankingAccount(rankingAccount) }}>
          <div className="w-[32px] h-[32px] absolute -top-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
            <Image src={UserImg} alt="StartsImg" className=" w-full h-full" />
          </div>
          <div className="rounded-[10px] w-12 h-12 absolute top-0 right-0 rotate-90 overflow-hidden">
            <TrianguloSvg fill={getTypeAccount(typeAccount)} />
          </div>
        </div>

        <div className="pt-6 px-3 pb-4 text-center">
          <div className="mb-2">
            <div className="flex items-center justify-center">
              <h1 className="text-white text-[12px] font-bold mr-1 ">{membersInfo.nameUser}</h1>
              <p className="text-white text-[8px] font-bold py-[2px] px-1 rounded-[20px] bg-[#ffffff1a]">MainAccount</p>
            </div>
            <p className="text-[#A9AEB4] text-[8px]">Ultimate</p>
          </div>

          <div className="mb-2 flex item-center justify-between">
            <div className="flex flex-col items-center justify-between">
              <div className="mr-2 flex items-center ">
                <Image src={DirectVolSVG} alt="DirectVolSVG" />
                <p className="text-white text-[8px] ml-1">{t("DIRECTS VOL")}</p>
              </div>
              <p className="text-[#7A2FF4] text-[8px] font-bold my-1 flex items-center justify-center w-[16px] h-[16px] rounded-full bg-white">3</p>

              <p className="text-[9px] font-bold text-white">$2,500.00</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-white text-[10px] font-bold mb-1">Me</p>
              <p className="text-[#A9AEB4] text-[10px]">abB3...Ft3w</p>
            </div>
            <div className="flex flex-col items-center justify-between">
              <div className="mr-2 flex items-center ">
                <Image src={GlobalVolSVG} alt="GlobalVolSVG" />
                <p className="text-white text-[8px] ml-1">{t("GLOBAL VOL")}</p>
              </div>
              <p className="text-[#7A2FF4] text-[8px] font-bold my-1 flex items-center justify-center w-[16px] h-[16px] rounded-full bg-white">9</p>
              <p className="text-[9px] font-bold text-white">$5,000.00</p>
            </div>
          </div>
          <div className="w-2/4 mx-auto">
            <Countdown dateEnd={dateEnd} bgColor="bg-[#ffffff1a]" />
          </div>
        </div>
      </div>
    </>
  );
}

function ReferrerParent({ typeAccount, rankingAccount, membersInfo }: PropsCardOfTheTree) {
  const t = useTranslations();

  return (
    <>
      <div className="bg-[#ffffff14] w-2/4  rounded-[10px]">
        <div className="rounded-t-[10px] relative h-6 w-full" style={{ backgroundColor: getRankingAccount(rankingAccount) }}>
          <div className="w-[32px] h-[32px] absolute -top-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2">
            <Image src={UserImg} alt="StartsImg" className=" w-full h-full" />
          </div>
          <div className="rounded-[10px] w-12 h-12 absolute top-0 right-0 rotate-90 overflow-hidden">
            <TrianguloSvg fill={getTypeAccount(typeAccount)} />
          </div>
        </div>

        <div className="pt-6 px-3 pb-4 flex flex-col items-center justify-center">
          <h1 className="text-white text-[12px] font-bold mb-1">{membersInfo.nameUser}</h1>
          <p className="text-white text-[8px] font-bold py-[2px] px-1 rounded-[20px] bg-[#ffffff1a]">MainAccount</p>
          <div className="text-[#A9AEB4] text-[10px] font-bold mt-1">
            <span>Sponsor</span>
          </div>
          <p className="text-[#A9AEB4] text-[10px] mt-1">Fgd...Dg34</p>
        </div>
      </div>
      <div className="border border-solid border-neutral-400 h-[30px] w-[1px]" />
    </>
  );
}
