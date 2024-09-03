"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HeaderPages from "@/app/components/generals/HeaderPages";
import { useTranslations } from "next-intl";
import { useUserLevelStore } from "@/store/user-level";
import { ThirdwebSDK } from "@thirdweb-dev/react";

import abiAccount from "@/abis/abiAccount.json";
import { ethers } from "ethers";
import abiPoi from "@/abis/abiPoi.json";
import CryptoJS from "crypto-js";

const LevelMembers = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const { selectPlan, ...lvlStore } = useUserLevelStore();
  const [isOpen, setIsOpen] = useState<string[]>([]);
  const [infoLevels, setInfoLevels] = useState<{ data: any[]; status: boolean; }>({
    data: [],
    status: false
  })
  const [actualLevel, setActualLevel] = useState<string | null>("0");
  const handleIsOpen = (wallet: string) => {
    setIsOpen((prevState) => {
      if (prevState.includes(wallet)) {
        return prevState.filter((item) => item !== wallet);
      } else {
        return [...prevState, wallet];
      }
    });
  };

  const idAccount = localStorage.getItem("idAccount");

  const decryptData = (encryptedHex) => {
    const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedHex);
    const secretKey = process.env.SECRET_KEY;
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedBytes }, CryptoJS.enc.Hex.parse(secretKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  const searchTeamInLevel = async () => {
    const sdk = new ThirdwebSDK(137);
    const contractAccount = await sdk.getContract(process.env.ACCOUNT_CONTRACT, abiAccount);
    const contractPoi = await sdk.getContract(process.env.POI_CONTRACT, abiPoi);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ActualLevel = urlParams.get("ActualLevel");
    let arrayTemporanl = [];
    let directVol = 0
    let gobalVol = 0
    if (ActualLevel == "1") {
      const getDirectVolCount = await contractAccount.call("getDirectVolCount", [idAccount]);
      for (let index = 0; index < parseInt(getDirectVolCount._hex, 16); index++) {
        const getDirectVolInfoGeneral = await contractAccount.call("getDirectVolInfo", [idAccount, index]);
        const ownerOf = await contractAccount.call("ownerOf", [getDirectVolInfoGeneral[0]]);
        const personalDataMap = await contractPoi.call("personalDataMap", [ownerOf]);
        const decryptedUsername = decryptData(personalDataMap.encryptedUsername);
        directVol = 0
        gobalVol = 0
        for (let i = 1; i <= 20; i++) {
          if (i == 1) {
            const getDirectVolCount = await contractAccount.call("getDirectVolCount", [parseInt(getDirectVolInfoGeneral[0], 16)]);
            for (let index = 0; index < parseInt(getDirectVolCount._hex, 16); index++) {
              const getDirectVolInfo = await contractAccount.call("getDirectVolInfo", [parseInt(getDirectVolInfoGeneral[0], 16), index]);
              directVol = directVol + parseFloat(ethers.utils.formatUnits(getDirectVolInfo[1], 6)); //CAMBIO
            }
          } else {
            const getCantLevles = await contractAccount.call("getCantLevles", [parseInt(getDirectVolInfoGeneral[0], 16)]);
            for (let i = 1; i < parseInt(getCantLevles._hex, 16); i++) {
              const getCantPeronInLevel = await contractAccount.call("getCantPeronInLevel", [parseInt(getDirectVolInfoGeneral[0], 16), i]);
              for (let x = 0; x < parseInt(getCantPeronInLevel._hex, 16); x++) {
                const getGlobalVolInfo = await contractAccount.call("getGlobalVolInfo", [parseInt(getDirectVolInfoGeneral[0], 16), i, x]);
                gobalVol = gobalVol + parseFloat(ethers.utils.formatUnits(getGlobalVolInfo[1], 6)); //CAMBIO
              }
            }
            break
          }
        }
        arrayTemporanl.push({
          directo: directVol,
          global: gobalVol,
          usuario: decryptedUsername,
          nivel: ActualLevel
        });
      }

      setInfoLevels({
        data: arrayTemporanl,
        status: true
      })
    } else {
      console.log("general")
    }
  }

  useEffect(() => {
    searchTeamInLevel()
  }, [])
  const queryString = window.location.search;
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ActualLevel = urlParams.get("ActualLevel");
    setActualLevel(ActualLevel)
  }, [queryString])

  return (
    <div className="bg-gradient-to-t from-[#0E0E33] to-[#39307B]">
      <HeaderPages text={t("My Team")} />

      <div className="container-body min-h-[calc(100vh-100px)] px-6 pb-24 text-white">
        <div className="mb-1 flex justify-start items-center">
          <span className="text-[14px] font-bold text-white">{t("Level")}</span>
          <p className="text-[#7A2FF4] text-[12px] font-bold w-6 h-6 py-1 px-2 bg-white rounded-[20px] ml-2 flex justify-center items-center">
            {actualLevel}
          </p>
        </div>
        <p className="text-[14px] mb-4">{t("Tap on each one to see more")}</p>

        <div className="container-levels-members py-4 rounded-2xl bg-[#ffffff14]">
          {infoLevels.status ?
            <>{infoLevels.data?.map((item) => (
              <div
                key={item.wallet}
                className={`cursor-pointer  last:pb-0 first:pt-0 border-solid border-b-[1px] border-[#ffffff1a] last:border-b-0 ${
                  isOpen.includes(item.wallet) ? "pt-4 pb-0" : "pt-4 pb-4"
                }`}
              >
                <div className="container-info-level px-4 flex items-center justify-between" onClick={() => handleIsOpen(item.wallet)}>
                  <div className="container-wallet">
                    <h3 className="text-[14px]">
                      {t("User: ")} {item.usuario}
                    </h3>
                    <p className="text-[16px] font-bold mt-2">{item.nameUser}</p>
                  </div>
                  <div className="container-sponsor-total">
                    <div className="container-total mb-4">
                      <p className="text-[12px] text-[#A9AEB4] mb-2">{t("SPONSOR")}</p>
                      <p className="text-[16px] font-bold">{item.sponsor}</p>
                    </div>
                    <div className="container-residual">
                      <p className="text-[12px] text-[#A9AEB4] mb-2">{t("Directs Vol.")}</p>
                      <p className="text-[16px] font-bold">$ {item.directo}</p>
                    </div>
                    <div className="container-residual">
                      <p className="text-[12px] text-[#A9AEB4] mb-2">{t("Global Vol.")}</p>
                      <p className="text-[16px] font-bold">$ {item.global}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </>
            :
            <>
              <h1 className="text-white font-bold text-[18px] text-center">{t("Loading...")}</h1>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default LevelMembers;
