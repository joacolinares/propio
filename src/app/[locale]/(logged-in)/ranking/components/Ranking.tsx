"use client";
import React, { useEffect, useState } from "react";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { InfoAccountsLevels } from "./moskData";
import { usePaginate } from "@/app/components/generals/pagination/usePaginate";
import Pagination from "@/app/components/generals/pagination/Pagination";
import NumberOne from "@/assets/imgs/MEDALS_1.png";
import NumberTwo from "@/assets/imgs/MEDALS_2.png";
import NumberOneThree from "@/assets/imgs/MEDALS_3.png";
import DirectVolSVG from "@/assets/icons/directVol.svg";
import GlobalVolSVG from "@/assets/icons/globalVol.svg";
import { ThirdwebSDK } from "@thirdweb-dev/react";

import abiAccount from "@/abis/abiAccount.json";
import { ethers } from "ethers";
import JadeImg from "@/assets/imgs/RANKING_RINGS_JADE.png";
import SapphireImg from "@/assets/imgs/RANKING_RINGS_SAPPHIRE.png";
import RubyImg from "@/assets/imgs/RANKING_RINGS_RUBY.png";
import EmeraldImg from "@/assets/imgs/RANKING_RINGS_EMERALD.png";
import DiamondImg from "@/assets/imgs/RANKING_RINGS_DIAMOND.png";
import BlueDiamondImg from "@/assets/imgs/RANKING_RINGS_BLUE_DIAMOND.png";
import BlackDiamondImg from "@/assets/imgs/RANKING_RINGS_BLACK_DIAMOND.png";
import CrownDiamondImg from "@/assets/imgs/RANKING_RINGS_CROWN_DIAMOND.png";
import { RankingAccount } from "@/app/[locale]/(logged-in)/myTeam/components/moskData";
import CryptoJS from "crypto-js";
import abiPoi from '@/abis/abiPoi.json'

type Props = {
  dataAccountsLevels: InfoAccountsLevels[];
};

type Images = {
  src: string;
};

interface ListLeagueObj {
  typeLeague: RankingAccount;
  name: string;
  imge: Images | File | React.ReactNode;
  colorText: string;
}

