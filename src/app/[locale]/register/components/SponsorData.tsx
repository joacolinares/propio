"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import abiPoi from "@/abis/abiPoi.json";
import abiAccount from "@/abis/abiAccount.json";
import CryptoJS from "crypto-js";
import { ThirdwebSDK } from "@thirdweb-dev/react";

interface Props {
  classContainer?: string;
  classKey?: string;
  classValor?: string;
}

const SponsorData = ({ classContainer, classKey, classValor }: Props) => {
  const t = useTranslations();
  const [userName, setUserName] = useState("Loading");

  const decryptData = (encryptedHex) => {
    const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedHex);
    const secretKey = process.env.SECRET_KEY;
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedBytes }, CryptoJS.enc.Hex.parse(secretKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  
  const setUser = async() =>{
    const sdk = new ThirdwebSDK(137);
    const contractPoi = await sdk.getContract(process.env.POI_CONTRACT,abiPoi);
    const contract= await sdk.getContract(process.env.ACCOUNT_CONTRACT,abiAccount);

    const urlParams = new URLSearchParams(window.location.search);
    const referral = urlParams.get("referral");
    console.log(referral)
    if(Number(referral) !== 0){
      const accountInfo = await contract.call("accountInfo", [referral]);
      console.log(accountInfo)
     // const personalDataMap = await contractPoi.call("personalDataMap", [ownerOf]);
     // const decryptedUsername = decryptData(personalDataMap.encryptedUsername); 
      if(Number(referral) !== 0){
        setUserName(accountInfo.accountName)
      }else{
        setUserName("Master Account")
      }
    }else{
      setUserName("Master Account")
    }
  };

  // funcion para recortar la wallet
  useEffect(() => {
    setUser();
  }, []);

  return (
    <div
      className={`${
        classContainer ? classContainer : "mx-6 mt-6 border border-solid border-[#AD98FF] rounded-[8px] flex justify-between items-center py-2 px-4"
      }`}
    >
      <p className={`${classKey ? classKey : "text-[14px] font-bold text-[#A9AEB4]"} `}>{t("My Sponsor")}</p>
      <div>
        <p className={`${classValor ? classValor : "text-[14px] text-[#554D77]"}`}>
         {userName}
        </p>
      </div>
    </div>
  );
};

export default SponsorData;
