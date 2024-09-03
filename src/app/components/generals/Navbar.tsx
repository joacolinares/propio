"use client";
import React, { useEffect, useState } from "react";
import LogoPeq from "@/assets/imgs/LogoTipoPeq.png";
import Image from "next/image";
import ContainerLanguage from "./ContainerLanguage";
import NotificationsSVG from "@/assets/icons/NotificationsIcon";
import AccountSVG from "@/assets/icons/Door.svg";
import SupportSVG from "@/assets/icons/Support.svg";
import { usePathname, useRouter } from "next/navigation";
import GoBack from "./GoBack";
import Link from "next/link";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import abiPoi from "@/abis/abiPoi.json";

import abiAccount from "@/abis/abiAccount.json";
const Navbar = ({ text, wallet }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const [accountName, setAccountName] = useState("Loading...")


  const idAccount = localStorage.getItem("idAccount");
  const getInfo = async () => {
    //Obtiene el username
    const sdk = new ThirdwebSDK(137);
    const contract = await sdk.getContract(process.env.ACCOUNT_CONTRACT, abiAccount);
    const accountInfo = await contract.call("accountInfo", [idAccount]);
    console.log(accountInfo)
    setAccountName(accountInfo.accountName);
  }

  useEffect(() => {
    getInfo()
  }, [])
  


  return (
    <div className={`navbar  ${pathname === "/notifications" ? "mb-0" : "mb-8"}`}>
      {pathname === "/dashboard" ? (
        <div className="container-log flex items-center">
          <Image src={LogoPeq} alt="logo" width={28} height={24} />
          <div className=" ml-2">
            <h1 className="text-white text-[18px] font-bold">{text}</h1>
            <p className="text-white text-[10px]">{accountName}</p>
          </div>
        </div>
      ) : (
        <GoBack text={text} />
      )}
      <div className={`container-language-notifications`}>
        <Link href={`/accountLogin`} className="cursor-pointer">
          <Image src={AccountSVG} alt="icon" width={24} height={24} />
        </Link>
        <div className="cursor-pointer">
          <Image src={SupportSVG} alt="icon" width={24} height={24} />
        </div>
        <ContainerLanguage />
        <NotificationsSVG fill="#fff" width={24} height={24} className="cursor-pointer" onClick={() => router.push(`/notifications`)} />
      </div>
    </div>
  );
};

export default Navbar;