const Ranking = ({ dataAccountsLevels }: Props) => {
  const t = useTranslations();

  const listLeaguesType: ListLeagueObj[] = [
    {
      typeLeague: "Jade",
      name: t("Jade"),
      imge: JadeImg,
      colorText: "#9b9b9b",
    },
    {
      typeLeague: "Sapphire",
      name: t("Sapphire"),
      imge: SapphireImg,
      colorText: "#7573A6",
    },
    {
      typeLeague: "Ruby",
      name: t("Ruby"),
      imge: RubyImg,
      colorText: "#9B111E",
    },
    {
      typeLeague: "Emerald",
      name: t("Emerald"),
      imge: EmeraldImg,
      colorText: "#00FFBF",
    },
    {
      typeLeague: "Diamond",
      name: t("Diamond"),
      imge: DiamondImg,
      colorText: "#C8E5EB",
    },
    {
      typeLeague: "Blue Diamond",
      name: t("Blue Diamond"),
      imge: BlueDiamondImg,
      colorText: "#70D1F4",
    },
    {
      typeLeague: "Black Diamond",
      name: t("Black Diamond"),
      imge: BlackDiamondImg,
      colorText: "#000000",
    },
    {
      typeLeague: "Crown Diamond",
      name: t("Crown Diamond"),
      imge: CrownDiamondImg,
      colorText: "#FFD700",
    },
  ];

  const [isLeagues, setIsLeagues] = useState(false);
  const [isSelectPeriod, setIsSelectPeriod] = useState<string>(`${t("All")}`);
  const [selectedLeague, setSelectedLeague] = useState<ListLeagueObj>(listLeaguesType[3]);

  const [rankingTop10, setRankingTop10] = useState({
    status: false,
    data: [],
  });

  const decryptData = (encryptedHex) => {
    const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedHex);
    const secretKey = process.env.SECRET_KEY;
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedBytes },
      CryptoJS.enc.Hex.parse(secretKey),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const buscarTop10 = async () => {
    const sdk = new ThirdwebSDK(137);
    const contractAccount = await sdk.getContract(process.env.ACCOUNT_CONTRACT, abiAccount);
    const contractPoi = await sdk.getContract(process.env.POI_CONTRACT,abiPoi);
    const getTop10Accounts = await contractAccount.call("getTop10Accounts", []);
    let arrayTemporanl = [];
    
    for (let y = 0; y < 10; y++) {
      const getDirectVolCount = await contractAccount.call("getDirectVolCount",[parseInt(getTop10Accounts[y].idAccount._hex,16)]);
      let directVol = 0
      for (let index = 0; index < parseInt(getDirectVolCount._hex, 16); index++) {
        const getDirectVolInfo = await contractAccount.call("getDirectVolInfo",[parseInt(getTop10Accounts[y].idAccount._hex,16),index]);
        directVol = directVol + parseFloat(ethers.utils.formatUnits(getDirectVolInfo[1], 6)); //CAMBIO
      }

      let generalVol = 0
      let cantGlob = 0
      const getCantLevles = await contractAccount.call("getCantLevles",[parseInt(getTop10Accounts[y].idAccount._hex,16)]);
      for (let index = 0; index < parseInt(getCantLevles._hex, 16); index++) {
        const getDirectVolInfo = await contractAccount.call("getCantPeronInLevel",[parseInt(getTop10Accounts[y].idAccount._hex,16),index]);
        cantGlob = cantGlob + parseInt(getDirectVolInfo._hex, 16)
        for (let x = 0; x < parseInt(getDirectVolInfo._hex, 16); x++) {
          const getGlobalVolInfo = await contractAccount.call("getGlobalVolInfo",[parseInt(getTop10Accounts[y].idAccount._hex,16), index,x]);
          generalVol = generalVol + parseFloat(ethers.utils.formatUnits(getGlobalVolInfo[1], 6)); //CAMBIO
        }
      }
      const ownerOf = await contractAccount.call("ownerOf", [parseInt(getTop10Accounts[y].idAccount._hex,16)]);
      const personalDataMap = await contractPoi.call("personalDataMap", [ownerOf]);
      const decryptedUsername = decryptData(personalDataMap.encryptedUsername);

      const ownerOfRefferal = await contractAccount.call("ownerOf", [parseInt(getTop10Accounts[y].idAccountRefferal._hex,16)]);
      const personalDataMapRefferal = await contractPoi.call("personalDataMap", [ownerOfRefferal]);
      const decryptedUsernameRefferal = decryptData(personalDataMapRefferal.encryptedUsername);
      arrayTemporanl.push({
       cantVolDirect: directVol,
       cantDirect: parseInt(getDirectVolCount._hex, 16),
       cantVolGlob: generalVol,
       cantGlobal: cantGlob,
       accountName: getTop10Accounts[y].accountName,
       userName: decryptedUsername,
       idAccountRefferal: decryptedUsernameRefferal
      });
    }
    setRankingTop10({ status: true, data: arrayTemporanl });
  };

  useEffect(() => {
    buscarTop10();
  }, []);

  const numberByPage = 10;
  const { currentPage, goToNextPage, goToPage, goToPreviousPage, totalPages, elemetsVisibleByPage } = usePaginate({
    listElement: rankingTop10.data,
    numberByPage: numberByPage,
  });

  const listPeriod = [
    {
      nameStatict: "24H",
      name: "24H",
    },
    {
      nameStatict: "7D",
      name: "7D",
    },
    {
      nameStatict: "30D",
      name: "30D",
    },
    {
      nameStatict: "All",
      name: t("All"),
    },
  ];

  const handleSelectPeriod = (period: string) => {
    if (period) setIsSelectPeriod(period);
  };

  const handleSelectLeagues = (league: ListLeagueObj) => {
    if (league) setSelectedLeague(league);
  };


  
  return (
    <div className="pb-[96px] min-h-screen bg-gradient-to-r from-[#0E0E33] to-[#39307B] text-white">
      <HeaderPages text={t("Ranking")} />

      <div className="px-6">
        <div className="mb-5 px-4">
          <p className="text-center text-base font-bold">
            {t("Check out who are the top leaders on")} <b className="text-[#7A2FF4]">Defily</b>!
          </p>
        </div>

        <div className="h-[35px] rounded-[10px] bg-[#ffffff1a] flex items-center justify-between mb-8">
          <div
            className={`w-2/4 flex items-center justify-center cursor-pointer ${
              isLeagues === false ? "text-[#1E0E39] font-bold bg-[white] rounded-[10px] h-full" : "text-[#F2F3F8]"
            }`}
            onClick={() => setIsLeagues(false)}
          >
            <p className=" text-[14px]">{t("Absolute")}</p>
          </div>
          <div
            className={`w-2/4 flex items-center justify-center cursor-pointer ${
              isLeagues ? "text-[#1E0E39] font-bold bg-[white] rounded-[10px] h-full " : "text-[#F2F3F8]"
            }`}
            onClick={() => setIsLeagues(true)}
          >
            <p className="text-[14px]">{t("Leagues")}</p>
          </div>
        </div>

        <div className={`${isLeagues ? "mb-8" : "mb-4"}`}>
          {isLeagues === false ? (
            <div className="rounded-[8px] bg-[#ffffff1a] p-1 flex items-center justify-between">
              {listPeriod.map((period, index) => (
                <p
                  key={index}
                  className={`text-[#A9AEB4] w-12 h-7 text-[14px] flex items-center justify-center ${
                    isSelectPeriod === period.nameStatict ? "text-white rounded-[6px] bg-[#7A2FF4]" : ""
                  }`}
                  onClick={() => handleSelectPeriod(period.nameStatict)}
                >
                  {period.name}
                </p>
              ))}
            </div>
          ) : (
            <div className="rounded-[20px] border border-solid border-[#ffffff1a] p-2 ">
              <p className="text-[14px] text-center mb-2">
                {t("Viewing")}{" "}
                <span className={`font-bold `} style={{ color: `${selectedLeague?.colorText ? `${selectedLeague.colorText}` : "#7A2FF4"}` }}>
                  {selectedLeague?.name} {t("League")}
                </span>
              </p>
              <div className="grid grid-cols-4 gap-2 justify-items-center">
                {listLeaguesType.map((league, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center rounded-[100px] py-[10px] px-[2px]  w-[45px] h-[45px] border border-solid border-[#ffffff1a] ${
                      selectedLeague.typeLeague === league.typeLeague ? "bg-[#ffffff1a]" : ""
                    }`}
                    onClick={() => handleSelectLeagues(league)}
                  >
                    <Image src={league.imge as string} alt="LeagueImg" width={95} height={20} />
                  </div>
                ))}
              </div>
              <div className="p-2 rounded-[16px] border border-solid border-[#ffffff1a] flex items-center justify-center mt-2">
                <div className="rounded-[10px] bg-[#ffffff1a] py-4 text-center w-[135px]">
                  <p className="text-[12px] ">
                    {t("Season")} <span className="ml-2 text-[14px] font-bold">124</span>
                  </p>
                </div>
                <div className="rounded-[10px] bg-[#ffffff1a] py-4 text-center w-[135px] ml-2 ">
                  <p className="text-[12px] ">
                    {t("League Size")} <span className="ml-2 text-[14px] font-bold">5</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {elemetsVisibleByPage ? (
            <>
              {elemetsVisibleByPage.map((accountLevel, index) => (
                <div className="rounded-[10px] flex mb-2" key={index}>
                  <div className="bg-[#9B9B9B] rounded-s-[10px] w-[20px] relative">
                    {index <= 2 ? (
                      <div className="w-[24px] h-[24px] absolute top-1/2 -right-1/2 transform -translate-y-1/2">
                        <Image src={index === 0 ? NumberOne : index === 1 ? NumberTwo : NumberOneThree} alt="StartsImg" className=" w-full h-full" />
                      </div>
                    ) : (
                      <div className="absolute top-1/2 -right-1/2 transform -translate-y-1/2 bg-[#7A2FF4] rounded-full w-[24px] h-[24px] text-white text-[12px] font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="bg-[#ffffff1a] w-2/6 p-2 ps-5 flex flex-col justify-center border-e border-solid border-[#A9AEB4]">
                    <div className=" ">
                      <h1 className="text-white text-[10px] font-bold">{accountLevel.userName}</h1>
                      <h1 className="text-white text-[10px] font-bold">{accountLevel.accountName}</h1>
                      <p className="text-[#A9AEB4] text-[8px] mt-1">{accountLevel.plan}</p>
                    </div>
                    <div className=" ">
                      <div className="text-white text-[8px] font-bold  mt-1">
                        <span>{t("Level")} </span>
                        <span>{accountLevel.level}</span>
                      </div>
                      <div className="text-[#A9AEB4] text-[8px] mt-1">
                        <span>{t("Sponsor")}: </span>
                        <span>{accountLevel.sponsor}</span>
                        <span>{accountLevel.idAccountRefferal}</span>
                      </div>
                    </div>
                  </div>

                  <div className="py-2 px-6 bg-[#ffffff1a] w-4/6 rounded-e-[10px]">
                    <div className="flex items-center justify-between">
                      <div className=" flex items-center justify-between w-3/5">
                        <Image src={DirectVolSVG} alt="DirectVolSVG" />
                        <p className="text-white text-[8px] ml-1">{t("DIRECTS VOL")}</p>
                        <p className="text-[#7A2FF4] text-[8px] font-bold flex items-center justify-center w-[16px] h-[16px] rounded-full bg-white">
                        {accountLevel.cantDirect}
                        </p>
                      </div>

                      <p className="text-[9px] font-bold text-white ml-2">${accountLevel.cantVolDirect}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className=" flex items-center justify-between w-3/5">
                        <Image src={GlobalVolSVG} alt="GlobalVolSVG" />
                        <p className="text-white text-[8px] ml-1">{t("GLOBAL VOL")}</p>
                        <p className="text-[#7A2FF4] text-[8px] font-bold flex items-center justify-center w-[16px] h-[16px] rounded-full bg-white">
                         {accountLevel.cantGlobal}
                          {""}
                        </p>
                      </div>

                      <p className="text-[9px] font-bold text-white ml-2">${accountLevel.cantVolGlob}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>{t("Loading")}...</>
          )}
          <div className="flex justify-center mt-5 ">
            <Pagination
              currentPage={currentPage}
              goToNextPage={goToNextPage}
              goToPage={goToPage}
              goToPreviousPage={goToPreviousPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
