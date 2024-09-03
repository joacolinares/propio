"use client";
import React, { useEffect, useState } from "react";
import { useUserRegisterStore } from "@/store/user-register";
import { useTranslations } from "next-intl";
import EditIcon from "@/assets/icons/Edit.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/app/components/generals/Header";
import ButtonPrimary from "@/app/components/generals/ButtonPrimary";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import abiPoi from '@/abis/abiPoi.json'
import CryptoJS from "crypto-js";
import {
  ThirdwebProvider,
} from "@thirdweb-dev/react";

import DisconnectButton from "./DisconnectButton";
const Profile = () => {
  const t = useTranslations();
  const userStore = useUserRegisterStore();
  const router = useRouter();
  const [walletRecortadaFinal, setWalletRecortadaFinal] = useState<string>("");
  let walletSponsor = userStore.wallet;
  const wallet = localStorage.getItem('wallet');
  const idAccount = localStorage.getItem('idAccount');
  const [biogra, setBiogra] = useState({
    status: false,
    data: "loading"
  })
  const [redesSociales, setRedesSociales] = useState({
    status: false,
    data: []
  })
  const [infoUser, setInfoUser] = useState({
    status: false,
    data: [
      {
        nameLabel: t("Email Address"),
        valueInput: "AA",
      },
      {
        nameLabel: t("Full Name"),
        valueInput: userStore.fullName,
      },
      {
        nameLabel: t("Username"),
        valueInput: userStore.username,
      },
      {
        nameLabel: t("Phone Number"),
        valueInput: userStore.phoneNumber,
      },
      {
        nameLabel: t("Country"),
        valueInput: userStore.country,
      },
      {
        nameLabel: t("Gender"),
        valueInput: userStore.gender,
      },
      {
        nameLabel: t("Date of Birth"),
        valueInput: userStore.dateOfBirth,
      },
    ],
  });

  const getInfo = async () => {
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.POI_CONTRACT,abiPoi);
    const personalDataMap = await contract.call("personalDataMap", [wallet]);

    const secretKey = process.env.SECRET_KEY;

    const decryptData = (encryptedHex) => {
      console.log(encryptedHex)
      const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedHex);
      console.log(encryptedBytes)
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: encryptedBytes },
        CryptoJS.enc.Hex.parse(secretKey),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      console.log(decrypted)
      return decrypted.toString(CryptoJS.enc.Utf8);
    };
    function formatDate(dateString) {
      const [year, month, day] = dateString.split('-');
      return `${day}-${month}-${year}`;
    }
    const decryptedCountry = decryptData(personalDataMap.encryptedCountry);
    console.log(personalDataMap.encryptedCountry)
    const decryptedDateOfBirth = decryptData(personalDataMap.encryptedDateOfBirth);
    const decryptedEmail = decryptData(personalDataMap.encryptedEmail);
    const decryptedGender = decryptData(personalDataMap.encryptedGender);
    const decryptedName = decryptData(personalDataMap.encryptedName);
    const decryptedPhoneNumber = decryptData(personalDataMap.encryptedPhoneNumber);
    const decryptedUsername = decryptData(personalDataMap.encryptedUsername);
    const decryptedFb = decryptData(personalDataMap.fbLink);
    const decryptedIg = decryptData(personalDataMap.igLink);
    const decryptedYt = decryptData(personalDataMap.youtubeLink);
    const decryptedTikTok = decryptData(personalDataMap.tikTokLink);
    const decryptedWsp = decryptData(personalDataMap.wspLink);
    const decryptedBio = decryptData(personalDataMap.bio);
    let formattedDateOfBirth
    if(decryptedDateOfBirth != ""){
       formattedDateOfBirth = formatDate(decryptedDateOfBirth);
      console.log(decryptedFb)
    }else{
      formattedDateOfBirth = ""
    }

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

    setBiogra({
      status:true,
      data:decryptedBio
    })
    console.log(formattedDateOfBirth)
    setInfoUser({
      status: true,
      data: [
        {
          nameLabel: t("Email Address"),
          valueInput: decryptedEmail,
        },
        {
          nameLabel: t("Full Name"),
          valueInput: decryptedName,
        },
        {
          nameLabel: t("Username"),
          valueInput: decryptedUsername,
        },
        {
          nameLabel: t("Phone Number"),
          valueInput: decryptedPhoneNumber,
        },
        {
          nameLabel: t("Country"),
          valueInput: decryptedCountry,
        },
        {
          nameLabel: t("Gender"),
          valueInput: decryptedGender,
        },
        {
          nameLabel: t("Date of Birth"),
          valueInput: formattedDateOfBirth,
        },
      ],
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    const recortarWallet = () => {
      let onePart = null;
      let twoPart = null;
      if (walletSponsor) {
        onePart = walletSponsor.slice(0, 7);
        twoPart = walletSponsor.slice(
          walletSponsor.length - 4,
          walletSponsor.length
        );
        let walletRecortada = `${onePart}...${twoPart}`;
        setWalletRecortadaFinal(walletRecortada);
      }
    };
    recortarWallet();
  }, [walletSponsor]);

  const btnChangeWallet = () => {
    router.push("/profile/changeWallet");
  };

//ThirdwebProvider
  return (

    <>
      <Header text={t("Profile")} />
      <div className="profile">
        <div className="container-form">
          <div className="container-wallet mb-6 p-4 rounded-2xl border border-solid border-white">
            <div className="text-[#554D77] text-center text-[14px] mb-2">
            <span className="font-bold">
              {t("Wallet")}: {wallet ? `${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 6)}` : ''}
            </span>
            </div>
            <ButtonPrimary
              text={t("Change your Wallet")}
              onClickFn={btnChangeWallet}
            />
          </div>
         
          <div
            className="container-img-edit"
            onClick={() =>{
              console.log(redesSociales.data[0])
              router.push(
                `/profile/edit?email=${infoUser.data[0].valueInput}&name=${infoUser.data[1].valueInput}&username=${infoUser.data[2].valueInput}&phone=${infoUser.data[3].valueInput}&country=${infoUser.data[4].valueInput}&gender=${infoUser.data[5].valueInput}&date=${infoUser.data[6].valueInput}&wallet=${wallet}&idAccount=${idAccount}&bioGra=${biogra.data}&fb=${redesSociales.data[0].valueInput}&ig=${redesSociales.data[1].valueInput}&yt=${redesSociales.data[2].valueInput}&tiktok=${redesSociales.data[3].valueInput}&wsp=${redesSociales.data[4].valueInput}`
              )
            }
            }
          >
            <Image src={EditIcon} alt="edit" width={18} height={18} />
          </div>
          {infoUser.status ? (
            <>
              {" "}
              {infoUser.data.map((item, index) => (
                <div className="container-info" key={index}>
                  <p className="label">{item.nameLabel}</p>
                  <p className="value">{item.valueInput}</p>
                </div>
              ))}
            </>
          ) : (
            <>{t("Loading")}... </>
          )}


          <div className="container-bio">
            <p className="label">{t("Bio")}</p>
           {biogra ? <textarea
              className="bio w-full"
              value={biogra.data}
              placeholder=""
            />:
            <>Loading...</>}
          </div>

          
        </div>
       
        <div className="container-btn-logout">
          <DisconnectButton/>
        
        </div>
      </div>
    </>

  );
};

export default Profile;
