"use client";
import React, { ReactNode, useEffect, useState } from "react";
import HomeSVG from "@/assets/icons/HomeIcon";
import OptionsSVG from "@/assets/icons/OptionsIcon";
import AddSVG from "@/assets/icons/AddIcon";
import LiquidationSVG from "@/assets/icons/LiquidationIcon";
import UserSVG from "@/assets/icons/UserIcon";
import Link from "next/link";
import ImgProfile from "@/assets/imgs/photoProfile.png";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import WomanSvg from "@/assets/icons/WomenSvg";
import ManSvg from "@/assets/icons/ManSvg";
import { useTranslations } from "next-intl";
import CryptoJS from "crypto-js";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import abiPoi from '@/abis/abiPoi.json'

type ListOptions = {
  title: string;
  icon?: ReactNode;
  image?: ReactNode;
  link: string;
};

const Footer = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const search = useSearchParams().get("type");
  const [genderPhoto, setGenderPhoto] = useState(null);
  const [decryptedImg, setDecryptedImg] = useState<string | null>(null);

  const wallet = localStorage.getItem("wallet");

  const getInfo = async () => {
    console.log("info")
    const sdk = new ThirdwebSDK(137);
    const contractPoi = await sdk.getContract( process.env.POI_CONTRACT,abiPoi);
    const personalDataMap = await contractPoi.call("personalDataMap", [wallet]);
    const secretKey = process.env.SECRET_KEY;
    console.log(personalDataMap)
    const decryptData = (encryptedHex) => {
      const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedHex);
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
    const decryptedGender = decryptData(personalDataMap.encryptedGender);
    const decryptedImg = personalDataMap.imageLink;
    setGenderPhoto(decryptedGender);
    setDecryptedImg(decryptedImg);
    console.log(decryptedGender)
    console.log(decryptedImg)
  };

  useEffect(() => {
    getInfo();
  }, []);

  const imgGender = () => {
    if (genderPhoto === t("Female")) {
      return (
        <WomanSvg fill={pathname === "/profile" ? "#7A2FF4" : "#A9AEB4"} />
      );
    } else {
      return <ManSvg fill={pathname === "/profile" ? "#7A2FF4" : "#A9AEB4"} />;
    }
  };

  const iconValue = decryptedImg && decryptedImg !== "" ? (
    <Image width={28} height={28} src={decryptedImg} alt="profile" />
  ) : (
    imgGender()
  );

  const listOptions: ListOptions[] = [
    {
      title: "Dashboard",
      icon: (
        <HomeSVG fill={pathname === "/dashboard" ? "#7A2FF4" : "#A9AEB4"} />
      ),
      link: "/dashboard",
    },
    {
      title: "Menu",
      icon: <OptionsSVG fill={pathname === "/menu" ? "#7A2FF4" : "#A9AEB4"} />,
      link: `/menu`,
    },
    {
      title: "Add Liquidation",
      icon: (
        <AddSVG
          fill={search === "addLiquidity" ? "#7A2FF4" : "#A9AEB4"}
          stroke={search === "addLiquidity" ? "#7A2FF4" : "#A9AEB4"}
        />
      ),
      link: "/liquidityPool?type=addLiquidity",
    },
    {
      title: "Liquidation",
      icon: (
        <LiquidationSVG
          fill={search === "myLiquidity" ? "#7A2FF4" : "#A9AEB4"}
        />
      ),
      link: "/liquidityPool?type=myLiquidity",
    },    
    {
      title: "Profile",
      image: decryptedImg && decryptedImg !== "" ? (
        <Image width={28} height={28} src={decryptedImg} alt="profile" />
      ) : (
        imgGender()
      ),
      link: `/profile`,
      icon: iconValue,
    },
  ];

  return (
    <div className="footer">
      {listOptions.map((item, index) => (
        <Link href={item.link} key={index} className="link">
          <div
            className={`container-icon ${
              item.link === "/liquidityPool?type=addLiquidity" ? "linkAdd" : ""
            } ${
              item.link === "/liquidityPool?type=addLiquidity" &&
              search === "addLiquidity"
                ? "--linkAdd"
                : ""
            } ${item.image ? "imgProfile" : ""}`}
          >
            {item.icon ? item.icon : item.image}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Footer;
