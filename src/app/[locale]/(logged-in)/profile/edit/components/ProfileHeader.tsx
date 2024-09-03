"use client";
import React, { useEffect, useState } from "react";
import ProfilePic from "./ProfilePic";
import { useUserRegisterStore } from "@/store/user-register";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { useTranslations } from "next-intl";
import { useAddress } from "@thirdweb-dev/react";
import FaceIcon from "@/assets/icons/logo-facebook.svg";
import InstagramIcon from "@/assets/icons/logo-instagram.svg";
import YoutubeIcon from "@/assets/icons/logo-youtube.svg";
import TiktokIcon from "@/assets/icons/logo-tiktok.svg";
import WhatsappIcon from "@/assets/icons/logo-whatsapp.svg";
import Link from "next/link";
import Image from "next/image";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import abiPoi from "@/abis/abiPoi.json";
import CryptoJS from "crypto-js";

import ModalComponent from "@/app/components/generals/ModalComponent";

const ProfileHeader = () => {
  const t = useTranslations();
  const userStore = useUserRegisterStore();
  const wallet = localStorage.getItem("wallet");
  const idAccount = localStorage.getItem("idAccount");
  const [user, setUser] = useState(`${t("Loading")}...`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redesSociales, setRedesSociales] = useState({
    status: false,
    data: []
  })
  const getInfo = async () => {
    //Obtiene el username
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.POI_CONTRACT, abiPoi);
    const personalDataMap = await contract.call("personalDataMap", [wallet]);
    const secretKey = process.env.SECRET_KEY;
    const decryptData = (encryptedHex) => {
      const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedHex);
      const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedBytes }, CryptoJS.enc.Hex.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    };
    const decryptedUsername = decryptData(personalDataMap.encryptedUsername);
    setUser(decryptedUsername);



    const decryptedFb = decryptData(personalDataMap.fbLink);
    const decryptedIg = decryptData(personalDataMap.igLink);
    const decryptedYt = decryptData(personalDataMap.youtubeLink);
    const decryptedTikTok = decryptData(personalDataMap.tikTokLink);
    const decryptedWsp = decryptData(personalDataMap.wspLink);
    console.log(decryptedFb)

    setRedesSociales({
      status: true,
      data: [
        {
          valueInput:  decryptedFb
        },
        {
          valueInput:  decryptedIg
        },
        {
          valueInput: decryptedYt
        },
        {
          valueInput:  decryptedTikTok
        },
        {
          valueInput: decryptedWsp
        }
      ],
    });



  };

  useEffect(() => {
    getInfo();
  }, []);

  const copyReferralLink = () => {
    //Copia el codigo de referido
    const baseURL = 'dapp.defily.ai';
    const referralLink = `${baseURL}/?referral=${idAccount}`;
    navigator.clipboard.writeText(referralLink);
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div className="profile-header flex flex-col items-center">
      <div className="container-img-user">
        <ProfilePic />
      </div>
      <div className="container-info-user text-center mb-[32px]">
        <h1 className="text-white text-[18px] font-bold mb-1">{userStore.fullName}</h1>
        <span className="text-white text-[14px]">@{user}</span>
      </div>
     {redesSociales.status && <div className="container-social flex gap-4 mb-[32px] ">
        <Link href={redesSociales.data[0].valueInput} className="border border-solid border-[#AD98FF] rounded-[5px] bg-[#ffffff1a] p-1 cursor-pointer">
          <Image width={18} height={18} src={FaceIcon} alt="facebook" />
        </Link>
        <Link href={redesSociales.data[1].valueInput} className="border border-solid border-[#AD98FF] rounded-[5px] bg-[#ffffff1a] p-1 cursor-pointer">
          <Image width={18} height={18} src={InstagramIcon} alt="instagram" />
        </Link>
        <Link href={redesSociales.data[2].valueInput} className="border border-solid border-[#AD98FF] rounded-[5px] bg-[#ffffff1a] p-1 cursor-pointer">
          <Image width={18} height={18} src={YoutubeIcon} alt="youtube" />
        </Link>
        <Link href={redesSociales.data[3].valueInput} className="border border-solid border-[#AD98FF] rounded-[5px] bg-[#ffffff1a] p-1 cursor-pointer">
          <Image width={18} height={18} src={TiktokIcon} alt="tiktok" />
        </Link>
        <Link href={redesSociales.data[4].valueInput} className="border border-solid border-[#AD98FF] rounded-[5px] bg-[#ffffff1a] p-1 cursor-pointer">
          <Image width={18} height={18} src={WhatsappIcon} alt="whatsapp" />
        </Link>
      </div>}
      <div className="container-btn-copy w-full">
        <ButtonPrimary text={t("Copy your Referral Link")} onClickFn={copyReferralLink} />
      </div>
      <ModalComponent
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            classBody="bg-white w-[320px] h-auto rounded-xl"
          >
            <div className="container-modal">
              <div className="p-6">
                <p className="text-4 text-[#554D77] text-center">
                  {t(
                    "You successfully copied the referral link"
                  )}{" "}
                
                </p>
              </div>
            </div>
          </ModalComponent>
    </div>
  );
};

export default ProfileHeader;
